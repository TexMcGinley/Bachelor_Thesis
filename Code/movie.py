import sqlite3

class Movie:
    def __init__(self, movie_id, title, genres, rating, release_date, age_rating, poster_path):
        self.movie_id = movie_id
        self.title = title
        self.genres = genres  # A list of genres
        self.rating = rating
        self.release_date = release_date
        #self.length = length
        self.certification = age_rating
        self.poster_path = poster_path
        self.rank = -1 # Default value for rank
        self.isSmall = False
        self.watched = False

    def __eq__(self, other):
        if not isinstance(other, Movie):
            return NotImplemented
        return self.movie_id == other.movie_id

    def __hash__(self):
        return hash(self.movie_id)
    
    def to_dict(self):
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
    connection = sqlite3.connect(db_name)
    return connection

def fetch_movies(connection):
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies')
    movies_data = cursor.fetchall()
    movies = []
    for movie_data in movies_data:
        movie_id, title, rating, release_date, certification, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)  # Assuming a function to fetch genres
        movies.append(Movie(movie_id, title, genres, rating, release_date, certification, poster_path))
    return movies

def get_genres_for_movie(movie_id, connection):
    cursor = connection.cursor()
    query = """
    SELECT G.name
    FROM Genres G
    INNER JOIN MovieGenres MG ON G.genre_id = MG.genre_id
    WHERE MG.movie_id = ?
    """
    cursor.execute(query, (movie_id,))
    genres_data = cursor.fetchall()
    # Convert the list of tuples to a list of strings
    genres = [genre[0] for genre in genres_data]
    return genres

def get_movie_by_title(title, connection):
    cursor = connection.cursor()
    # Use parameter substitution to prevent SQL injection
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies WHERE title = ?', (title,))
    movie_data = cursor.fetchone()  # fetchone() retrieves the first match
    if movie_data:
        movie_id, title, rating, release_date, age_rating, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)
        return Movie(movie_id, title, genres, rating, release_date, age_rating, poster_path)
    else:
        return None  # If no movie is found with the given title
    
def fetch_movie_by_id(movie_id, connection):
    if not isinstance(movie_id, int):
        raise ValueError("Movie ID must be an integer")
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id, title, rating, release_date, certification, poster_path FROM Movies WHERE movie_id = ?', (movie_id,))
    movie_data = cursor.fetchone()
    if movie_data:
        movie_id, title, rating, release_date, certification, poster_path = movie_data
        genres = get_genres_for_movie(movie_id, connection)  # Make sure to get genres too
        return Movie(movie_id, title, genres, rating, release_date, certification, poster_path)  # Certification is the 'age_rating'
    else:
        return None
    
def id_to_title(movie_id, connection):
    cursor = connection.cursor()
    cursor.execute('SELECT title FROM Movies WHERE movie_id = ?', (movie_id,))
    title = cursor.fetchone()
    if title:
        return title[0]
    else:
        return None
    
def title_to_id(title, connection):
    cursor = connection.cursor()
    cursor.execute('SELECT movie_id FROM Movies WHERE title = ?', (title,))
    movie_id = cursor.fetchone()
    if movie_id:
        return movie_id[0]
    else:
        return None
    
#Need a function for getting the movie name by passing in the movie id
    

