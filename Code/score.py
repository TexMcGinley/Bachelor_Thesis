
def calculate_score(user_profile, movie):
    # Weights for each score. These can be adjusted as needed:
    weight_genre = 1
    weight_rating = 0
    weight_recency = 0
    weight_certification = 0


    genre_score = sum(user_profile.genre_preferences.get(genre, 0) for genre in movie.genres) / len(movie.genres)   
    rating_score = movie.rating

    current_year = 2024  # This could be dynamic
    movie_year = int(movie.release_date[:4])  # Assuming release_date is a string in 'YYYY-MM-DD' format
    recency_score = 1 - (current_year - movie_year) / 100  # Example calculation

    # Calculate age rating score (example calculation)
    certification_score = user_profile.certification_preferences.get(movie.certification, 0) / 5  # Assuming max score is 5

    # Combine scores
    total_score = (genre_score * weight_genre +
                   rating_score * weight_rating +
                   recency_score * weight_recency +
                   certification_score * weight_certification)

    return total_score


def calculate_total_score(user_profile, recommendation_list):
    # Ranking wieghts:
    #postition_weights = [1.6, 1.2, 1.0, 1.0, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5]
    #postition_weights = [1,1,1,1,1,1,1,1,1,1]
    scores = 0
    # Calculate score for each movie in the recommendation list
    for i, movie in enumerate(recommendation_list):
        if movie != None:
            scores += calculate_score(user_profile, movie)

    #scores = [(movie, calculate_score(user_profile, movie)) for movie in recommendation_list]
    scores = round(scores, 2)
    return scores