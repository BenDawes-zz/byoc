import React, { Component } from 'react';
import { Locations } from '../../api/locations';
import { Meteor } from 'meteor/meteor';
import { Map, MapMarker } from './Map';

import Location from './Location.js';


export default class AddLocationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      latitude: "",
      longitude: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    let { name, latitude, longitude, accepts_own_containers } = this.state;

    accepts_own_containers = accepts_own_containers === "on";

    let location = {latitude: parseFloat(latitude), longitude: parseFloat(longitude)};

    Meteor.call('locations.insert',name,location,accepts_own_containers);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleMapClick(event) {
    this.setState({latitude: event.lat, longitude: event.lng});
  }

  render() {
    return (
      <div className="add-location form container">
        <form className="new-location" onSubmit={this.handleSubmit} >
          <input
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Location name..."
            onChange={this.handleChange}
          />
          <input
            type="checkbox"
            name="accepts_own_containers"
            value={this.state.accepts_own_containers}
            placeholder="Longitude..."
            onChange={this.handleChange}
          />
          <div className="input-map map"
              style={{width:"800px",height:"400px"}}>
            <Map
              center={this.props.center}
              zoom={this.props.zoom}
              onClick={this.handleMapClick}
            >
              {this.state.latitude !== "" && 
              <MapMarker
                lat={this.state.latitude}
                lng={this.state.longitude}
              />}
            </Map>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  
}
