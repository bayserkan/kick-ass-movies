import React, { useState, useEffect } from 'react';
import Pagination from 'antd/lib/pagination';
import Loading from '../../images/loading.gif';
import Modal from 'antd/lib/modal';
import MovieDetails from 'components/MovieDetails';
import './Movies.css';
import _ from 'lodash';
import axios from 'axios';

function Movies(props) {
  const mData = props.data;
  const [movieData, setMovieData] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [clickedItem, setClickedItem] = useState(null);
  const [paginate, setPaginate] = useState({
    current: 1,
    total: 1,
    per_page: 20
  });
  const [movieModal, setMovieModal] = useState(false);
  const [movieId, setMovieId] = useState(null);

  useEffect(() => {
    const user = props.user;
    if (!_.isEmpty(user)) {
      getFavourites();
      getWatchList();
    }
  }, [props.user]);

  useEffect(() => {
    let movies;
    const favouriteFalseıcon =
      <svg height="40px" version="1.1" viewBox="0 0 48 48" width="40px"><title /><desc /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g id="Artboard-Copy" transform="translate(-287.000000, -129.000000)"><polygon fill="none" stroke="#fff" strokeWidth="2px" id="star" points="311 135 315.123 146.725 327 147.223 317.67 154.967 320.889 167 311 160.063 301.111 167 304.33 154.967 295 147.223 306.879 146.725" /><g id="slices" transform="translate(47.000000, 9.000000)" /></g></g></svg>;
    const favouriteTrueIcon =
      <svg height="40px" version="1.1" viewBox="0 0 48 48" width="40px"><title /><desc /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g id="Artboard-Copy" transform="translate(-287.000000, -129.000000)"><polygon fill="#fad00c" stroke="#fad00c" strokeWidth="2px" id="star" points="311 135 315.123 146.725 327 147.223 317.67 154.967 320.889 167 311 160.063 301.111 167 304.33 154.967 295 147.223 306.879 146.725" /><g id="slices" transform="translate(47.000000, 9.000000)" /></g></g></svg>;

    if (!_.isEmpty(mData)) {
      const baseUrl = 'https://image.tmdb.org/t/p/w500/';
      const movieListItems =
        mData.results.map(item => {
          let template;
          if (clickedItem === item.id) {
            template =
              <li key={'loadingList'}>
                <div className="loadingWrapper">
                  <img src={Loading} />
                </div>
              </li>
          } else {
            template =
              <li key={'movie_' + item.id}>
                <div className="top" onClick={() => {
                  addFav(item.id, !_.includes(favourites, item.id));
                  setClickedItem(item.id);
                }} >
                  {_.includes(favourites, item.id) ? favouriteTrueIcon : favouriteFalseıcon}
                  <span className="tooltip">{_.includes(favourites, item.id) ? 'Remove from favourites' : 'Add to favourites'}</span>
                </div>
                <span className="votePoint">{item.vote_average}</span>
                <img src={baseUrl + item.poster_path} />
                <span className="mTitle">{item.title}</span>
                <div className="overlay">
                  <a onClick={() => {
                    addWatchList(item.id, !_.includes(watchList, item.id));
                    setClickedItem(item.id);
                  }}>{_.includes(watchList, item.id) ? 'Remove from WatchList' : 'Add to WatchList'}</a>
                  <a onClick={() => {
                    setMovieId(item.id);
                    setMovieModal(true);
                  }}>Details</a>
                </div>
              </li>
          }
          return template;
        });
      movies =
        <ul className="movieList">
          {movieListItems}
        </ul>
      setPaginate({
        current: mData.page,
        total: 5000,
        per_page: 20
      })
    }
    setMovieData(movies);
  }, [mData, favourites, clickedItem, watchList]);

  const addFav = (id, status) => {
    const postData = {
      media_type: "movie",
      media_id: id,
      favorite: status
    }
    axios.post('3/account/' + props.user.id + '/favorite?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId, postData)
      .then(() => {
        setClickedItem(null);
        props.getMoviesData(paginate.current);
      })
      .catch(error => {
        console.log(error, 'error');
      })
  }

  const addWatchList = (id, status) => {
    const postData = {
      media_type: "movie",
      media_id: id,
      watchlist: status
    }
    axios.post('3/account/' + props.user.id + '/watchlist?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId, postData)
      .then(() => {
        setClickedItem(null);
        props.getMoviesData(paginate.current);
      })
      .catch(error => {
        console.log(error, 'error');
      })
  }

  const getFavourites = () => {
    axios.get('3/account/' + props.user.id + '/favorite/movies?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId + '&language=en-US&sort_by=created_at.asc&page=1')
      .then((response) => {
        const favArr = [];
        if (!_.isEmpty(response.data.results)) {
          response.data.results.forEach(item => {
            favArr.push(item.id);
          })
        }
        setFavourites(favArr);
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }

  const getWatchList = () => {
    axios.get('3/account/' + props.user.id + '/watchlist/movies?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId + '&language=en-US&sort_by=created_at.asc&page=1')
      .then((response) => {
        const watchListArr = [];
        if (!_.isEmpty(response.data.results)) {
          response.data.results.forEach(item => {
            watchListArr.push(item.id);
          })
        }
        setWatchList(watchListArr);
      })
      .catch(err => {
        console.log(err, 'error');
      })
  }


  return (
    <div className="container-fluid movies">
      <div className="container">
        {movieData}
        <Pagination
          onChange={page => {
            props.getMoviesData(page);
          }}
          defaultCurrent={1}
          current={paginate.current}
          total={paginate.total} />

        <Modal
          title=""
          centered
          footer={false}
          visible={movieModal}
          onOk={() => setMovieModal(false)}
          onCancel={() => setMovieModal(false)}
          width={980}
        >
          <MovieDetails id={movieId} />
        </Modal>
      </div>
    </div>
  );
}

export default Movies;