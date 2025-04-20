from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DATABASE = 'puzzles.db'

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/puzzles')
def get_puzzles():
    rating_lt = request.args.get('rating_lt', type=int)
    rating_gt = request.args.get('rating_gt', type=int)
    theme = request.args.get('theme')  # comma-separated or substring match
    limit = request.args.get('limit', 10, type=int)

    db = get_db()
    query = 'SELECT id, fen, moves, rating, themes FROM puzzles WHERE 1=1'
    params = []

    if rating_lt:
        query += ' AND rating < ?'
        params.append(rating_lt)
    if rating_gt:
        query += ' AND rating > ?'
        params.append(rating_gt)
    if theme:
        query += ' AND themes LIKE ?'
        params.append(f'%{theme}%')

    query += ' ORDER BY RANDOM() LIMIT ?'
    params.append(limit)

    cursor = db.execute(query, params)
    puzzles = [dict(row) for row in cursor.fetchall()]
    db.close()
    return jsonify(puzzles)

if __name__ == '__main__':
    app.run(debug=True)
