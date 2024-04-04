from user import create_user_profile, create_genre_preferences
from movie import fetch_movie_by_id, connect_to_db, get_genres_for_movie, id_to_title, title_to_id, fetch_movies
from epsilon_greedy import EpsilonGreedy
from game import create_game_session


def main():
    # User 1:
    name = "John Doe"
    age = 25
    location = "New York"
    device_type = "Mobile"
    account_age = 3
   #certification_preferences = {'G': 5, 'PG': 4, 'PG-13': 5, 'R': 5, 'NC-17': 1}
    certification_preferences = {'G': 5, 'PG': 5, 'PG-13': 5, 'R': 5, 'NC-17': 5, 'N': 5}
    
    #genre_preferences = create_genre_preferences(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10)
    genre_preferences = create_genre_preferences(0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)

    #genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4)
    user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, [])
    watched_movies_ids = [13, 28, 73, 101]  # Example movie IDs
    connection = connect_to_db("movies.db")
    user1.set_watched_movies(watched_movies_ids, connection)
    #print(user1.watched_movies)
    # recommendation_list_ids = [13, 28, 73, 101, 105, 120, 121, 122, 128, 129]

    epsilon_greedy = EpsilonGreedy(0.1, connection)
    all_movie_ids = [row[0] for row in fetch_movies(connection)]
    all_movies = [fetch_movie_by_id(movie_id, connection) for movie_id in all_movie_ids]

    game = create_game_session(user1, epsilon_greedy, all_movies)
    for i in range(600):
        game.add_movie_by_algorithm()
        if i % 10 == 0:
            print(f"Score after {i} iterations: {game.score}")  
    print("score: ", game.score)
    print("Recommendation list:")
    for movie in game.recommendation_list: print(movie.title)

    

if __name__ == "__main__":
    main()