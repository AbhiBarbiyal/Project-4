import React, { useRef, useState } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
//   const [movieName, setmovieName] = useState("")
  const [isEmpty, setIsEmpty] = useState(true);
  const [isTouched, setIsTouched] = useState(false);
//   const titleRef = useRef('');
  // const openingTextRef = useRef('');
  // const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();
    // if(titleRef.current.value == ""){

    // }

    // could add validation here...

    // const movie = {
    //   title: titleRef.current.value,
    //   openingText: openingTextRef.current.value,
    //   releaseDate: releaseDateRef.current.value,
    // };
    // const movie = titleRef.current.value
    // console.log(movie)
    // props.addSearchMovie(movieName)

    // props.onAddMovie(movieName);
  }

  const nameChangeHandler = (e) => {
    // setmovieName(e.target.value)
    if(e.target.value == ""){
        setIsEmpty(true);
        return
    }else{
        props.addSearchMovie(e.target.value)
        setIsEmpty(false)
    }

    
  }
  const touchedHandler = () => {
      setIsTouched(true)
  }

  let showUI = isEmpty && isTouched;

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Search Movie Name</label>
        <input onBlur={touchedHandler} onChange={nameChangeHandler} type='text' id='title' />
        {showUI && <p>Please Enter the Movie Name</p>}
      </div>
      {/* <div className={classes.control}>
        <label htmlFor='opening-text'>Opening Text</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef}></textarea>
      </div>
      <div className={classes.control}>
        <label htmlFor='date'>Release Date</label>
        <input type='text' id='date' ref={releaseDateRef} />
      </div> */}
      <button className={classes.btn} disabled={isEmpty} onClick={props.searchMovies}>Search Movie</button>
    </form>
  );
}

export default AddMovie;
