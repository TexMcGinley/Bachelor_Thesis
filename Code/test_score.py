def calculate_score(movie, user_profile):
    genre_score = sum(user_profile['genre_preferences'][genre] for genre in movie['genres']) / len(movie['genres'])
    rating_score = movie['rating']
    recency_score = 1 / (2024 - movie['release_year'])  # Assuming newer movies have lower scores, invert if newer is better
    length_score = 1 if movie['length'] <= user_profile['preferred_length'] else 0  # Example condition
    
    # Now, combine these scores. The weights can be adjusted as needed.
    total_score = (genre_score * weight_genre + 
                   rating_score * weight_rating + 
                   recency_score * weight_recency + 
                   length_score * weight_length)
    
    return total_score

# Example user profile and movie data
user_profile = {
    'genre_preferences': {'Action': 8, 'Comedy': 5, 'Drama': 6, 'Adventure': 7},
    'preferred_length': 120,  # in minutes

    # ... other user info
}

movie = {
    'genres': ['Action', 'Adventure'],
    'rating': 7.5,
    'release_year': 2018,
    'length': 130,  # in minutes
    # ... other movie info
}

# Example weights for each factor
weight_genre = 0.55
weight_rating = 0.39
weight_recency = 0.01
weight_length = 0.05

# Calculate the score
score = calculate_score(movie, user_profile)
print(score)
