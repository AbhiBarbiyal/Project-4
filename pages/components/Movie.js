import React from 'react';
import { useRouter } from 'next/router'


import classes from './Movie.module.css';

const Movie = (props) => {
    const router = useRouter()


  return (
    <li onClick={() => props.cardClickHandler(props.movieId)} className={classes.movie}>
      <h2>Movie ID : {props.movieId}</h2>
      <h2>Movie Name : {props.title}</h2>
      {/* <p>{props.openingText}</p> */}
      <img src={props.image}/>
    </li>
  );
};

export default Movie;
