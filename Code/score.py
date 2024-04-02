
def calculate_score(user_profile, movie):
    # Weights for each score. These can be adjusted as needed:
    weight_genre = 7
    weight_rating = 5
    weight_recency = 5
    weight_certification = 10

    # Calculate genre score
    genre_score = sum(user_profile.genre_preferences.get(genre, 0) for genre in movie.genres) / len(movie.genres)    
    rating_score = movie.rating
    # recency_score = Based on the age of the user account and the release date of the movie. The futher out the moive is from the user age, the lower the score
    # age_rating_score = depending on the age rating of the movie and the userpreference , the score is adjusted
    # (TBD) lenght_score = if the movie is outside the users preferred lenght, the score is lower this could also be decided based on user's device type

    # Calculate recency score (example calculation)
    current_year = 1994  # This could be dynamic
    movie_year = int(movie.release_date[:4])  # Assuming release_date is a string in 'YYYY-MM-DD' format
    recency_score = 1 - (current_year - movie_year) / 100  # Example calculation

    # Calculate age rating score (example calculation)
    certification_score = user_profile.certification_preferences.get(movie.age_rating, 0) / 5  # Assuming max score is 5
    	
    # print("genre_score: ", genre_score)
    # print("rating_score: ", rating_score)
    # print("recency_score: ", recency_score)
    # print("certification_score: ", certification_score)

    # print("genre_score * weight_genre: ", genre_score * weight_genre)
    # print("rating_score * weight_rating: ", rating_score * weight_rating)
    # print("recency_score * weight_recency: ", recency_score * weight_recency)
    # print("certification_score * weight_certification: ", certification_score * weight_certification)


    # Combine scores
    total_score = (genre_score * weight_genre +
                   rating_score * weight_rating +
                   recency_score * weight_recency +
                   certification_score * weight_certification)

    return total_score


def calculate_total_score(user_profile, recommendation_list):
    # Ranking wieghts:
    postition_weights = [1.6, 1.2, 1.0, 1.0, 0.8, 0.8, 0.6, 0.6, 0.5, 0.5]
    scores = 0
    # Calculate score for each movie in the recommendation list
    for i, movie in enumerate(recommendation_list):
        scores += postition_weights[i] * calculate_score(user_profile, movie)

    #scores = [(movie, calculate_score(user_profile, movie)) for movie in recommendation_list]
    return scores