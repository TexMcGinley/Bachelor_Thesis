from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/movies', methods=['GET'])
def get_movies():
    conn = sqlite3.connect('movies.db')
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM movies")
    movies = cursor.fetchall()

    return jsonify(movies)

if __name__ == '__main__':
    app.run(debug=True)