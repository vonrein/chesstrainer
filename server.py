from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sqlite3
import os
import random #for random theme selection

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=PROJECT_ROOT, static_url_path='')
CORS(app)

DATABASE = os.path.join(PROJECT_ROOT, 'puzzles/puzzles.db')

BOARD_DIR = os.path.join(PROJECT_ROOT, 'assets/images/board')
PIECES_DIR = os.path.join(PROJECT_ROOT, 'assets/images/pieces')

@app.route('/random-theme')
def random_theme():
    board_files = [f for f in os.listdir(BOARD_DIR) if f.endswith(('.png', '.svg',"bmp"))]
    piece_dirs = [d for d in os.listdir(PIECES_DIR) if os.path.isdir(os.path.join(PIECES_DIR, d))]

    board = random.choice(board_files) if board_files else None
    pieces = random.choice(piece_dirs) if piece_dirs else None

    return jsonify({
        "board": board,
        "pieces": pieces
    })
    
@app.route("/index.html")
def serve_coords():
    return send_from_directory(PROJECT_ROOT, 'index.html')

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/puzzles')
def get_puzzles():
    rating_max = request.args.get('max', type=int)
    rating_min = request.args.get('min', type=int)
    theme = request.args.get('theme')

    limit = request.args.get('limit', 1, type=int)
    limit = min(limit, 100)

    puzzleid = request.args.get("id")
    sort = request.args.get('sort')  # e.g. 'asc'

    db = get_db()
    base_query = 'SELECT id, fen, moves, rating, themes FROM puzzles WHERE 1=1'
    params = []

    if puzzleid:
        base_query += " AND id = ?"
        params.append(puzzleid)
    if rating_max:
        base_query += ' AND rating <= ?'
        params.append(rating_max)
    if rating_min:
        base_query += ' AND rating >= ?'
        params.append(rating_min)
    if theme:
        base_query += ' AND themes LIKE ?'
        params.append(f'%{theme}%')

    if sort:
        # Random sample first, then sort by rating
        query = f'''
            SELECT * FROM (
                {base_query} ORDER BY RANDOM() LIMIT ?
            ) ORDER BY rating ASC
        '''
    else:
        # Default random sort
        query = f'''
            {base_query} ORDER BY RANDOM() LIMIT ?
        '''

    params.append(limit)

    cursor = db.execute(query, params)
    puzzles = [dict(row) for row in cursor.fetchall()]
    db.close()
    return jsonify(puzzles)

# Serve HTML entrypoint
@app.route('/')
def serve_index():
    return send_from_directory(PROJECT_ROOT, 'puzzle.html')

# Serve other static files (JS, CSS, images)
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory(PROJECT_ROOT, path)

if __name__ == '__main__':
    app.run(debug=True)
