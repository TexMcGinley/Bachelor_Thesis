from user import create_user_profile, create_genre_preferences
from movie import fetch_movie_by_id, connect_to_db
from score import calculate_score


def main():
    # User 1:
    name = "John Doe"
    age = 25
    location = "New York"
    device_type = "Mobile"
    account_age = 3
    certification_preferences = {'G': 5, 'PG': 4, 'PG-13': 3, 'R': 2, 'NC-17': 1}
    genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4)
    user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, [])
    watched_movies_ids = [13, 28, 73, 101]  # Example movie IDs
    connection = connect_to_db("movies.db")
    user1.set_watched_movies(watched_movies_ids, connection)
    #print(user1.watched_movies)
    print(calculate_score(user1, fetch_movie_by_id(120, connection)))

if __name__ == "__main__":
    main()