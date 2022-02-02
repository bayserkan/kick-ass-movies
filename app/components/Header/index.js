import React, { useEffect, useState } from 'react';
import User from 'components/User';
import Logo from '../../images/logo.png';
import Modal from 'antd/lib/modal';
import MovieDetails from 'components/MovieDetails';
import Loading from '../../images/loading.gif';
import './Header.css';
import axios from 'axios';
import _ from 'lodash';

function Header(props) {

  const [searchVal, setSearchVal] = useState('');
  const [template, setTemplate] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [movieId, setMovieId] = useState(null);
  const [movieModal, setMovieModal] = useState(false);
  const [watchList, setWatchList] = useState([]);
  const [watchListLoading, setWatchListLoading] = useState(false);
  const [watchListModal, setWatchListModal] = useState(false);
  const [watchListContent, setWatchListContent] = useState(null);

  useEffect(() => {
    if (props.user && props.sessionId) {
      getWatchList();
    }
  }, [props.user, props.sessionId]);

  useEffect(() => {
    if (searchVal.length > 0) {
      axios.get('3/search/movie?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&language=en-US&query=' + searchVal + '&page=1&include_adult=false')
        .then((response) => {
          let list = <li>-</li>;
          if (!_.isEmpty(response.data.results)) {
            list =
              response.data.results.map(item => {
                const baseUrl = 'https://image.tmdb.org/t/p/w500/';
                return (
                  <li key={item.id}>
                    <a onClick={() => {
                      setMovieId(item.id);
                      setMovieModal(true);
                    }}></a>
                    <img src={baseUrl + item.poster_path} />
                    {item.title}
                  </li>
                )
              })
          }
          const template =
            <ul className="results">
              {list}
            </ul>;
          setTemplate(template);
        })
        .catch((error) => {
          console.log(error, 'error');
        })
      setShowResult(true);
    }
  }, [searchVal]);

  useEffect(() => {
    if (!_.isEmpty(watchList)) {
      let list;
      if (!_.isEmpty(watchList)) {
        list =
          watchList.map((item, i) => {
            const baseUrl = 'https://image.tmdb.org/t/p/w500/';
            return (
              <tr key={'movie_' + item.id}>
                <td>{i + 1}</td>
                <td><img src={baseUrl + item.poster_path} /></td>
                <td>{item.title}</td>
                <td><a onClick={() => {
                  removeWatchList(item.id);
                }}>Remove</a></td>
              </tr>
            )
          })
      } else {
        list =
          <tr>
            <td colSpan="4">No movie found. Please add a movie...</td>
          </tr>
      }
      const template =
        <table className="watchListTable">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      setWatchListLoading(false);
      setWatchListContent(template);
    }
  }, [watchList]);

  const getWatchList = () => {
    setWatchListLoading(true);
    axios.get('3/account/' + props.user.id + '/watchlist/movies?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId + '&language=en-US&sort_by=created_at.asc&page=1')
      .then((response) => {
        setWatchList(response.data.results);
      })
      .catch(err => {
        setWatchListLoading(false);
        console.log(err, 'error');
      })
  }

  const removeWatchList = (id) => {
    const postData = {
      media_type: "movie",
      media_id: id,
      watchlist: false
    }
    axios.post('3/account/' + props.user.id + '/watchlist?api_key=932e87f6a3b4d6fa7a97cc56d50c88b7&session_id=' + props.sessionId, postData)
      .then(() => {
        getWatchList();
      })
      .catch(error => {
        console.log(error, 'error');
      })
  }

  return (
    <div className="container-fluid header">
      <div className="container">
        <div className="flexContainer">
          <img className="logo" src={Logo} />
          <div className="headerRight flexContainer">
            <div className="searchMovie">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => {
                  setSearchVal(e.target.value);
                }}
                onBlur={() => {
                  setSearchVal('');
                  setTimeout(() => {
                    setShowResult(false);
                  }, 200);
                }}
                placeholder="Type Movie Name" />
              {showResult ? template : null}
            </div>
            <ul className="menu">
              <li onClick={() => {
                setWatchListModal(true);
                getWatchList();
              }}>Watch List</li>
            </ul>
            <User />
          </div>
        </div>
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

        <Modal
          title=""
          centered
          footer={false}
          visible={watchListModal}
          onOk={() => setWatchListModal(false)}
          onCancel={() => {
            setWatchListModal(false);
            props.getMoviesData(1);
          }}
          width={980}
        >
          {watchListLoading ?
            <div className="loadingWrapper">
              <img src={Loading} />
            </div> : watchListContent}
        </Modal>
      </div>
    </div>
  )
}

export default Header;