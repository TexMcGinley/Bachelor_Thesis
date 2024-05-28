from movie import fetch_movie_by_id

class UserProfile:
     def __init__(self, name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic): #, length_preferences
          self.name = name
          self.age = age
          self.location = location
          self.device_type = device_type
          self.account_age = account_age
          self.genre_preferences = genre_preferences  # A dictionary with genre scores
          self.certification_preferences = certification_preferences
          #self.length_preferences = length_preferences (figure out how to scrape this or scrap it)
          self.watched_movies = watched_movies
          self.profile_pic = profile_pic # Placeholder path for the avatar
     
     def add_to_watched_movies(self, movie):
          self.watched_movies.append(movie)

     def set_watched_movies(self, watched_movies_ids, connection):
          for movie_id in watched_movies_ids:
               movie = fetch_movie_by_id(movie_id, connection)
               if movie:
                    self.add_to_watched_movies(movie)


def create_user_profile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic): #, length_preferences
   user_profile = UserProfile(name, age, location, device_type, account_age, genre_preferences, certification_preferences, watched_movies, profile_pic)
   return user_profile
   
def create_genre_preferences(adventure, fantasy, animation, drama, horror, action, comedy, history, thriller, crime, documentary, science_fiction, mystery, music, romance, family, war, western, tv_movie):
   genre_preference = {'Adventure': adventure, 'Fantasy': fantasy, 'Animation': animation, 'Drama': drama, 'Horror': horror, 'Action': action, 'Comedy': comedy, 'History': history, 'Thriller': thriller, 'Crime': crime, 'Documentary': documentary, 'Science Fiction': science_fiction, 'Mystery': mystery, 'Music': music, 'Romance': romance, 'Family': family, 'War': war, 'Western': western, 'TV Movie': tv_movie}  
   return genre_preference