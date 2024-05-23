import React from "react";
import "./UserBar.css";
import { Movie } from "../Movie/Movie"; // Assuming Movie component is reusable for this purpose

const UserBar = ({ user, watchedMovies }) => {
  return (
    <div className="user-bar">
      <div className="user-profile">
        <div className="user-avatar">
          <img src={user.avatar} alt="User" />
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p>Age: {user.age}</p>
          <p>Location: {user.location}</p>
          <p>Device type: {user.deviceType}</p>
          <p>Account age: {user.accountAge} years</p>
        </div>
      </div>
      <h3>Previously Watched Movies</h3>
      <div className="previously-watched">
        {watchedMovies.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            imageUrl={movie.imageUrl}
            releaseDate={movie.releaseDate}
            genres={movie.genres}
            rating={movie.rating}
            certification={movie.certification}
            isSmall={movie.isSmall}
          />
        ))}
      </div>
    </div>
  );
};

export default UserBar;
