import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ManageMovies from '../Movies/ManageMovies';
import AddMovie from '../Movies/AddMovie';
import MovieDetails from '../Movies/MovieDetails';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const NotFoundRedirect = () => <Redirect to='/managemovies' />

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/managemovies' component={ManageMovies} />
          <Route exact path='/addmovie' component={AddMovie} />
          <Route exact path='/moviedetails/:id' component={MovieDetails} />
          <Route component={NotFoundRedirect} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes
