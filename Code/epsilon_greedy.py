import random

class EpsilonGreedy:
    def __init__(self, epsilon, connection):
        self.epsilon = epsilon  # exploration rate
        self.connection = connection
        self.min_epsilon = 0.001 # Minimum value for epsilon
        self.epsilon_decay = 0.99995 # Decay rate for epsilon
        self.movie_scores = {}  # Keep track of average scores for each movie
    
    def update_epsilon(self): # Decay epsilon
        self.epsilon = max(self.min_epsilon, self.epsilon * self.epsilon_decay)
    
    def explore_or_exploit(self, available_movies): # Choose to explore or exploit
        if random.random() < self.epsilon:
            return self.explore_random_movie(available_movies)
        else:
            return self.exploit_movie(available_movies)

    def explore_random_movie(self, available_movies): 
        # Exploration: Pick a random movie
        best_movie = random.choice(available_movies) # Pick a random movie
        #print("movie selected randomly: ", best_movie.title)
        return best_movie

    def exploit_movie(self, available_movies):
        # Exploitation: Pick the best movie based on genre scores
        best_movie = max(
            available_movies,
            key=lambda m: self.movie_scores.get(m.movie_id, (0, 0))[0]  # Get the score part of the (score, count) tuple
        )
        #print("movie selected based on score:", best_movie.title)
        #print("Score: ", self.movie_scores.get(best_movie.movie_id, (0, 0))[0])
        return best_movie
        
    def get_movie_score(self, movie): # Get the score for a movie
        return self.movie_scores.get(movie.movie_id, (0, 0))[0]
        

    def update_score(self, movie, score): # Update the score for a movie
        # Update the movie's average score
        #print("movie_id: ", movie.title, " score: ", score)
        if movie.movie_id in self.movie_scores:
            old_score, count = self.movie_scores[movie.movie_id]
            new_score = (old_score * count + score) / (count + 1)
            self.movie_scores[movie.movie_id] = (new_score, count + 1)
        else:
            self.movie_scores[movie.movie_id] = (score, 1)
