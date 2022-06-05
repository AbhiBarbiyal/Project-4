import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>Movie ID : {props.movieId}</h2>
      <h2>Movie Name : {props.title}</h2>
      {/* <p>{props.openingText}</p> */}
      <img src={props.image}/>
    </li>
  );
};

export default Movie;
