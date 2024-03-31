
def calculate_score(user_profile, movie):
    # Weights for each score. These can be adjusted as needed:
    weight_genre = 1
    weight_rating = 0.7
    weight_recency = 0.2
    weight_certification = 0.3

    # Calculate genre score
    genre_score = sum(user_profile.genre_preferences.get(genre, 0) for genre in movie.genres) / len(movie.genres)    
    rating_score = movie.rating
    # recency_score = Based on the age of the user account and the release date of the movie. The futher out the moive is from the user age, the lower the score
    # age_rating_score = depending on the age rating of the movie and the userpreference , the score is adjusted
    # (TBD) lenght_score = if the movie is outside the users preferred lenght, the score is lower this could also be decided based on user's device type

    # Calculate recency score (example calculation)
    current_year = 2024  # This could be dynamic
    movie_year = int(movie.release_date[:4])  # Assuming release_date is a string in 'YYYY-MM-DD' format
    recency_score = 1 - (current_year - movie_year) / 100  # Example calculation

    # Calculate age rating score (example calculation)
    certification_score = user_profile.certification_preferences.get(movie.age_rating, 0) / 5  # Assuming max score is 5

    # Combine scores
    total_score = (genre_score * weight_genre +
                   rating_score * weight_rating +
                   recency_score * weight_recency +
                   certification_score * weight_certification)

    return total_score