from user import create_user_profile, create_genre_preferences
from movie import fetch_movie_by_id, connect_to_db, get_genres_for_movie, id_to_title, title_to_id, fetch_movies
from epsilon_greedy import EpsilonGreedy
from contextual_epsilon_greedy import ContextualEpsilonGreedy
from game import create_game_session, start_game
from score import calculate_score, calculate_total_score
import matplotlib.pyplot as plt
from statistics import mean

def plot_scores(scores):
    plt.figure(figsize=(10, 5))  # Set the figure size as needed
    plt.plot(scores[0], marker='o', linestyle='-', color='b', label = 'e = 0.1')
    plt.plot(scores[1], marker='o', linestyle='-', color='r', label = 'e = 0.2')
    plt.plot(scores[2], marker='o', linestyle='-', color='g', label = 'e = 0.3')   
    plt.plot(scores[3], marker='o', linestyle='-', color='y', label = 'e = 0.4')
    plt.plot(scores[4], marker='o', linestyle='-', color='c', label = 'e = 0.5')
    plt.plot(scores[5], marker='o', linestyle='-', color='m', label = 'e = 0.6')
    plt.plot(scores[6], marker='o', linestyle='-', color='k', label = 'e = 0.7')
    plt.title("Average Score Over Time During Simulation")
    plt.xlabel("Block of 10 Iterations")
    plt.ylabel("Average Score")
    plt.grid(True)
    plt.legend()
    plt.show()


def main():
    # User 1:
    name = "John Doe"
    age = 25
    location = "New York"
    device_type = "Mobile"
    account_age = 3
    certification_preferences = {'G': 2, 'PG': 3, 'PG-13': 4, 'R': 5, 'NC-17': 1}
    #certification_preferences = {'G': 5, 'PG': 5, 'PG-13': 5, 'R': 5, 'NC-17': 5, 'N': 5}
    
    #genre_preferences = create_genre_preferences(10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10)
    #genre_preferences = create_genre_preferences(0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    genre_preferences = create_genre_preferences(8, 5, 6, 7, 4, 9, 3, 2, 1, 5, 6, 7, 8, 5, 10, 1, 2, 3, 4)

    user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, [])
    watched_movies_ids = [13, 28, 73, 101]  # Example movie IDs
    connection = connect_to_db("movies.db") # Connect to the database
    user1.set_watched_movies(watched_movies_ids, connection) # Set the watched movies for the user profile

    all_movie_ids = [row[0] for row in fetch_movies(connection)] # Get all movie IDs
    all_movies = [fetch_movie_by_id(movie_id, connection) for movie_id in all_movie_ids] # Get all movie objects

    start_game(user1, all_movies, connection)


    # epsilon_values = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7] # Epsilon values to test
    # score_blocks2 = [] # Store the scores for each epsilon value
    # for e in epsilon_values:

    #     epsilon_greedy = EpsilonGreedy(e, connection)
    #     game = create_game_session(user1, epsilon_greedy, all_movies, 0)

        
    #     temp_score_blocks = []
    #     for i in range(100):  # You can adjust the total iterations
    #         game.add_movie_by_algorithm()
    #         if i == 1:
    #             temp_score_blocks.append(0)
    #         if i % 10 == 9:  # Collect scores every 10 iterations
    #             average_score = mean(game.scores[-10:])  # Calculate average of the last 10 scores
    #             temp_score_blocks.append(average_score)
    #     score_blocks2.append(temp_score_blocks)

    
    #     print("\n Recommendation list for epsilon = ", e)
    #     for movie in game.recommendation_list:
    #         print(movie.title)
    #         print("score: ", game.epsilon_greedy.get_movie_score(movie))
    #         for genres in movie.genres:
    #             print("genres: ", genres)
    #     print("total score: ", calculate_total_score(user1, game.recommendation_list))


    # plot_scores(score_blocks2)
    

    

if __name__ == "__main__":
    main()