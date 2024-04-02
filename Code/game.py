from score import calculate_score, calculate_total_score

class GameSession:
    def __init__(self, user_profile):
        self.user_profile = user_profile
        self.recommendation_list = []
        self.score = 0

    def add_to_recommendation_list(self, movie, position=None):
        if position is None:
            self.recommendation_list.append(movie)
        else:
            self.recommendation_list.insert(position, movie)
        self.update_score()

    def update_score(self):
        self.score = calculate_total_score(self.user_profile, self.recommendation_list)
        print("current score =", self.score)

    def remove_from_recommendation_list(self, movie_id):
        for movie in self.recommendation_list:
            if movie.movie_id == movie_id:
                self.recommendation_list.remove(movie)
                break  # Exit the loop after removing the movie
        print("current recommendation list =", self.recommendation_list)
        self.update_score()
    
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

def create_game_session(user_profile):
    game_session = GameSession(user_profile)
    return game_session