import React, { Component } from 'react';
 
import { Locations } from '../../api/locations';
import { Map, MapMarker } from './Map';
import { withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

// Location profile component - represents a single location
class LocationView extends Component {

	constructor(props) {
    super(props);
	}

  render() {
    if(this.props.ready) {
      let location = this.props.location;
      let { name, latitude, longitude, accepts_own_containers } = {
        name: location.name,
        latitude: location.location.latitude,
        longitude: location.location.longitude,
        accepts_own_containers: location.accepts_own_containers,
      }
      let properties = {
        accepts_own_containers: {
          text: "Accepts Own Containers",
          value: accepts_own_containers
        }
      }
      let propertiesList = []
      for(let k in properties) {
        if(properties[k].value) {
          propertiesList.push(
            <li key={k} className="property">
              {properties[k].text}
            </li>
          )
        }
      }
      return (
        <div className="location profile">
          <h1>{name}</h1>
          <ul className="properties list">
            {propertiesList}
          </ul>
        </div>
      );
    }
    return (
      <div className="location profile">
        Loading...
      </div>
    )
  }
}

export default withRouter(withTracker((props) => {
  let sub = Meteor.subscribe('locations');
  return {
    ready: sub.ready(),
    location: Locations.find({_id: props.match.params._id}).fetch()[0]
  }
})(LocationView));