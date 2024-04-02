from user import create_user_profile, create_genre_preferences
from movie import fetch_movie_by_id, connect_to_db, get_genres_for_movie, id_to_title, title_to_id
from score import calculate_score, calculate_total_score
from game import create_game_session


def main():
    # User 1:
    name = "John Doe"
    age = 25
    location = "New York"
    device_type = "Mobile"
    account_age = 3
    certification_preferences = {'G': 5, 'PG': 4, 'PG-13': 5, 'R': 5, 'NC-17': 1}
    genre_preferences = create_genre_preferences(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10)
    #genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4)
    user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, [])
    watched_movies_ids = [13, 28, 73, 101]  # Example movie IDs
    connection = connect_to_db("movies.db")
    user1.set_watched_movies(watched_movies_ids, connection)
    #print(user1.watched_movies)
    # recommendation_list_ids = [13, 28, 73, 101, 105, 120, 121, 122, 128, 129]
    recommendation_list_ids = [278, 278, 278, 278, 278, 278, 278, 278, 278, 278]
    recommendation_list = []

    # Creation of recommendation list: 
    for movie_id in recommendation_list_ids:
       # Filling list with movie objects
       recommendation_list.append(fetch_movie_by_id(movie_id, connection))	
    
    game = create_game_session(user1)
    game.add_to_recommendation_list(fetch_movie_by_id(278, connection))
    game.add_to_recommendation_list(fetch_movie_by_id(238, connection))
    game.remove_from_recommendation_list(278)

    # Add movies to the recommendation list
    game.add_to_recommendation_list(fetch_movie_by_id(278, connection))
    game.add_to_recommendation_list(fetch_movie_by_id(238, connection))

    # Insert a movie at a specific position
    game.add_to_recommendation_list(fetch_movie_by_id(550, connection), position=1)  # Example

    # Move a movie from one position to another
    game.move_movie(0, 2)  # Move the first movie to the third position

    # print(recommendation_list)
    # print(calculate_score(user1, fetch_movie_by_id(278, connection)))
    # print(calculate_total_score(user1, recommendation_list))
    # print(get_genres_for_movie(120, connection)) 

if __name__ == "__main__":
    main()