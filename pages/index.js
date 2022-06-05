import styles from '../styles/Home.module.css'
import React, { useState, useEffect} from 'react';
import MoviesList from './components/MovieList';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import Link from "next/link";

export default function Home() {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedMovie, setSearchedMovie] = useState("Batman");
  const [movieDetail, setMovieDetail] = useState([]);
  const [never, setNever] = useState(false);



  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    setError(null);
    // console.log(`in fetch ${searchedMovie}`)
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
      // console.log(error.message)
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
  const cardClickHandler = async(id) => {
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=cfbe087e&i=${id}&plot=full`);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      // console.log(data.Search[0].Title);
      const detailInMovies = [];
      let c = 0;
      if(!data.Response){
        throw new Error('Movie Not Found');
      }
      // console.log(data.Title)

      
    
          // console.log(data.Search[0].imdbID)
          detailInMovies.push(
            {
              movieId: data.imdbID,
              title : data.Title,
              image : data.Poster,
              plot : data.Plot,
              language : data.Language,
              awards : data.Awards
              // openingText : data.Search[c].Year,
              // releaseDate : data.Search[c].Year,
            }
          )
            // console.log(detailInMovies[0])
          setMovieDetail(detailInMovies[0])
        
      
     
      // console.log(loadedMovies)
      localStorage.setItem("details", JSON.stringify(detailInMovies[0]))
      // localStorage.getItem("details");
      setMovies(loadedMovies);
      
    } catch (error) {
      // console.log(error.message)
      setError(error.message);
    }
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList cardClickHandler={cardClickHandler} movies={movies} />;
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
      {/* <button type="button" onClick={() => router.push('/MovieDetails')}>
      Click me
    </button> */}
      <AddMovie searchMovies={fetchMoviesHandler} addSearchMovie={setSearchedMovie} onAddMovie={addMovieHandler}/>
      <br></br>
      {/* <button className={styles.btn} onClick={fetchMoviesHandler}>Search Movies</button> */}
      </section>
      {/* <section>
      </section>  */}
      <section>{content}</section>
      <div className={styles.point}>
      {/* <MovieDetails details={movieDetail}/> */}
      </div>
      {/* <Link
          href={{
            pathname: "/components/MovieDetails",
            query: movieDetail, // the data
          }}
        > 
        <a style={{ color: "blue", textDecoration: "underline" }}>
        Go to SomePage
        </a>
        </Link> */}
    </React.Fragment>
  )
}
