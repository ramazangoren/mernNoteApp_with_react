import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [newReview, setNewReview] = useState("")

  const nameHandler = (e) => {
    setMovieName(e.target.value);
  };

  const reviewHandler = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    })
    

      setMovieList([
        ...movieReviewList,
        { movieName: movieName, movieReview: review },
      ]);
  };

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`)
  }
  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    })
    setNewReview("");
  }


  return (
    <div className="App">
      <h1>crud application</h1>
      <div className="form">
        <label>movie name:</label>
        <input
          type="text"
          name="movieName"
          placeholder="movie name"
          onChange={nameHandler}
        />
        <label>review:</label>
        <input
          type="text"
          name="review"
          placeholder="review"
          onChange={reviewHandler}
        />
        <button onClick={submitReview}>submit</button>

        {movieReviewList.map((val) => {
          return (
            <div className="card">
              <h1>{val.movieName}</h1>
              <p>{val.movieReview}</p>

              <button onClick={()=>{deleteReview(val.movieName)}}>delete</button>

              <input type='text' id='updateInput' onChange={(e)=>{
                setNewReview(e.target.value)
              }}/>
              <button onClick={()=>{updateReview(val.movieName)}}>update</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
