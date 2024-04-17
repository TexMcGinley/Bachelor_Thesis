from user import create_user_profile, create_genre_preferences
from movie import fetch_movie_by_id, connect_to_db, get_genres_for_movie, id_to_title, title_to_id, fetch_movies
from epsilon_greedy import EpsilonGreedy
from contextual_epsilon_greedy import ContextualEpsilonGreedy
from game import create_game_session
from score import calculate_score
import matplotlib.pyplot as plt

# Assuming scores is a list containing the score after each iteration
def plot_scores(scores):
    plt.figure(figsize=(10, 5))  # Set the figure size as needed
    plt.plot(scores, marker='o', linestyle='-', color='b')
    plt.title("Score Over Time During Simulation")
    plt.xlabel("Iteration")
    plt.ylabel("Score")
    plt.grid(True)
    plt.show()




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
    #genre_preferences = create_genre_preferences(10, 10, 10, 10, 10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4)

    user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, [])
    watched_movies_ids = [13, 28, 73, 101]  # Example movie IDs
    connection = connect_to_db("movies.db")
    user1.set_watched_movies(watched_movies_ids, connection)

    #epsilon_greedy = EpsilonGreedy(0.4, connection)
    epsilon_greedy = ContextualEpsilonGreedy(0.99, connection)
    all_movie_ids = [row[0] for row in fetch_movies(connection)]
    all_movies = [fetch_movie_by_id(movie_id, connection) for movie_id in all_movie_ids]

    game = create_game_session(user1, epsilon_greedy, all_movies, 10)

    game.epsilon_greedy.initialize_genre_table()

    for i in range(100):
        game.add_movie_by_algorithm()
        if i % 10 == 0:
            print(f"Score after {i} iterations: {game.score}") 
        if i % 50 == 0:     
            game.epsilon_greedy.print_genre_table() 
    print("score: ", game.score)
    print("Recommendation list:")
    for movie in game.recommendation_list: 
        print(movie.title)
        for genres in movie.genres:
            print("genres: ", genres)

    print(game.scores)
    plot_scores(game.scores)

    

if __name__ == "__main__":
    main()