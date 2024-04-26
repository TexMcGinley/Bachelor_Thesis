from score import calculate_score, calculate_total_score
from movie import fetch_movie_by_id

class GameSession:
    MAX_RECOMMENDATIONS = 5

    def __init__(self, user_profile, epsilon_greedy, all_movies, learning_phase_iterations):
        self.user_profile = user_profile
        self.epsilon_greedy = epsilon_greedy
        self.recommendation_list = []
        self.available_movies = all_movies[:]
        self.score = 0
        self.scores = []
        self.learning_phase_iterations = learning_phase_iterations
        self.iteration_count = 0
        self.learning_phase = True

    def add_to_recommendation_list_algorithm(self, movie, temp_score=None, position=None): # Add a movie to the recommendation list based on the epsilon greedy algorithm
        available_movie_ids = [m.movie_id for m in self.available_movies]
        if movie.movie_id in available_movie_ids:
            if position is None: # If no position is provided, add the movie to the end of the recommendation list
                self.recommendation_list.append(movie)
            else: # Add the movie to the specified position in the recommendation list
                self.recommendation_list.insert(position, movie)
            self.available_movies = [m for m in self.available_movies if m.movie_id != movie.movie_id] # Remove the movie from the available movies
            self.update_score() # Update the total score 
            score = self.score - temp_score if temp_score is not None else self.score # Calculate the score of the individual movie
            self.algorithm_update_score(movie, score) # Update the score of the individual movie
        else:
            print("Movie not in available_movies, cannot add to recommendation list.")


    def add_movie_by_algorithm(self):
        selected_movie = self.epsilon_greedy.explore_or_exploit(self.available_movies) # Select a movie based on the epsilon greedy algorithm
        # Replace the last movie in the recommendation list
        if len(self.recommendation_list) == self.MAX_RECOMMENDATIONS: # If the recommendation list is full, remove the last movie
            last_movie = self.recommendation_list.pop() # Remove the last movie in the recommendation list
            self.available_movies.append(last_movie) # Add the last movie back to the available movies
            self.update_score()

        temp_score = self.score # record the score of the recommendation list before adding the selected movie
        self.add_to_recommendation_list_algorithm(selected_movie, temp_score) # Add the selected movie to the recommendation list
        self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True) # Sort the recommendation list based on the scores
        self.epsilon_greedy.update_epsilon()  # Update epsilon after each iteration


    def remove_from_recommendation_list(self, movie_id):
        for movie in self.recommendation_list:
            if movie.movie_id == movie_id:
                self.recommendation_list.remove(movie)
                self.available_movies.append(movie)  # Add back to available movies
                break
        #self.update_score()

    def update_score(self):
        self.score = calculate_total_score(self.user_profile, self.recommendation_list) # Calculate the total score of the recommendation list
        

    def algorithm_update_score(self, movie, score):
        self.update_score() # Update the total score before updating the movie score

        # Update the movie score
        if score is None:
            score = self.score
        
        self.scores.append(self.score) # Record the score
        self.epsilon_greedy.update_score(movie, score) # Update the movie score in the epsilon greedy algorithm
    
    def move_movie(self, old_position, new_position):
        if 0 <= old_position < len(self.recommendation_list) and 0 <= new_position < len(self.recommendation_list):
            movie = self.recommendation_list.pop(old_position)
            self.recommendation_list.insert(new_position, movie)
            self.update_score()
        else:
            print("Invalid positions provided")

    def clear_recommendation_list(self):
        for movie in self.recommendation_list:
            if movie not in self.available_movies:
                self.remove_from_recommendation_list(movie.movie_id)
        self.recommendation_list = []
        self.score = 0
    ### Code relating to Contextual_epsilon_greedy ###

        # def add_movie_by_algorithmV2(self):
    #     if self.iteration_count < self.learning_phase_iterations: # Learning phase, movies are added randomly one at a time and the score is used to train the algorithm
    #         selected_movie = self.epsilon_greedy.explore_random_movie(self.available_movies)
    #         self.recommendation_list = [selected_movie]
    #         self.algorithm_update_score(selected_movie, None)
    #     else:   # Learning phase is over, start recommending movies based on the algorithm
    #         if self.learning_phase: # On the first run after the learning phase, fill the recommendation list
    #             self.clear_recommendation_list()
    #             inital_score_list_length = len(self.epsilon_greedy.movie_scores)
    #             idx = 0
    #             for _ in range(self.MAX_RECOMMENDATIONS - len(self.recommendation_list)):
    #                 if inital_score_list_length > len(self.recommendation_list) and inital_score_list_length > 0:
    #                     selected_movie = fetch_movie_by_id(self.epsilon_greedy.return_ranked_movie(idx), self.epsilon_greedy.connection)
    #                 else:
    #                     selected_movie = self.epsilon_greedy.explore_random_movie(self.available_movies)
    #                 temp_score = self.score
    #                 self.add_to_recommendation_list(selected_movie, temp_score)
    #                 idx += 1
    #             self.learning_phase = False
    #             self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True) # Sort the recommendation list based on the scores
    #         else: 

    #             # Perform either exploration or exploitation
    #             selected_movie = self.epsilon_greedy.explore_or_exploit(self.available_movies) # Select a movie based on the epsilon greedy algorithm
                
    #             # Replace the last movie in the recommendation list
    #             last_movie = self.recommendation_list.pop() # Remove the last movie in the recommendation list
    #             self.update_score()
    #             temp_score = self.score
    #             self.recommendation_list.append(selected_movie) # Add the selected movie to the recommendation list
    #             self.available_movies.append(last_movie) # Add the last movie back to the available movies
    #             self.available_movies.remove(selected_movie) # Remove the selected movie from the available movies
    
    #             self.update_score()
    #             self.algorithm_update_score(selected_movie, (self.score - temp_score))  # Update the score using the selected movie and the current recommendation list
    #             self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True) # Sort the recommendation list based on the scores
    #         self.epsilon_greedy.update_epsilon()  # Update epsilon after each iteration
    #     self.iteration_count += 1  # Ensure iteration count is incremented in all cases

    # def cold_start(self):
    #     for movie in self.user_profile.watched_movies:
    #         self.epsilon_greedy.start_genre_table(movie)
    #         print(movie)
    #     #     self.epsilon_greedy.start_genre_table(movie)
    #     # self.epsilon_greedy.start_genre_table([movie.movie_id for movie in self.user_profile.watched_movies])
    #     print(self.epsilon_greedy.genres_scores)

    
def create_game_session(user_profile, epsilon_greedy, all_movies, learning_phase_iterations):
    game_session = GameSession(user_profile, epsilon_greedy, all_movies, learning_phase_iterations)
    return game_session