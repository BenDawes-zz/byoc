import React, { Component } from 'react';
import { Locations } from '../../api/locations';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Location from './Location.js';
import AddLocationForm from './AddLocationForm'
 
// App component - represents the whole app
 class App extends Component {

  renderLocations() {
    return this.props.locations.map((location) => (
      <Location key={location._id} location={location} />
    ));
  }

  render() {
    return (
      <Router>
        <div className="container">
          <AccountsUIWrapper/>
          <header>
            <h1>Locations</h1>
          </header>

          { this.props.currentUser &&
            <Link to={"/new"}>Add Location</Link>
          }
          <Link to={"/locations"}> Locations</Link>
          
          <Route path="/new" 
            render={props =>
              this.props.currentUser ? (
                <AddLocationForm/>
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: { from: props.location }
                  }}
                />
              )
            }
          />
          <Route exact path="/locations" render={props =>
            <ul>
              {this.renderLocations()}
            </ul>
          }>
          </Route>
        </div>
      </Router>
    );
  }
  
}

export default withTracker(() => {
  Meteor.subscribe('locations');
  return {
    locations: Locations.find({}).fetch(),
    currentUser: Meteor.user(),
  };
})(App);