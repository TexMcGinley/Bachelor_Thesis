import sqlite3
import requests

# Your TMDB API key
api_key = '01d67420c0e9a0cdb6fdc1b5db7ac492'

# Initialize database connection
connection = sqlite3.connect('movies.db')
cursor = connection.cursor()

# Create tables if they don't exist
cursor.execute('''CREATE TABLE IF NOT EXISTS Genres (
    genre_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS Movies (
    movie_id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    release_date DATE,
    rating REAL,
    certification TEXT,
    poster_path TEXT
)''')

cursor.execute('''CREATE TABLE IF NOT EXISTS MovieGenres (
    movie_id INTEGER,
    genre_id INTEGER,
    PRIMARY KEY (movie_id, genre_id),
    FOREIGN KEY (movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY (genre_id) REFERENCES Genres(genre_id)
)''')

# Fetch and insert genres into the Genres table
url_genres = f'https://api.themoviedb.org/3/genre/movie/list?api_key={api_key}'
response = requests.get(url_genres)
genres_data = response.json()
for genre in genres_data['genres']:
    cursor.execute('INSERT OR IGNORE INTO Genres (genre_id, name) VALUES (?, ?)', (genre['id'], genre['name']))

# Number of pages you want to fetch
num_pages = 20

# Define acceptable certifications
acceptable_certifications = ['AL', '6', '9', '12', 'PG-13', 'G', 'PG']

def fetch_and_insert_movies(url, cursor):
    '''
    Fetches movies from the provided URL and inserts them into the database.

    Args:
    ----
    - url (str): The URL to fetch the movies from.
    - cursor (sqlite3.Cursor): The SQLite cursor to execute database operations.
    '''
    response = requests.get(url)
    movies_data = response.json()

    for movie in movies_data['results']:
        # Fetch certification for this movie
        url_certification = f'https://api.themoviedb.org/3/movie/{movie["id"]}/release_dates?api_key={api_key}'
        response = requests.get(url_certification)
        certification_data = response.json()

        certification = None
        for country in certification_data.get('results', []):
            if country['iso_3166_1'] == 'US':
                for release in country['release_dates']:
                    if release.get('certification', '') in acceptable_certifications:
                        certification = release['certification']
                        break
                if certification:
                    break

        # Print movie title and certification for debugging
        print(f'Movie: {movie["title"]}, Certification: {certification}')

        # Only insert the movie if it has an acceptable certification
        if certification:
            # Insert movie into Movies table
            cursor.execute('''INSERT OR IGNORE INTO Movies (movie_id, title, release_date, rating, certification, poster_path) 
                            VALUES (?, ?, ?, ?, ?, ?)''', 
                        (movie['id'], movie['title'], movie['release_date'], 
                            movie['vote_average'], certification, f"https://image.tmdb.org/t/p/w500{movie['poster_path']}"))

            # Fetch and insert genres for this movie
            url_movie_details = f'https://api.themoviedb.org/3/movie/{movie["id"]}?api_key={api_key}&language=en-US'
            response = requests.get(url_movie_details)
            movie_details_data = response.json()

            for genre in movie_details_data['genres']:
                cursor.execute('INSERT OR IGNORE INTO MovieGenres (movie_id, genre_id) VALUES (?, ?)', (movie['id'], genre['id']))

# Iterate over the specified number of pages to fetch popular movies
for page in range(1, num_pages + 1):
    url_popular = f'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page={page}'
    fetch_and_insert_movies(url_popular, cursor)

    # Optional: print progress
    print(f'Page {page} of popular movies completed')

# Commit the transaction and close the connection
connection.commit()
connection.close()
