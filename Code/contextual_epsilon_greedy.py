import random 

class ContextualEpsilonGreedy:
    def __init__(self, epsilon, connection):
        self.epsilon = epsilon  # exploration rate
        self.connection = connection
        self.movie_scores = {}  # Keep track of average scores for each movie
        self.genres_scores = {} # Keep track of average scores for each genre

    def explore_random_movie(self, available_movies): 
        best_movie = random.choice(available_movies)
        #print("movie selected randomly: ", best_movie.title)
        return best_movie

    def exploit_movie(self, available_movies):
        # Exploitation: Pick the best movie based on genre scores
        best_movie = max(available_movies, key=lambda m: self.calculate_expected_movie_score(m))
        return best_movie
    
    def calculate_expected_movie_score(self, movie):
        # Calculate the expected score for a movie based on the average of its genre scores
        if not movie.genres:
            return 0  # No genres to calculate from
        
        total_score = 0
        genre_count = 0
        for genre in movie.genres:
            if genre in self.genres_scores:
                score, count = self.genres_scores[genre]
                if count > 0:  # Ensure that there is at least one count to avoid division by zero
                    total_score += score / count
                    genre_count += 1

        if genre_count == 0:
            return 0  # Avoid division by zero if no genre counts are available
        return total_score / genre_count  # Return the average score per genre
    
    def select_10_best_movie_on_score(self):
        # Assuming movie_scores is a dictionary with movie_id as keys and scores as values
        # Sort movies based on scores in descending order
        sorted_movies = sorted(self.movie_scores.items(), key=lambda item: item[1], reverse=True)
        
        # Extract the top 10 movie ids (assuming the scores are the second element in the tuple)
        best_movies = [movie_id for movie_id, score in sorted_movies[:10]]
        
        # Optionally, return the actual movie objects if you have a way to retrieve them using their IDs
        # For example, if you have a method to get movie objects by ID:
        # best_movie_objects = [self.get_movie_by_id(movie_id) for movie_id in best_movies]
        
        return best_movies
    
    def get_movie_score(self, movie):
        return self.movie_scores.get(movie.movie_id, (0, 0))[0]
    
    def get_genre_score(self, genre):
        return self.genres_scores.get(genre, (0, 0))[0]
        
    def update_score(self, movie, score):
        # Update the movie's average score
        self.calculate_movie_genre_score(movie, score)
        if movie.movie_id in self.movie_scores:
            old_score, count = self.movie_scores[movie.movie_id]
            new_score = (old_score * count + score) / (count + 1)
            self.movie_scores[movie.movie_id] = (new_score, count + 1)
        else:
            self.movie_scores[movie.movie_id] = (score, 1)
    
    def calculate_movie_genre_score(self, movie, score):
        # Calculate the average score of the movie based on its genres
        if not movie.genres or all(genre not in self.genres_scores for genre in movie.genres):
            return 0  # Default score if no genre information is available
        
        total_score, genre_count = 0, 0
        for genre in movie.genres:
            if genre in self.genres_scores:
                score, count = self.genres_scores[genre]
                total_score += score
                genre_count += 1

        return total_score / genre_count if genre_count > 0 else 0


    def update_genre_score(self, genre, score):
        if genre in self.genres_scores:
            old_score, count = self.genres_scores[genre]
            new_score = (old_score * count + score) / (count + 1)
            self.genres_scores[genre] = (new_score, count + 1)
        else:
            self.genres_scores[genre] = (score, 1)
    
    def cold_start(self, movie):
        # Create a table of genre scores based on previously watched movies
        print(movie)
        for genre in movie.genres:
            if genre in self.genres_scores:
                old_score, count = self.genres_scores[genre]
                self.genres_scores[genre] = (10 + old_score, 1 + count)
            else:
                self.genres_scores[genre] = (10, 1)

    def initialize_genre_table(self):
        # Initialize each genre with a tuple (cumulative_score, count)
        self.genres_scores = {
            'Adventure': (0, 0), 'Fantasy': (0, 0), 'Animation': (0, 0), 
            'Drama': (0, 0), 'Horror': (0, 0), 'Action': (0, 0), 
            'Comedy': (0, 0), 'History': (0, 0), 'Thriller': (0, 0), 
            'Crime': (0, 0), 'Documentary': (0, 0), 'Science Fiction': (0, 0), 
            'Mystery': (0, 0), 'Music': (0, 0), 'Romance': (0, 0), 
            'Family': (0, 0), 'War': (0, 0), 'Western': (0, 0), 'TV Movie': (0, 0)
        }

    def print_genre_table(self):
        for genre, (score, count) in self.genres_scores.items():
            print(f"{genre}: {score} ({count} movies)")


def create_contextual_epsilon_greedy(epsilon, connection):
    return ContextualEpsilonGreedy(epsilon, connection)
