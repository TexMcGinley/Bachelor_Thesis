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
        <div className="user-name">
          <h2>{user.name}</h2>
        </div>
        <div className="user-info">
          <h3>User Stats</h3>
          <p className="label">Age :</p>
          <p className="value">{user.age} years</p>
          <p className="label">Location :</p>
          <p className="value">{user.location}</p>
          <p className="label">Device type :</p>
          <p className="value">{user.deviceType}</p>
          <p className="label">Account age :</p>
          <p className="value">{user.accountAge} years</p>
        </div>
      </div>
      <div className="previously-watched-label">
        <h3>Previously Watched Movies</h3>
      </div>
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
            draggable={false} // Not draggable
          />
        ))}
      </div>
    </div>
  );
};

export default UserBar;
