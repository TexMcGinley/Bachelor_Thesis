def calculate_score(user_profile, movie):
    '''
    Calculates the score for a given movie based on the user's profile preferences.

    Args:
    ----
    - user_profile (UserProfile): The profile of the user including preferences.
    - movie (Movie): The movie object to be scored.

    Returns:
    ----
    - float: The calculated score for the movie.
    '''
    # Weights for each score component. Adjust these weights as needed:
    weight_genre = 1
    weight_rating = 0
    weight_recency = 0
    weight_certification = 0

    # Calculate genre score based on user preferences
    genre_score = sum(user_profile.genre_preferences.get(genre, 0) for genre in movie.genres) / len(movie.genres)
    
    # Rating score is taken directly from the movie's rating
    rating_score = movie.rating

    # Calculate recency score based on the release year of the movie
    current_year = 2024  # This could be dynamic
    movie_year = int(movie.release_date[:4])  # Assuming release_date is a string in 'YYYY-MM-DD' format
    recency_score = 1 - (current_year - movie_year) / 100  # Example calculation

    # Calculate certification score based on user preferences
    certification_score = user_profile.certification_preferences.get(movie.certification, 0) / 5  # Assuming max score is 5

    # Combine scores using the specified weights
    total_score = (genre_score * weight_genre +
                   rating_score * weight_rating +
                   recency_score * weight_recency +
                   certification_score * weight_certification)

    return total_score

def calculate_total_score(user_profile, recommendation_list):
    '''
    Calculates the total score for a list of recommended movies based on the user's profile preferences.

    Args:
    ----
    - user_profile (UserProfile): The profile of the user including preferences.
    - recommendation_list (list): The list of recommended movies.

    Returns:
    ----
    - float: The total score for the recommendation list.
    '''
    # Initialize total score
    scores = 0

    # Calculate score for each movie in the recommendation list
    for i, movie in enumerate(recommendation_list):
        if movie is not None:
            scores += calculate_score(user_profile, movie)

    # Round the total score to 2 decimal places
    scores = round(scores, 2)
    return scores
