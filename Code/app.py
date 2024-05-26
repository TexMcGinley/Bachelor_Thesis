from flask import Flask, jsonify, request
from game import GameSession, create_game_session
from user import UserProfile, create_genre_preferences
from movie import fetch_movies
from flask_cors import CORS
import sqlite3


def create_app():
    app = Flask(__name__)
    CORS(app)
    game_session = None

    def initialize_game():
        connection = sqlite3.connect('movies.db')
        all_movies = fetch_movies(connection)  # Assumes fetch_movies returns list of Movie objects
        certification_preferences = {'G': 2, 'PG': 3, 'PG-13': 4, 'R': 5, 'NC-17': 1}
        genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 5, 10, 1, 2, 3, 4)
        user_profile = UserProfile(name="John Doe", age=25, location="London", device_type="Desktop", account_age=3, genre_preferences=genre_preferences, certification_preferences=certification_preferences, watched_movies=[])
        return create_game_session(user_profile, None, all_movies, 0, connection)

    game_session = initialize_game()

    @app.route('/movies')
    def get_movies():
        connection = sqlite3.connect('movies.db')
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        query = """
        SELECT Movies.movie_id, Movies.title, Movies.release_date, Movies.rating, Movies.certification, Movies.poster_path, GROUP_CONCAT(Genres.name) as genres
        FROM Movies
        JOIN MovieGenres ON Movies.movie_id = MovieGenres.movie_id
        JOIN Genres ON MovieGenres.genre_id = Genres.genre_id
        GROUP BY Movies.movie_id
        """
        cursor.execute(query)
        movies = cursor.fetchall()
        movies = [dict(movie) for movie in movies]
        return jsonify(movies)

    @app.route('/score')
    def get_score():
        if game_session is not None:
            return jsonify({"score": game_session.score})
        else:
            return jsonify({"error": "Game session not initialized"}), 500
        
    @app.route('/update_rankings', methods=['POST'])
    def update_rankings():
        data = request.get_json()
        if game_session:
            from_index = data['fromId']
            to_index = data['toId']
            print("from_index : ", from_index, "to_index : ", to_index)
            game_session.move_movie(from_index, to_index)  # This function must handle logic to update both lists correctly
            
            updated_available_movies = [
                movie.to_dict() for movie in game_session.available_movies if movie is not None
            ]
            updated_ranked_movies = [
                movie.to_dict() if movie is not None else "null" for movie in game_session.recommendation_list
            ]
            return jsonify({
                "availableMovies": updated_available_movies,
                "rankedMovies": updated_ranked_movies,
                "score": game_session.score
            })
        else:
            return jsonify({"error": "Game session not initialized"}), 500

    return app
        


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
