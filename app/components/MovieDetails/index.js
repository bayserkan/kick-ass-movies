import React, { useState, useEffect } from 'react';
import Loading from '../../images/loading.gif';
import axios from 'axios';

function MovieDetails(props) {

  const [movieContent, setMovieContent] = useState(null);
  const [movieLoading, setMovieLoading] = useState(false);

  useEffect(() => {
    getMovieDetails(props.id);
  }, [props.id]);

  const getMovieDetails = (id) => {
    setMovieLoading(true);
    axios.get('3/movie/' + id + '?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&language=en-US')
      .then(response => {
        const item = response.data;
        const baseUrl = 'https://image.tmdb.org/t/p/w500/';
        const template =
          <div className="movieDetails">
            <img src={baseUrl + item.poster_path} />
            <div className="textWrapper">
              <h4>{item.title} <span>{item.vote_average}</span></h4>
              <p>{item.overview}</p>
              <p className="subInfo">
                <span>Duration: {item.runtime} min.</span>
                <span>Release Date: {item.release_date}</span>
              </p>
              <a className="website" href={item.homepage} target="_blank">
                Official Website
              </a>
            </div>
          </div>;
        setMovieContent(template);
        setMovieLoading(false);
      })
      .catch(err => {
        setMovieLoading(false);
        console.log(err, 'error');
      })
  }

  return (
    <div>
      {movieLoading ?
        <div className="loadingWrapper">
          <img src={Loading} />
        </div>
        : movieContent}
    </div>
  );
}

export default MovieDetails;
