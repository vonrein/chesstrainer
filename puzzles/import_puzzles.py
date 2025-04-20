# import_puzzles.py
import csv
import sqlite3
import os
import sys

#todo extract only some puzzles

DB_NAME = 'puzzles.db'
CSV_FILE = 'lichess_db_puzzle.csv'

if not os.path.exists(CSV_FILE):
    print(f"❌ File '{CSV_FILE}' not found. Make sure it's uncompressed and in this folder.")
    sys.exit(1)

print("📦 Starting import from:", CSV_FILE)

try:
    conn = sqlite3.connect(DB_NAME)
    cur = conn.cursor()

    cur.execute('''
    CREATE TABLE IF NOT EXISTS puzzles (
        id TEXT PRIMARY KEY,
        fen TEXT,
        moves TEXT,
        rating INTEGER,
        rating_deviation INTEGER,
        popularity INTEGER,
        nb_plays INTEGER,
        themes TEXT,
        game_url TEXT,
        opening_tags TEXT
    )
    ''')
    print("🗃️ Table 'puzzles' is ready.")

    count = 0
    with open(CSV_FILE, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            cur.execute('''
            INSERT OR IGNORE INTO puzzles VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                row['PuzzleId'], row['FEN'], row['Moves'], int(row['Rating']),
                int(row['RatingDeviation']), int(row['Popularity']), int(row['NbPlays']),
                row['Themes'], row['GameUrl'], row['OpeningTags']
            ))
            count += 1
            if count % 10000 == 0:
                print(f"⏳ {count} rows inserted...")

    conn.commit()
    conn.close()

    print(f"✅ Import complete. {count} puzzles added to '{DB_NAME}'.")

except Exception as e:
    print("❌ Error during import:")
    print(e)
    sys.exit(1)
