import React from 'react';

import Movie from './Movie';
import classes from './MovieList.module.css';

const MovieList = (props) => {
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.movieId}
          title={movie.title}
          image={movie.image}
          movieId={movie.movieId}
          // releaseDate={movie.release}
          // openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
