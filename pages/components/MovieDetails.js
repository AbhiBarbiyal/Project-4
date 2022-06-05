import React from 'react'
import { useRouter } from "next/router";

import classes from './MovieDetails.module.css'
import { useEffect, useState } from 'react';

const MovieDetails = (props) => {

  const router = useRouter()

  const [items, setItems] = useState([]);

  // const details = localStorage.getItem("details"); 
  // console.log(details) 
  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("details"));
    // console.log(details.movieId)
      setItems(details);
  }, [items])

  // const deteleHandler = () => {

  //   localStorage.clear();
  // }

  if(items){
    return (
      <div className={classes.movie}>
        <h2>Movie Name : {items.title}</h2>
        <h2>Movie Id : {items.movieId}</h2>
        <h2>Awards : {items.awards}</h2>
        <img src={items.image}/>
        <h3>Languages : {items.language}</h3>
        <h4>Plot : {items.plot}</h4> 
        {/* <div onClick={() => router.push('/')} > */}
        <button onClick={() => router.push("/")}>Go to Main Page</button>
         {/* </div> */}
        
        {/* <p>{props.openingText}</p> */}
        {/* <img src={props.image}/> */}
      </div>
    )
  }
  return <h2 className={classes.movie}>Movie Not Found</h2>
  
}


export default MovieDetails
