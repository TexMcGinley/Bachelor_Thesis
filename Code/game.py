from score import calculate_score, calculate_total_score
from movie import fetch_movie_by_id, get_movie_by_title, Movie, connect_to_db, fetch_movies
from epsilon_greedy import EpsilonGreedy
import random

class GameSession:
    MAX_RECOMMENDATIONS = 10
    MAX_MOVES = 20
    NUMBER_OF_ROUNDS = 4

    def __init__(self, user_profile, epsilon_greedy, all_movies, connection, epsilon_game_session=None):
        self.user_profile = user_profile
        self.epsilon_greedy = epsilon_greedy
        self.recommendation_list = []
        self.available_movies = all_movies[:]
        self.score = 0
        self.scores = []
        self.iteration_count = 0
        self.learning_phase = True
        self.connection = connection
        self.round = 1
        self.moves_left = GameSession.MAX_MOVES
        self.eplison_values = [1, 0.90, 0.75, 0.5, 0.001]
        self.epsilon_game_session = epsilon_game_session

    def add_to_recommendation_list_algorithm(self, movie, temp_score=None, position=None): # Add a movie to the recommendation list based on the epsilon greedy algorithm
        self.available_movies = [m for m in self.available_movies if m is not None and hasattr(m, 'movie_id')]
        available_movies_ids = [m.movie_id for m in self.available_movies]

        if movie.movie_id in available_movies_ids:
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
        selected_movie = self.epsilon_greedy.explore_or_exploit(self.available_movies)  # Select a movie based on the epsilon greedy algorithm
        # Replace the last movie in the recommendation list if it is full
        if len(self.recommendation_list) == self.MAX_RECOMMENDATIONS:
            last_movie = self.recommendation_list.pop()  # Remove the last movie in the recommendation list
            if last_movie is not None:
                self.available_movies.append(last_movie)  # Add the last movie back to the available movies
            self.update_score()

        temp_score = self.score  # Record the score of the recommendation list before adding the selected movie
        if selected_movie is not None:
            self.add_to_recommendation_list_algorithm(selected_movie, temp_score)  # Add the selected movie to the recommendation list
        # Ensure only non-None movies are considered in sorting
        self.recommendation_list = [m for m in self.recommendation_list if m is not None]
        self.recommendation_list.sort(key=lambda x: self.epsilon_greedy.get_movie_score(x), reverse=True)

    
    def calculate_epsilon_greedy_score(self):
        self.epsilon_greedy.update_epsilon(self.eplison_values[self.round - 1])
        print("Epsilon value: ", self.eplison_values[self.round - 1])
        for _ in range(self.MAX_MOVES):
            self.add_movie_by_algorithm()
        return self.score

    def submit_round(self):
        epsilon_score = self.epsilon_game_session.calculate_epsilon_greedy_score()
        epsilon_value = self.epsilon_game_session.epsilon_greedy.epsilon
        print("Epsilon Greedy score: ", epsilon_score, "at epsilon value: ", epsilon_value)
        self.epsilon_game_session.clear_recommendation_list() 
        return self.score, epsilon_score, epsilon_value


    def remove_from_recommendation_list(self, movie_id):
        for movie in self.recommendation_list:
            if movie.movie_id == movie_id:
                self.recommendation_list.remove(movie)
                self.available_movies.append(movie)  # Add back to available movies
                self.update_score()
                break
        self.update_score()

    def update_score(self):
        self.score = calculate_total_score(self.user_profile, self.recommendation_list) # Calculate the total score of the recommendation list
        

    def algorithm_update_score(self, movie, score):
        self.update_score() # Update the total score before updating the movie score

        # Update the movie score
        if score is None:
            score = self.score
        
        self.scores.append(self.score) # Record the score
        self.epsilon_greedy.update_score(movie, score) # Update the movie score in the epsilon greedy algorithm

        
    def move_movie(self, from_index, to_index):
        from_ranked = False
        to_ranked = False
        if from_index.isdigit():
            from_index = int(from_index)
        elif 'rank-slot' in from_index:
            from_index = int(from_index.split('-')[-1])
            from_ranked = True

        if to_index.isdigit():
            to_index = int(to_index)
        elif 'rank-slot' in to_index:
            to_index = int(to_index.split('-')[-1])
            to_ranked = True

        if from_ranked and to_ranked:
            if (self.recommendation_list[from_index] is not None and self.recommendation_list[to_index] is not None):
                if (from_index >= 0 and from_index < self.MAX_RECOMMENDATIONS and to_index >= 0 and to_index < self.MAX_RECOMMENDATIONS):
                    movie = self.recommendation_list[from_index]
                    temp_rank = from_index
                    self.recommendation_list[from_index] = self.recommendation_list[to_index]
                    self.recommendation_list[to_index] = movie
                    self.recommendation_list[from_index].rank = from_index
                    self.recommendation_list[to_index].rank = to_index 
                    self.update_score()
                    return
            elif self.recommendation_list[from_index] is None and self.recommendation_list[to_index] is not None:
                movie = self.recommendation_list[to_index]
                self.recommendation_list[to_index] = None
                self.recommendation_list[from_index] = movie
                self.recommendation_list[from_index].rank = from_index
                self.update_score()
                return
            elif self.recommendation_list[from_index] is not None and self.recommendation_list[to_index] is None:
                movie = self.recommendation_list[from_index]
                self.recommendation_list[from_index] = None
                self.recommendation_list[to_index] = movie
                self.recommendation_list[to_index].rank = to_index
                self.update_score()
                return
        elif (not from_ranked) and to_ranked: # if the from index is from the movie grid and the to index is a rank slot
            from_movie = self.get_available_movie_by_id(from_index)
            if from_movie is not None and to_index >= 0 and to_index < self.MAX_RECOMMENDATIONS:
                if self.recommendation_list[to_index] is None:
                    self.recommendation_list[to_index] = from_movie
                    self.recommendation_list[to_index].rank = to_index
                    self.available_movies.remove(from_movie)
                else:
                    self.swap_movies(from_movie, self.recommendation_list[to_index])
            self.update_score()
            return
        elif from_ranked and not to_ranked: # if the from index is from the rank slot and the to index is the movie grid
            if from_index >= 0 and from_index < self.MAX_RECOMMENDATIONS:
                movie = self.recommendation_list[from_index]
                movie.rank = -1
                self.recommendation_list[from_index] = None
                self.available_movies.insert(0, movie)
                self.update_score()
                return
        elif not from_ranked and not to_ranked:  # if both indexes are from the movie grid
            from_movie = self.get_available_movie_by_id(from_index)
            to_movie = self.get_available_movie_by_id(to_index)
            if from_movie is not None and to_movie is not None:
                self.swap_movies(from_movie, to_movie)
            return
        
              
    def clear_recommendation_list(self):
        for i in range(len(self.recommendation_list)):
            if self.recommendation_list[i] is not None:
                self.available_movies.insert(0, self.recommendation_list[i])
                self.available_movies[0].rank = -1
                self.recommendation_list[i] = None
        self.score = 0  # Reset the score as the list is now empty


    def add_movie_at_rank(self, movie_title, rank):
        movie = get_movie_by_title(movie_title, self.connection)
        if movie is not None:
            if movie in self.available_movies:
                self.add_to_recommendation_list_algorithm(movie)
            else:
                print("Movie not in available_movies, cannot add to recommendation list.")
        else:
            print("Movie not found in database.")

    def swap_movies(self, movie1, movie2):
        if not isinstance(movie1, Movie) or not isinstance(movie2, Movie):
            raise ValueError("Both parameters must be Movie instances")
        # Safely check if movies are in the recommendation list excluding None values
        recommendation_titles = [movie.title for movie in self.recommendation_list if movie is not None]

        if movie1.title in recommendation_titles and movie2.title in recommendation_titles: # If both movies are in the recommendation list
            idx1 = self.recommendation_list.index(movie1)
            idx2 = self.recommendation_list.index(movie2)
            self.recommendation_list[idx1], self.recommendation_list[idx2] = self.recommendation_list[idx2], self.recommendation_list[idx1]

        elif movie1.title not in recommendation_titles and movie2.title in recommendation_titles: # If the first movie is not in the recommendation list and the second movie is in the recommendation list
            idx = self.recommendation_list.index(movie2)
            self.available_movies.insert(0, movie2)
            self.available_movies[0].rank = -1
            self.recommendation_list[idx] = movie1
            self.recommendation_list[idx].rank = idx    
            self.available_movies.remove(movie1)

        elif movie1.title in recommendation_titles and movie2.title not in recommendation_titles: # If the first movie is in the recommendation list and the second movie is not
            idx = self.recommendation_list.index(movie1)
            self.available_movies.append(movie1)
            self.recommendation_list[idx] = movie2
            self.available_movies.remove(movie2)

        elif movie1.title not in recommendation_titles and movie2.title not in recommendation_titles: # If both movies are not in the recommendation list
            idx1 = self.available_movies.index(movie1)
            idx2 = self.available_movies.index(movie2)
            self.available_movies[idx1], self.available_movies[idx2] = self.available_movies[idx2], self.available_movies[idx1]

        self.update_score()  # Update the score after the swap

            
    def add_random_movie(self):
        idx = 0
        for temp_movie in self.recommendation_list:
            if temp_movie is not None:
                idx+=1
        if idx < self.MAX_RECOMMENDATIONS: # if the recommendation list is not full
            movie = random.choice(self.available_movies)
            self.available_movies.remove(movie)
            self.recommendation_list[idx] = movie
        else: # if the recommendation list is full
            temp_idx = random.randint(0, self.MAX_RECOMMENDATIONS-1)
            movie = random.choice(self.available_movies)
            self.available_movies.remove(movie)
            temp_movie = self.recommendation_list[temp_idx]
            self.recommendation_list.remove(self.recommendation_list[temp_idx])
            self.recommendation_list.insert(temp_idx, movie)
            self.available_movies.insert(0, temp_movie)
        self.update_score()  # Update the score after adding the movie


    def add_to_recommendation_list(self, movie, rank=None):
        if rank is None or self.recommendation_list[rank] is None: # if the rank is not specified or the specifed rank is not occupied
            idx = 0
            for temp_movie in self.recommendation_list:
                if temp_movie is not None:
                    idx+=1
            if idx < self.MAX_RECOMMENDATIONS: # if the recommendation list is not full
                if rank is None:   # if the rank is not specified
                    for temp_movie in self.recommendation_list:
                        if temp_movie is None:
                            self.recommendation_list[self.recommendation_list.index(temp_movie)] = movie
                            break
                    #self.recommendation_list.append(movie) # add the movie to the recommendation list
                    for movie1 in self.available_movies:
                        if movie1.movie_id == movie.movie_id:
                            self.available_movies.remove(movie1)
                    
                else: # if the rank is specified
                    self.recommendation_list[rank] = movie # add the movie to the recommendation list at the specified rank
                    for movie1 in self.available_movies:
                        if movie1.movie_id == movie.movie_id:
                            self.available_movies.remove(movie1)
                    # self.available_movies.remove(movie) # remove the movie from the available movies
                    
            else: # if the recommendation list is full
                print("Recommendation list is full")
                answer2 = input("Do you want to replace a movie in the recommendation list? (Y/N)")
                if answer2.lower() == "y": # if the user wants to replace a movie
                    # print( "Here is your current recommendation list: ")
                    # for movie in self.recommendation_list:
                    #     print(self.recommendation_list.index(movie), movie.title)
                    self.display_recommendation_list()
                    print("Enter the rank of the movie you want to replace (1-10)")
                    rank = (int(input())-1)  # get the rank of the movie to be replaced
                    self.available_movies.append(self.recommendation_list[rank]) # return the movie to the available movies list
                    self.recommendation_list[rank] = movie # add the new movie to the recommendation list at the specified rank
                    self.available_movies.remove(movie) # remove the movie from the available movies 
                    
                else: # if the user does not want to replace a movie
                    print("Movie not added") 
                
        else: # if the rank is occupied
            print("Rank is occupied")
            answer = input("Do you want to swap" + self.recommendation_list[rank].title + "with" + movie.title + " ?(Y/N)")
            if answer.lower == "y":
                self.available_movies.append(self.recommendation_list[rank])
                self.recommendation_list[rank] = movie
                self.available_movies.remove(movie)
            else:
                print("Movie not added") 
        
        self.update_score()  # Update the score 

    def get_available_movie(self, movie_title):
        for movie in self.available_movies:
            if movie.title == movie_title:
                return movie
        return None
    
    def get_available_movie_by_id(self, movie_id):
        print("get_available_movie_by_id: ", movie_id)
        for movie in self.available_movies:
            if int(movie.movie_id) == int(movie_id):
                print("found : ", movie.title)
                return movie
        return None
    
    def get_ranked_movie(self, movie_title):    
        for movie in self.recommendation_list:
            if movie is not None and movie.title == movie_title:
                return movie
        return None

    
    def display_recommendation_list(self):
        print("Recommendation List:")
        idx = 1
        for movie in self.recommendation_list:
            
            if movie is not None:
                print("Movie: " + movie.title + " in rank: ", self.recommendation_list.index(movie) )  # Display the title of the movie  
            else: 
                print("Rank: ", idx, " is empty")   
            idx += 1

    def display_10_available_movies(self):
        print("Available Movies:")
        for movie in self.available_movies[:10]:
            print(movie.title)

    def set_watched_movies(self, watched_movies):
        self.user_profile.watched_movies = []  # Clearing previous watched movies if any
        
        for movie in watched_movies:
            if len(self.user_profile.watched_movies) < 9:
                movie.isSmall = True
                self.user_profile.watched_movies.append(movie)
                for movie1 in self.available_movies:
                    if movie1.movie_id == movie.movie_id:
                        movie1.watched = True
                if movie in self.available_movies:
                    self.available_movies.remove(movie)
            else:
                break
        print(self.user_profile.watched_movies)

    
    def fetch_watched_movies(self):
        return self.user_profile.watched_movies

            
           

            
        
    
def create_game_session(user_profile, epsilon_greedy, all_movies, connection):
    epsilon_greedy = EpsilonGreedy(0.99, connection)
    epsilon_GameSession = GameSession(user_profile, epsilon_greedy, all_movies, connection=connection)
    game_session = GameSession(user_profile, None, all_movies, connection=connection, epsilon_game_session=epsilon_GameSession)
    for _ in range(GameSession.MAX_RECOMMENDATIONS):
        game_session.recommendation_list.append(None)
        game_session.epsilon_game_session.recommendation_list.append(None)
    watched_movies = [fetch_movie_by_id(movie_id, connection) for movie_id in game_session.user_profile.watched_movies]  # Fetch movies.
    game_session.set_watched_movies(watched_movies)
    game_session.epsilon_game_session.set_watched_movies(watched_movies)
    return game_session

def create_game_session_for_plots(user_profile, epsilon_greedy, all_movies, connection):
    game_session = GameSession(user_profile, epsilon_greedy, all_movies, connection=connection)
    for _ in range(GameSession.MAX_RECOMMENDATIONS):
        game_session.recommendation_list.append(None)
    watched_movies = [fetch_movie_by_id(movie_id, connection) for movie_id in game_session.user_profile.watched_movies]  # Fetch movies.
    game_session.set_watched_movies(watched_movies)
    return game_session


    
def start_game1(epsilon_user, user_profile, epsilon_greedy, all_movies, connection):
    epsilon_values = [0.99, 0.85, 0.6, 0.3, 0.000001]
    print("setting up eplison game session")
    Epsilon_GameSession = create_game_session(epsilon_user, epsilon_greedy, all_movies, 0, connection)
    # for m in Epsilon_GameSession.available_movies:
    #     print(m.movie_id)
    print("setting up game session")
    GameSession1= create_game_session(user_profile, None, all_movies, 0, connection)
    print ("Welcome to the movie recommendation game!")
    print ("You will be recommended a list of movies based on your preferences.")
    print ("You can add movies to the recommendation list, remove movies from the recommendation list, and swap the positions of movies in the recommendation list.")
    print ("You can also add movies at a specific rank in the recommendation list.")
    print ("You can view the recommendation list at any time.")
    print ("You can also clear the recommendation list.")
    print ("Let's get started!")
    print ("Here are the first 30 available movies: ")
    for movie in GameSession1.available_movies[:30]: # Display the first 30 available movies
        print(movie.title)
    print ("You can add a movie to the recommendation list by entering the title of the movie.")
    print ("You can remove a movie from the recommendation list by entering the title of the movie.")
    print ("You can swap the positions of two movies in the recommendation list by entering the titles of the two movies.")
    print ("You can add a movie at a specific rank in the recommendation list by entering the title of the movie and the rank.")
    print ("You can view the recommendation list at any time by entering 'view'.")
    print ("You can clear the recommendation list by entering 'clear'.")
    print ("You can exit the game at any time by entering 'exit'.")
    number_of_rounds = 0
    number_of_moves = 0
    while number_of_rounds < GameSession.NUMBER_OF_ROUNDS:
        GameSession1.clear_recommendation_list()
        print ("Here is your current recommendation list: ")
        GameSession1.display_recommendation_list()
        Epsilon_GameSession.clear_recommendation_list()
        print("Round ", number_of_rounds + 1, " started.")
        Epsilon_GameSession.epsilon_greedy.update_epsilon(epsilon_values[number_of_rounds])
        for _ in range(GameSession.MAX_RECOMMENDATIONS):
            Epsilon_GameSession.add_movie_by_algorithm()
        while number_of_moves < GameSession.MAX_MOVES:
            while True:
                action = input("Enter your action: ")
                if action.lower() == "exit":
                    return
                elif action.lower() == "clear":
                    GameSession1.clear_recommendation_list()
                    print ("Recommendation list cleared.")
                elif action.lower() == "view":
                    GameSession1.display_recommendation_list() 
                elif action.lower() == "movies":
                    print ("Here are the first 30 available movies: ")
                    for movie in GameSession1.available_movies[:30]: # Display the first 30 available movies
                        print(movie.title)
                elif action.lower() == "add":
                    movie_title = input("Enter the title of the movie you want to add: ")
                    movie = GameSession1.get_available_movie(movie_title)
                    while movie is None:
                        print("Movie not found in the database.")
                        movie_title = input("Please try and enter the movie again:")
                        movie = GameSession1.get_available_movie(movie_title)
                    print("Movie: ", movie.title)
                    action2 = input("Do you want to add the movie at a specific rank? (Y/N)")
                    if action2.lower() == "y":
                        rank = (int(input("Enter the rank (1-10: ")) -1 )
                        if not (0 <= rank < GameSession.MAX_RECOMMENDATIONS):
                            print("Invalid rank, please enter a rank between 1 and 10.")
                            rank = (int(input("Enter the rank (0-9): ")) - 1)
                            print("Rank: ", rank)
                        print(movie)
                        GameSession1.add_to_recommendation_list(movie, rank)
                    else:
                        GameSession1.add_to_recommendation_list(movie, rank=None)
                    number_of_moves += 1
                    print("Current score: ", GameSession1.score)
                elif action.lower() == "swap":
                    movie1_title = input("Enter the title of the first movie: ")
                    movie1 = GameSession1.get_available_movie(movie1_title)
                    while movie1 is None:
                        print("Movie not found in the database.")
                        movie_title = input("Please try and enter the movie again:")
                        movie1 = GameSession1.get_available_movie(movie_title)

                    movie2_title = input("Enter the title of the second movie: ")
                    movie2 = GameSession1.get_available_movie(movie2_title)
                    while movie2 is None:
                        print("Movie not found in the database.")
                        movie_title = input("Please try and enter the movie again:")
                        movie2 = GameSession1.get_available_movie(movie_title)
                    if (movie1 in GameSession1.recommendation_list and movie2 not in GameSession1.recommendation_list) or (movie1 not in GameSession1.recommendation_list and movie2 in GameSession1.recommendation_list):
                        number_of_moves += 1
                    GameSession1.swap_movies(movie1, movie2)
                    print("Current score: ", GameSession1.score)
                elif action.lower() == "remove":
                    movie_title = input("Enter the title of the movie you want to remove: ")
                    movie = GameSession1.get_ranked_movie(movie_title)
                    while movie is None:
                        print("Movie not found in the database.")
                        movie_title = input("Please try and enter the movie again:")
                        if movie_title == "exit":
                            break
                        movie = GameSession1.get_ranked_movie(movie_title)
                    if movie_title == "exit":
                        break
                    GameSession1.remove_from_recommendation_list(movie.movie_id)
                    print("Current score: ", GameSession1.score)
                elif action.lower() == "submit":
                    print("Recommendation list submitted.")
                    print("Here is your final recommendation list: ")
                    GameSession1.display_recommendation_list()
                    print("Total score: ", GameSession1.score)
                    number_of_moves = GameSession.MAX_MOVES
                    print(number_of_moves)
                    break
        print("Round ", number_of_rounds + 1, " completed.")
        print("Final recommendation list: ")
        GameSession1.display_recommendation_list()
        print("Total score: ", GameSession1.score)
        print("Epsilon Greedy score: ", Epsilon_GameSession.score, "at epsilon value: ", epsilon_values[number_of_rounds])
        print("Epsilon Greedy recommendation list: ")
        Epsilon_GameSession.display_recommendation_list()
        number_of_rounds += 1
        number_of_moves = 0
    print("Game completed.")
    print("Final recommendation list: ")
    GameSession1.display_recommendation_list()
    print("Total score: ", GameSession1.score)
    print("Epsilon Greedy score: ", Epsilon_GameSession.score, "at epsilon value: ", epsilon_values[number_of_rounds])
    print("Epsilon Greedy recommendation list: ")
    Epsilon_GameSession.display_recommendation_list()

        
