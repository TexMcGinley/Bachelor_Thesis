import sqlite3

class Movie:
    '''
    Represents a movie object with various attributes.
    '''
    def __init__(self, movie_id, title, genres, rating, release_date, age_rating, poster_path):
        self.movie_id = movie_id
        self.title = title
        self.genres = genres  # A list of genres
        self.rating = rating
        self.release_date = release_date
        self.certification = age_rating
        self.poster_path = poster_path
        self.rank = -1  # Default value for rank
        self.isSmall = False
        self.watched = False

    def __eq__(self, other):
        '''
        Checks if two Movie instances are equal based on their movie_id.
        '''
        if not isinstance(other, Movie):
            return NotImplemented
        return self.movie_id == other.movie_id

    def __hash__(self):
        '''
        Returns the hash of the movie instance based on its movie_id.
        '''
        return hash(self.movie_id)
    
    def to_dict(self):
        '''
        Converts the movie instance to a dictionary.
        '''
        return {
            "id": self.movie_id,
            "title": self.title,
            "releaseDate": self.release_date,
            "rating": self.rating,
            "certification": self.certification,
            "genres": self.genres,
            "imageUrl": self.poster_path,
            "rank": self.rank,
            "isSmall": self.isSmall,
            "watched": self.watched
        }

def connect_to_db(db_name):
    '''
    Connects to the SQLite database.

    Args:
    ----
    - db_name (str): The name of the database file.

    Returns:
    ----
    - sqlite3.Connection: The connection object to the database.
    '''
    connection = sqlite3.connect(db_name)
    return connection

def fetch_movies(connection):
    '''
    Fetches all movies from the database.

    Args:
    ----
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - list: A list of Movie objects.
    '''
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies')
    movies_data = cursor.fetchall()
    movies = []
    for movie_data in movies_data:
        movie_id, title, rating, release_date, certification, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)  # Fetch genres for the movie
        movies.append(Movie(movie_id, title, genres, rating, release_date, certification, poster_path))
    return movies

def get_genres_for_movie(movie_id, connection):
    '''
    Fetches genres for a given movie.

    Args:
    ----
    - movie_id (int): The ID of the movie.
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - list: A list of genre names.
    '''
    cursor = connection.cursor()
    query = """
    SELECT G.name
    FROM Genres G
    INNER JOIN MovieGenres MG ON G.genre_id = MG.genre_id
    WHERE MG.movie_id = ?
    """
    cursor.execute(query, (movie_id,))
    genres_data = cursor.fetchall()
    genres = [genre[0] for genre in genres_data]  # Convert the list of tuples to a list of strings
    return genres

def get_movie_by_title(title, connection):
    '''
    Fetches a movie from the database by its title.

    Args:
    ----
    - title (str): The title of the movie.
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - Movie: The movie object if found, else None.
    '''
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies WHERE title = ?', (title,))
    movie_data = cursor.fetchone()  # fetchone() retrieves the first match
    if movie_data:
        movie_id, title, rating, release_date, age_rating, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)
        return Movie(movie_id, title, genres, rating, release_date, age_rating, poster_path)
    else:
        return None  # If no movie is found with the given title
    
def fetch_movie_by_id(movie_id, connection):
    '''
    Fetches a movie from the database by its ID.

    Args:
    ----
    - movie_id (int): The ID of the movie.
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - Movie: The movie object if found, else None.
    '''
    if not isinstance(movie_id, int):
        raise ValueError("Movie ID must be an integer")
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies WHERE movie_id = ?', (movie_id,))
    movie_data = cursor.fetchone()
    if movie_data:
        movie_id, title, rating, release_date, certification, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)  # Fetch genres for the movie
        return Movie(movie_id, title, genres, rating, release_date, certification, poster_path)
    else:
        return None
    
def id_to_title(movie_id, connection):
    '''
    Converts a movie ID to its title.

    Args:
    ----
    - movie_id (int): The ID of the movie.
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - str: The title of the movie if found, else None.
    '''
    cursor = connection.cursor()
    cursor.execute('SELECT title FROM Movies WHERE movie_id = ?', (movie_id,))
    title = cursor.fetchone()
    if title:
        return title[0]
    else:
        return None
    
def title_to_id(title, connection):
    '''
    Converts a movie title to its ID.

    Args:
    ----
    - title (str): The title of the movie.
    - connection (sqlite3.Connection): The connection object to the database.

    Returns:
    ----
    - int: The ID of the movie if found, else None.
    '''
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id FROM Movies WHERE title = ?', (title,))
    movie_id = cursor.fetchone()
    if movie_id:
        return movie_id[0]
    else:
        return None

