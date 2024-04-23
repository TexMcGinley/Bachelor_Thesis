from score import calculate_score, calculate_total_score
from movie import fetch_movie_by_id
import random

class GameSession:
    MAX_RECOMMENDATIONS = 10

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

    def add_to_recommendation_list(self, movie, position=None):
        available_movie_ids = [m.movie_id for m in self.available_movies]
        if movie.movie_id in available_movie_ids:
            if position is None:
                self.recommendation_list.append(movie)
            else:
                self.recommendation_list.insert(position, movie)
            self.available_movies = [m for m in self.available_movies if m.movie_id != movie.movie_id]
            #if self.epsilon_greedy != None:
            #    self.epsilon_greedy.update_score(movie.movie_id, self.score)
            self.algorithm_update_score(movie, None)
        else:
            print("Movie not in available_movies, cannot add to recommendation list.")



    def add_movie_by_algorithm(self):
        if self.iteration_count < self.learning_phase_iterations: # Learning phase, movies are added randomly one at a time and the score is used to train the algorithm
            selected_movie = self.epsilon_greedy.explore_random_movie(self.available_movies)
            self.recommendation_list = [selected_movie]
            self.algorithm_update_score(selected_movie, None)
        else:   # Learning phase is over, start recommending movies based on the algorithm
            if self.learning_phase: # On the first run after the learning phase, fill the recommendation list
                #print("length of scores list: ", len(self.epsilon_greedy.movie_scores))
                self.clear_recommendation_list()
                inital_score_list_length = len(self.epsilon_greedy.movie_scores)
                #if len(self.epsilon_greedy.movie_scores) < self.MAX_RECOMMENDATIONS: # If the amount of scores in the dictionary is less than the maximum recommendations, fill the list with random movies
                for _ in range(self.MAX_RECOMMENDATIONS - len(self.recommendation_list)):
                    #print("length of recommendation list: ", len(self.recommendation_list))
                    if inital_score_list_length > len(self.recommendation_list) and inital_score_list_length > 0:
                        selected_movie = fetch_movie_by_id(self.epsilon_greedy.return_ranked_movie(len(self.recommendation_list)), self.epsilon_greedy.connection)
                    else:
                        selected_movie = self.epsilon_greedy.explore_random_movie(self.available_movies)
                    temp_score = self.score
                    self.add_to_recommendation_list(selected_movie)
                self.learning_phase = False
                #print("length of recommendation list: ", len(self.recommendation_list))
                self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True) # Sort the recommendation list based on the scores
                # print("Initial recommendation list:")
                # for movie in self.recommendation_list:
                #     print(movie.title, self.epsilon_greedy.get_movie_score(movie))
            else: 

                # Perform either exploration or exploitation
                selected_movie = self.epsilon_greedy.explore_or_exploit(self.available_movies) # Select a movie based on the epsilon greedy algorithm
                
                

                # Replace the last movie in the recommendation list
                last_movie = self.recommendation_list.pop() # Remove the last movie in the recommendation list
                self.update_score()
                temp_score = self.score
                self.recommendation_list.append(selected_movie) # Add the selected movie to the recommendation list
                self.available_movies.append(last_movie) # Add the last movie back to the available movies
                self.available_movies.remove(selected_movie) # Remove the selected movie from the available movies
                #self.update_score() # Update the score using the selected movie and the current recommendation list
                # print("Score: ", self.score, "Temp score: ", temp_score)
                # if self.score > temp_score: # If the score increased, keep the selected movie in the recommendation list
                #     self.available_movies.append(last_movie) # Add the last movie back to the available movies
                #     self.available_movies.remove(selected_movie) # Remove the selected movie from the available movies
                # else: # If the score decreased, keep the last movie in the recommendation list
                #     self.recommendation_list.pop()
                #     self.recommendation_list.append(last_movie)
                self.update_score()
                self.algorithm_update_score(selected_movie, (self.score - temp_score))  # Update the score using the selected movie and the current recommendation list
                self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True) # Sort the recommendation list based on the scores

            #print(f"Replaced '{last_movie.title}' with '{selected_movie.title}'.")
        self.epsilon_greedy.update_epsilon()  # Update epsilon after each iteration
        self.iteration_count += 1  # Ensure iteration count is incremented in all cases


    def remove_from_recommendation_list(self, movie_id):
        for movie in self.recommendation_list:
            if movie.movie_id == movie_id:
                self.recommendation_list.remove(movie)
                self.available_movies.append(movie)  # Add back to available movies
                break
        #self.update_score()

    def update_score(self):
        self.score = calculate_total_score(self.user_profile, self.recommendation_list)
        

    def algorithm_update_score(self, movie, score):
        self.update_score() # Update the total score before updating the movie score

        # Update the movie score
        if score is None:
            score = self.score

        # temp_score = self.score
        
        self.scores.append(self.score) # Record the score
        # score = self.score - temp_score # Calculate the score for the movie 
        #print("Score in algorithm update: ", score)
        self.epsilon_greedy.update_score(movie, score) # Update the movie score
        #print("score :", score)
        # Update the genre scores
        #print("Movie title and score: ", movie.title, score)
        for genre in movie.genres: # Update the genre scores for each genre in the movie
            self.epsilon_greedy.update_genre_score(genre, score)
        #self.epsilon_greedy.print_genre_table()
    
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

    def cold_start(self):
        for movie in self.user_profile.watched_movies:
            self.epsilon_greedy.start_genre_table(movie)
            print(movie)
        #     self.epsilon_greedy.start_genre_table(movie)
        # self.epsilon_greedy.start_genre_table([movie.movie_id for movie in self.user_profile.watched_movies])
        print(self.epsilon_greedy.genres_scores)

def create_game_session(user_profile, epsilon_greedy, all_movies, learning_phase_iterations):
    game_session = GameSession(user_profile, epsilon_greedy, all_movies, learning_phase_iterations)
    return game_session