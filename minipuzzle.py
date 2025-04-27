import sqlite3
import random
import os
import sys
import argparse

# Settings
DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'puzzles', 'puzzles.db')

# Piece symbols
ASCII_SYMBOLS = {
    'r': 'r', 'n': 'n', 'b': 'b', 'q': 'q', 'k': 'k', 'p': 'p',
    'R': 'R', 'N': 'N', 'B': 'B', 'Q': 'Q', 'K': 'K', 'P': 'P'
}

UNICODE_SYMBOLS = {
    'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
    'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
}

def connect_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def fetch_puzzles(limit=10, rating_min=100, rating_max=4000, theme=None):
    conn = connect_db()
    cursor = conn.cursor()
    if theme:
        cursor.execute(f'''
            SELECT * FROM (
                SELECT id, fen, moves, rating, themes
                FROM puzzles
                WHERE rating BETWEEN ? AND ? AND themes LIKE ?
                ORDER BY RANDOM()
                LIMIT ?
            ) ORDER BY rating ASC
        ''', (rating_min, rating_max, f'%{theme}%', limit))
    else:
        cursor.execute(f'''
            SELECT * FROM (
                SELECT id, fen, moves, rating, themes
                FROM puzzles
                WHERE rating BETWEEN ? AND ?
                ORDER BY RANDOM()
                LIMIT ?
            ) ORDER BY rating ASC
        ''', (rating_min, rating_max, limit))
    puzzles = cursor.fetchall()
    conn.close()
    return puzzles

def render_board(fen, use_unicode=False, use_color=True, flip=False):
    symbol_map = UNICODE_SYMBOLS if use_unicode else ASCII_SYMBOLS
    rows = fen.split(' ')[0].split('/')
    if flip:
        rows = rows[::-1]
    print("+------------------+")
    for rank_index, row in enumerate(rows):
        expanded_row = []
        file_index = 0
        for ch in row:
            if ch.isdigit():
                for _ in range(int(ch)):
                    expanded_row.append('.')
                    file_index += 1
            else:
                expanded_row.append(symbol_map.get(ch, '?'))
                file_index += 1
        if flip:
            expanded_row = expanded_row[::-1]
        line = ''
        for file_index, piece in enumerate(expanded_row):
            bg = '\033[107m' if (file_index + (8 - rank_index)) % 2 == 0 else '\033[100m'
            square = f"{bg}\033[30m{piece} \033[0m" if use_color else f"{piece} "
            line += square
        rank_number = (8 - rank_index) if not flip else (1 + rank_index)
        print(rank_number, '|', line.strip())
    print("+-----------------+")
    print("    a b c d e f g h\n" if not flip else "    h g f e d c b a\n")

def render_list(fen):
    rows = fen.split(' ')[0].split('/')
    piece_list = []
    files = 'abcdefgh'
    for r, row in enumerate(rows):
        file_index = 0
        for ch in row:
            if ch.isdigit():
                file_index += int(ch)
            else:
                color = 'w' if ch.isupper() else 'b'
                piece = ch.upper()
                square = files[file_index] + str(8 - r)
                piece_list.append(f"{color}{piece} on {square}")
                file_index += 1
    for entry in piece_list:
        print(entry)
    print()

def ask_yes_no(prompt, default_yes=True):
    choice = input(prompt + (" [Y/n]: " if default_yes else " [y/N]: ")).strip().lower()
    if choice == '':
        return default_yes
    return choice.startswith('y')

def ask_int(prompt):
    while True:
        try:
            return int(input(prompt).strip())
        except ValueError:
            print("Invalid input. Please enter a number.")

def main():
    parser = argparse.ArgumentParser(description="Console Chess Puzzle Trainer")
    parser.add_argument('minrating', type=int, help='Minimum rating')
    parser.add_argument('maxrating', type=int, help='Maximum rating')
    parser.add_argument('theme', nargs='?', default=None, help='Optional theme string')
    args = parser.parse_args()

    print("Welcome to the Console Chess Puzzle Trainer!")
    unicode_choice = input("Use unicode pieces? [Y/n]: ").strip().lower()
    use_unicode = (unicode_choice == '' or unicode_choice.startswith('y'))

    use_color = ask_yes_no("Use color display?", default_yes=True)
    show_list = ask_yes_no("Also show piece list?", default_yes=True)

    limit = ask_int("How many puzzles to load?: ")

    puzzles = fetch_puzzles(limit=limit, rating_min=args.minrating, rating_max=args.maxrating, theme=args.theme)
    print(f"Loaded {len(puzzles)} puzzles. Let's go!\n")

    for idx, puzzle in enumerate(puzzles, 1):
        print("-" * 40)
        print(f"Puzzle {idx}/{len(puzzles)}")
        print(f"ID: {puzzle['id']}")
        print(f"Rating: {puzzle['rating']}")
        print(f"Themes: {puzzle['themes']}")

        fen_parts = puzzle['fen'].split(' ')
        fen_parts[1] = 'w' if fen_parts[1] == 'b' else 'b'  # flip turn
        current_fen = ' '.join(fen_parts)

        moves = puzzle['moves'].split(' ')

        opponent_move = moves.pop(0)

        
        if show_list:
            render_list(current_fen)

        color_to_move = 'White' if current_fen.split(' ')[1] == 'w' else 'Black' #player color
        render_board(current_fen, use_unicode=use_unicode, use_color=use_color, flip=color_to_move == "Black")
        print(f"{color_to_move} to move. Opponent played: {opponent_move}\n")

        move_index = 0
        while move_index < len(moves):
            user_move = input("Your move (UCI format, or 'skip'/'exit'/'show'): ").strip().lower()

            if user_move == 'exit':
                print("Exiting the trainer. Goodbye!")
                sys.exit(0)
            elif user_move == 'skip':
                print(f"▶ Skipped move: {moves[move_index]}\n")
                move_index += 1
            elif user_move == 'show':
                render_board(current_fen, use_unicode=use_unicode, use_color=use_color, flip=color_to_move == "Black")
                if show_list:
                    render_list(current_fen)
                continue
            elif user_move == moves[move_index]:
                print("✅ Correct!\n")
                move_index += 1
                if move_index < len(moves):
                    print(f"Opponent played: {moves[move_index]}\n")
                    move_index += 1
            else:
                print("❌ Wrong, try again!\n")

        print(f"Puzzle Complete! Link: https://lichess.org/training/{puzzle['id']}\n")

    print("All puzzles solved! 🎉")

if __name__ == "__main__":
    main()
