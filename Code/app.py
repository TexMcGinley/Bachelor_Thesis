from flask import Flask, jsonify, request
from game import GameSession, create_game_session
from user import UserProfile, create_genre_preferences
from movie import fetch_movies
from flask_cors import CORS
from epsilon_greedy import EpsilonGreedy
import sqlite3
import os

def create_app():
    app = Flask(__name__)
    CORS(app)
    game_session = None

    def initialize_game():
        base_dir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(base_dir, '..', 'movies.db')
        connection = sqlite3.connect(db_path)
        certification_preferences = {'G': 2, 'PG': 3, 'PG-13': 4, 'R': 5, 'NC-17': 1}
        genre_preferences = create_genre_preferences(8, 4, 6, 5, 2, 10, 7, 2, 1, 4, 6, 9, 8, 5, 6, 7, 2, 3, 4)
        user_profile = UserProfile(name="Ron Swanson", age=55, location="Indiana", device_type="Desktop", account_age=3, genre_preferences=genre_preferences, certification_preferences=certification_preferences, watched_movies=[11, 12, 15, 22, 284053, 27205, 38757, 329865, 526896, 1076364, 1029575], profile_pic="femaleUserIcon.png")
        all_movies = fetch_movies(connection)  # Assumes fetch_movies returns list of Movie objects
        return create_game_session(user_profile, None, all_movies, connection)

    game_session = initialize_game()
    
    @app.route('/watched_movies')
    def get_watched_movies():
        watched_movies = game_session.fetch_watched_movies()
        watched_movies = [movie.to_dict() for movie in watched_movies]
        return jsonify(watched_movies)
    
    @app.route('/movies')
    def get_movies():
        base_dir = os.path.abspath(os.path.dirname(__file__))
        db_path = os.path.join(base_dir, '..', 'movies.db')
        connection = sqlite3.connect(db_path)
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
        
    @app.route('/user')
    def get_user():
        if game_session is not None:
            user = game_session.user_profile
            return jsonify({
                "name": user.name,
                "age": user.age,
                "location": user.location,
                "deviceType": user.device_type,
                "accountAge": user.account_age,
                "avatar": f"/src/assets/images/femaleUserIcon.png"  # Placeholder path for the avatar
            })
        else:
            return jsonify({"error": "Game session not initialized"}), 500
    
    @app.route('/submit', methods=['POST'])
    def submit():
        if game_session:
            user_score, epsilon_score, epsilon_value = game_session.submit_round()
            game_session.round += 1  # Increment round after submission
            game_session.epsilon_game_session.round += 1  # Increment round after submission
            game_session.moves_left = GameSession.MAX_MOVES  # Reset moves left
            return jsonify({
                "userScore": user_score,
                "epsilonScore": epsilon_score,
                "epsilonValue": epsilon_value,
                "round": game_session.round,
                "movesLeft": game_session.moves_left
            })
        else:
            return jsonify({"error": "Game session not initialized"}), 500
            
    @app.route('/update_rankings', methods=['POST'])
    def update_rankings():
        data = request.get_json()
        if game_session:
            from_index = data['fromId']
            to_index = data['toId']
            game_session.move_movie(from_index, to_index)
            
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
