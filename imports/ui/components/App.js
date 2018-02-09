import React, { Component } from 'react';
import { Locations } from '../../api/locations';
import { withTracker } from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper';

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
      <div className="container">
        <AccountsUIWrapper/>
        <header>
          <h1>Locations</h1>
        </header>

        { this.props.currentUser &&
           <AddLocationForm/>
         }
 
        <ul>
          {this.renderLocations()}
        </ul>
      </div>
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