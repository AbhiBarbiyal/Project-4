import React from 'react';
import { useRouter } from 'next/router'


import classes from './Movie.module.css';

const Movie = (props) => {
    const router = useRouter()


  return (
      <div onClick={() => props.cardClickHandler(props.movieId)}>
    <li onClick={() => router.push('./components/MovieDetails')} className={classes.movie}>
      <h2>Movie ID : {props.movieId}</h2>
      <h2>Movie Name : {props.title}</h2>
      {/* <p>{props.openingText}</p> */}
      <img src={props.image}/>
    </li>
    </div>
  );
};

export default Movie;
