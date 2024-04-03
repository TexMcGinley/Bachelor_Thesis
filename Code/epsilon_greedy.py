import random

class EpsilonGreedy:
    def __init__(self, epsilon, connection):
        self.epsilon = epsilon  # exploration rate
        self.connection = connection
        self.movie_scores = {}  # Keep track of average scores for each movie

    def select_movie(self, available_movies):
        # Explore: select a random movie
        if random.random() < self.epsilon:
            return random.choice(available_movies)
        # Exploit: select the best performing movie so far
        else:
            best_movie = max(available_movies, key=lambda m: self.movie_scores.get(m.movie_id, 0))
            return best_movie

    def update_score(self, movie_id, score):
        # Update the average score for the movie
        old_score = self.movie_scores.get(movie_id, 0)
        # This is a simplified way of updating the score; you might want to calculate an actual average
        new_score = (old_score + score) / 2
        self.movie_scores[movie_id] = new_score
