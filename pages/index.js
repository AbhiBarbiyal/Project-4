import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect, useCallback } from 'react';
import MoviesList from './components/MovieList';
import AddMovie from './components/AddMovie';

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState("Batman");

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    console.log(`in fetch ${searchedMovie}`)
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=cfbe087e&s=${searchedMovie}`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      // console.log(data.Search[0].Title);
      const loadedMovies = [];
      let c = 0;
      if(!data.Response){
        throw new Error('Movie Not Found');
      }
      // console.log(data.Response)

      
      if(data.Response){
        for(const key in data){
          // console.log(data.Search[0].imdbID)
          loadedMovies.push(
  
            {
              movieId: data.Search[c].imdbID,
              title : data.Search[c].Title,
              image : data.Search[c].Poster,
              // openingText : data.Search[c].Year,
              // releaseDate : data.Search[c].Year,
            }
          )
          c++;
        }
      }
     
      // console.log(loadedMovies)
      setMovies(loadedMovies);
      
    } catch (error) {
      console.log(error.message)
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  function addMovieHandler(movie) {
    // const response = await fetch('https://https-react-668e7-default-rtdb.firebaseio.com/movies.json',{
    //   method : 'POST',
    //   header : {
    //     'Content-Type' : 'application/json'
    //   },
    //   body : JSON.stringify(movie)
    // }) 
    // const data = await response.json();
    // console.log(movie);
    // setSearchedMovie(movie)
    // fetchMoviesHandler();
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p className={styles.section}>Loading...</p>;
  }


  return (
     <React.Fragment>
      {/* <section>
        { <AddMovie onAddMovie={addMovieHandler} /> }
      {/* </section> */} 
      <section className={styles.section}>
      <AddMovie searchMovies={fetchMoviesHandler} addSearchMovie={setSearchedMovie} onAddMovie={addMovieHandler}/>
      <br></br>
      {/* <button className={styles.btn} onClick={fetchMoviesHandler}>Search Movies</button> */}
      </section>
      {/* <section>
      </section>  */}
      <section>{content}</section>
    </React.Fragment>
  )
}
