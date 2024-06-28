from movie import fetch_movie_by_id

class UserProfile:
    def __init__(self, name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic):
        '''
        Initializes the UserProfile instance with user details and preferences.

        Args:
        ----
        - name (str): The name of the user.
        - age (int): The age of the user.
        - location (str): The location of the user.
        - device_type (str): The type of device the user uses.
        - account_age (int): The age of the user's account in years.
        - genre_preferences (dict): A dictionary with genre scores.
        - certification_preferences (dict): A dictionary with certification preferences.
        - watched_movies (list): A list of watched movie IDs.
        - profile_pic (str): The file path for the user's profile picture.
        '''
        self.name = name
        self.age = age
        self.location = location
        self.device_type = device_type
        self.account_age = account_age
        self.genre_preferences = genre_preferences  # A dictionary with genre scores
        self.certification_preferences = certification_preferences
        self.watched_movies = watched_movies
        self.profile_pic = profile_pic  # Placeholder path for the avatar

    def add_to_watched_movies(self, movie):
        '''
        Adds a movie to the user's watched movies list.

        Args:
        ----
        - movie (Movie): The movie object to add to the watched list.
        '''
        self.watched_movies.append(movie)

    def set_watched_movies(self, watched_movies_ids, connection):
        '''
        Sets the watched movies for the user by fetching movie details from the database.

        Args:
        ----
        - watched_movies_ids (list): A list of watched movie IDs.
        - connection: The database connection object.
        '''
        for movie_id in watched_movies_ids:
            movie = fetch_movie_by_id(movie_id, connection)
            if movie:
                self.add_to_watched_movies(movie)


def create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic):
    '''
    Creates a new UserProfile instance with the given details.

    Args:
    ----
    - name (str): The name of the user.
    - age (int): The age of the user.
    - location (str): The location of the user.
    - device_type (str): The type of device the user uses.
    - account_age (int): The age of the user's account in years.
    - genre_preferences (dict): A dictionary with genre scores.
    - certification_preferences (dict): A dictionary with certification preferences.
    - watched_movies (list): A list of watched movie IDs.
    - profile_pic (str): The file path for the user's profile picture.

    Returns:
    ----
    - UserProfile: The created UserProfile instance.
    '''
    user_profile = UserProfile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic)
    return user_profile
   
def create_genre_preferences(adventure, fantasy, animation, drama, horror, action, comedy, history, thriller, crime, documentary, science_fiction, mystery, music, romance, family, war, western, tv_movie):
    '''
    Creates a dictionary of genre preferences.

    Args:
    ----
    - adventure (int): The preference score for Adventure genre.
    - fantasy (int): The preference score for Fantasy genre.
    - animation (int): The preference score for Animation genre.
    - drama (int): The preference score for Drama genre.
    - horror (int): The preference score for Horror genre.
    - action (int): The preference score for Action genre.
    - comedy (int): The preference score for Comedy genre.
    - history (int): The preference score for History genre.
    - thriller (int): The preference score for Thriller genre.
    - crime (int): The preference score for Crime genre.
    - documentary (int): The preference score for Documentary genre.
    - science_fiction (int): The preference score for Science Fiction genre.
    - mystery (int): The preference score for Mystery genre.
    - music (int): The preference score for Music genre.
    - romance (int): The preference score for Romance genre.
    - family (int): The preference score for Family genre.
    - war (int): The preference score for War genre.
    - western (int): The preference score for Western genre.
    - tv_movie (int): The preference score for TV Movie genre.

    Returns:
    ----
    - dict: A dictionary with genre preferences.
    '''
    genre_preference = {
        'Adventure': adventure, 'Fantasy': fantasy, 'Animation': animation, 'Drama': drama, 'Horror': horror, 
        'Action': action, 'Comedy': comedy, 'History': history, 'Thriller': thriller, 'Crime': crime, 
        'Documentary': documentary, 'Science Fiction': science_fiction, 'Mystery': mystery, 'Music': music, 
        'Romance': romance, 'Family': family, 'War': war, 'Western': western, 'TV Movie': tv_movie
    }
    return genre_preference
