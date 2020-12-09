import React, { Component } from 'react';
import './App.css';
import { Constants } from './_commonData/Constants';
import Routes from './_commonData/Routes';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    const allMovies = localStorage.getItem('movies');
    if (allMovies === null || allMovies === undefined) {
      localStorage.setItem('movies', JSON.stringify(Constants.Movies[0]));
    }

    return (
      <div className="App">
        <header className="">
          <Routes />
        </header>
      </div>
    );
  }
}

export default App;
