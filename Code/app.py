from flask import Flask, jsonify
import sqlite3

app = Flask(__name__)

@app.route('/movies')
def get_movies():
    connection = sqlite3.connect('movies.db')
    connection.row_factory = sqlite3.Row  # This makes rows behave like dicts
    cursor = connection.cursor()
    
    # Perform a SQL JOIN to fetch movies with their genres
    query = """
    SELECT Movies.movie_id, Movies.title, Movies.release_date, Movies.rating, Movies.certification, Movies.poster_path, GROUP_CONCAT(Genres.name) as genres
    FROM Movies
    JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
    JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
    GROUP BY Movies.movie_id
    """
    cursor.execute(query)
    movies = cursor.fetchall()
    # Convert each Row object to a dictionary
    movies = [dict(movie) for movie in movies]
    return jsonify(movies)


if __name__ == '__main__':
    app.run(debug=True)
