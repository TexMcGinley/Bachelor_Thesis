import numpy as np
from scipy.stats import ttest_rel
from user import create_user_profile, create_genre_preferences
from movie import connect_to_db, fetch_movies
from epsilon_greedy import EpsilonGreedy
from game import create_game_session_for_plots
import matplotlib.pyplot as plt

def run_simulation(user, epsilon_values, all_movies, connection, epsilon_greedy_agent=None):
    '''
    Runs a simulation of the game session.

    Args:
    ----
    - user (UserProfile): The profile of the user.
    - epsilon_values (list): List of epsilon values for exploration rate.
    - all_movies (list): List of all movies available.
    - connection (sqlite3.Connection): Database connection.
    - epsilon_greedy_agent (EpsilonGreedy, optional): The epsilon greedy algorithm instance.

    Returns:
    ----
    - list: Scores obtained in each move of the simulation.
    '''
    game = create_game_session_for_plots(user, epsilon_greedy_agent, all_movies, connection)
    scores = []
    for i in range(100):
        if epsilon_greedy_agent and i % 20 == 0:
            game.epsilon_greedy.update_epsilon(epsilon_values[i // 20])
        if epsilon_greedy_agent:
            game.add_movie_by_algorithm()
        else:
            game.add_random_movie()
        scores.append(game.score)
    return scores

def main():
    '''
    Main function to run the simulation and plot the results.
    '''
    # User setup
    name = "Ron Swanson"
    age = 55
    location = "Indiana"
    device_type = "Desktop"
    account_age = 3
    certification_preferences = {'G': 2, 'PG': 3, 'PG-13': 4, 'R': 5, 'NC-17': 1}
    genre_preferences = create_genre_preferences(8, 4, 6, 5, 2, 10, 7, 2, 1, 4, 6, 9, 8, 5, 6, 7, 2, 3, 4)
    watched_movies=[11, 12, 15, 22, 284053, 27205, 38757, 329865, 526896, 1076364, 1029575]

    # Connect to the database and fetch all movies
    connection = connect_to_db("movies.db")
    all_movies = fetch_movies(connection)

    # Define epsilon values and number of simulations
    epsilon_values = [1, 0.90, 0.75, 0.5, 0.001]
    num_simulations = 100

    # Initialize lists to store scores
    epsilon_greedy_scores = []
    random_scores = []

    # Run simulations for both epsilon greedy and random agents
    for _ in range(num_simulations):
        user1 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, None)
        user2 = create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, None)
        epsilon_greedy_agent = EpsilonGreedy(0.99, connection)
        
        epsilon_greedy_scores.append(run_simulation(user1, epsilon_values, all_movies, connection, epsilon_greedy_agent))
        random_scores.append(run_simulation(user2, epsilon_values, all_movies, connection))

    # Convert scores to numpy arrays for easier manipulation
    epsilon_greedy_scores = np.array(epsilon_greedy_scores)
    random_scores = np.array(random_scores)

    # Calculate mean and standard deviation of scores
    epsilon_greedy_mean = np.mean(epsilon_greedy_scores, axis=0)
    epsilon_greedy_std = np.std(epsilon_greedy_scores, axis=0)
    random_mean = np.mean(random_scores, axis=0)
    random_std = np.std(random_scores, axis=0)

    # Perform a paired t-test to compare the scores
    t_stat, p_value = ttest_rel(epsilon_greedy_scores, random_scores, axis=0)

    # Plot the scores
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, 101), epsilon_greedy_mean, label='Epsilon Greedy')
    plt.fill_between(range(1, 101), epsilon_greedy_mean - epsilon_greedy_std, epsilon_greedy_mean + epsilon_greedy_std, alpha=0.2)
    plt.plot(range(1, 101), random_mean, label='Random Agent', linestyle='--')
    plt.fill_between(range(1, 101), random_mean - random_std, random_mean + random_std, alpha=0.2)
    plt.xlabel('Moves')
    plt.ylabel('Scores')
    plt.title('Performance Comparison: Epsilon Greedy vs Random Agent')
    plt.legend()
    plt.grid(True)
    plt.show()

    # Print t-test results
    print(f"T-statistics: {t_stat}")
    print(f"P-values: {p_value}")

    # Plot the p-values
    plt.figure(figsize=(10, 6))
    plt.plot(range(1, 101), p_value, label='P-value')
    plt.axhline(y=0.05, color='r', linestyle='--', label='Significance Level (0.05)')
    plt.xlabel('Moves')
    plt.ylabel('P-value')
    plt.title('P-values for Epsilon Greedy vs Random Agent Comparison')
    plt.legend()
    plt.grid(True)
    plt.show()

if __name__ == "__main__":
    main()
