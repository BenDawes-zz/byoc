import React, { Component } from 'react';
import { Locations } from '../../api/locations';
import { withTracker } from 'meteor/react-meteor-data';
import { Map, MapMarker } from './Map';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import LocationListEntry from './LocationListEntry.js';
import AddLocationForm from './AddLocationForm'
import LocationView from './LocationView';
import AppHeader from './AppHeader';
import HomePage from './HomePage';
 
// App component - represents the whole app
 class App extends Component {

  renderLocations() {
    return this.props.locations.map((location) => (
      <LocationListEntry key={location._id} location={location} />
    ));
  }

  render() {
    return (
      <Router>
        <div className="container">
          <AppHeader/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/new" 
            render={props =>
              this.props.currentUser ? (
                <AddLocationForm zoom={7} center={[55.9533,-3.1883]}/>
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
            <div className="locations">
              {this.props.currentUser &&
                <Link to={"/new"}>Add Location</Link>}
              <ul>
                {this.renderLocations()}
                <Map zoom={7} center={[55.9533,-3.1883]}>
                  {this.props.locations.map((location) => {
                    return <MapMarker
                      key={location._id}
                      lat={location.location.latitude}
                      lng={location.location.longitude}
                      />
                  })}
                </Map>
              </ul>
            </div>
          }>
          </Route>
          <Route exact path="/location/:_id" component={LocationView}/>
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