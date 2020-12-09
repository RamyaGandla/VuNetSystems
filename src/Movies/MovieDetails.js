import React, { Component } from "react";
import * as reactbootstrap from "react-bootstrap";
import MovieImage from '../Movie.jpeg';
import './movie.css';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: {},
    };
  }

  componentDidMount() {
    let moviesList = localStorage.getItem('movies') ? JSON.parse(localStorage.getItem('movies')) : {}
    var currentUrl = window.location.pathname.split('/');
    let movieId = currentUrl[2];
    let currentMovie = Object.values(moviesList).filter(movie => parseInt(movie.id) === parseInt(movieId))
    if (Object.keys(currentMovie).length > 0) {
      let editMovie = currentMovie[0]
      this.setState({
        movieData: editMovie,
      });
    }
  }

  render () {
    const { movieData } = this.state
    let movieReleaseDate = movieData.year
    let date1 = new Date(movieReleaseDate);
    let dateOne = date1.getFullYear()

    return (
      <reactbootstrap.Container className="movieClass">
        <div style={{ color: '#EC661C', fontSize: '20px'}} >
          <reactbootstrap.Button style={{ marginRight: "180px", float: 'right',backgroundColor: '#EC661C',borderColor: "black", marginBottom: '25px', marginTop: '25px' }} type="button" onClick={e => (window.location.href = '/managemovies')}>
              {'Go back'}
          </reactbootstrap.Button>
        </div>
        <div style={{ color: "#EC661C", fontSize: "20px" , marginLeft: '180px'}} class="row">
          <span>
            <h4>{"Movie details"}</h4>
          </span>
        </div>
        <div className="movieClass">
        <reactbootstrap.Form>
          <div style={{ 'width': '100%' }}>
            <div style={{'width': '70%','float': 'right' }}>
              <div style={{'width': '60%','float': 'left' , marginTop: '30px'}}>
                <img src={MovieImage} className="movie-image" alt="logo" />
              </div>
              <div style={{'width': '40%','float': 'left' }}>
                <h2>{movieData.name}</h2>
                <p>{"This is " + movieData.name + " movie description"}</p>
                <div>
                  <p style={{'width': '15%','float': 'left' }}>
                    {"Original release \n"}
                    {dateOne}
                  </p>
                  <p style={{'width': '15%','float': 'right' }}>
                    {"Rating \n"}
                    {movieData.rating}
                  </p>
                  <p style={{'width': '15%' }}>
                    {"Duration \n"}
                    {movieData.duration + ' Hours'}
                  </p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </reactbootstrap.Form>
        </div>
      </reactbootstrap.Container>
    )
  }
}

export default MovieDetails
