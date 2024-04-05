from score import calculate_score, calculate_total_score

class GameSession:
    MAX_RECOMMENDATIONS = 10

    def __init__(self, user_profile, epsilon_greedy, all_movies):
        self.user_profile = user_profile
        self.epsilon_greedy = epsilon_greedy
        self.recommendation_list = []
        self.available_movies = all_movies[:]
        self.score = 0

    def add_to_recommendation_list(self, movie, position=None):
        if movie in self.available_movies:
            if position is None:
                self.recommendation_list.append(movie)
            else:
                self.recommendation_list.insert(position, movie)
            self.available_movies.remove(movie)
            self.update_score()

    def add_movie_by_algorithm(self):
        selected_movie = self.epsilon_greedy.select_movie(self.available_movies)
        if selected_movie:
            if len(self.recommendation_list) < self.MAX_RECOMMENDATIONS:
                self.recommendation_list.append(selected_movie)
                self.available_movies.remove(selected_movie)
            else:
                # Calculate scores for all movies in the recommendation list
                movie_scores = [(movie, calculate_score(self.user_profile, movie)) for movie in self.recommendation_list]
                
                # Find the movie with the lowest score in the recommendation list
                worst_movie, worst_score = min(movie_scores, key=lambda x: x[1])
                
                # Calculate the score of the selected movie
                selected_movie_score = calculate_score(self.user_profile, selected_movie)
                
                # Replace the worst movie if the selected movie has a better score
                if selected_movie_score > worst_score:
                    self.recommendation_list.remove(worst_movie)
                    self.recommendation_list.append(selected_movie)
                    self.available_movies.remove(selected_movie)
                    self.available_movies.append(worst_movie)
                    print(f"Replaced '{worst_movie.title}' with '{selected_movie.title}'")
            
            #print(f"Selected movie: {selected_movie.title}")
            self.update_score()


    def remove_from_recommendation_list(self, movie_id):
        for movie in self.recommendation_list:
            if movie.movie_id == movie_id:
                self.recommendation_list.remove(movie)
                self.available_movies.append(movie)  # Add back to available movies
                break
        self.update_score()

    def update_score(self):
        for movie in self.recommendation_list:
            score = calculate_score(self.user_profile, movie)
            if self.epsilon_greedy is not None:
                self.epsilon_greedy.update_score(movie.movie_id, score)
        self.score = calculate_total_score(self.user_profile, self.recommendation_list)

    
    def move_movie(self, old_position, new_position):
        if 0 <= old_position < len(self.recommendation_list) and 0 <= new_position < len(self.recommendation_list):
            movie = self.recommendation_list.pop(old_position)
            self.recommendation_list.insert(new_position, movie)
            self.update_score()
        else:
            print("Invalid positions provided")

    def clear_recommendation_list(self):
        self.recommendation_list = []
        self.score = 0

def create_game_session(user_profile, epsilon_greedy, all_movies):
    game_session = GameSession(user_profile, epsilon_greedy, all_movies)
    return game_session