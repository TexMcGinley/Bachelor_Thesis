import random 

class ContextualEpsilonGreedy:
    def __init__(self, epsilon, connection):
        self.epsilon = epsilon  # exploration rate
        self.connection = connection
        self.movie_scores = {}  # Keep track of average scores for each movie

    def select_movie(self, available_movies):
        if random.random() < self.epsilon:
            return random.choice(available_movies)
        else:
            best_movie = max(
                available_movies,
                key=lambda m: self.movie_scores.get(m.movie_id, (0, 0))[0]  # Get the score part of the (score, count) tuple
            )
            return best_movie
        
    def update_score(self, movie_id, score):
        # Update the movie's average score
        if movie_id in self.movie_scores:
            old_score, count = self.movie_scores[movie_id]
            new_score = (old_score * count + score) / (count + 1)
            self.movie_scores[movie_id] = (new_score, count + 1)
        else:
            self.movie_scores[movie_id] = (score, 1)