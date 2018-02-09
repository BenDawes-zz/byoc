import React, { Component } from 'react';
import { Locations } from '../../api/locations';
import { Meteor } from 'meteor/meteor';

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
            type="text"
            name="latitude"
            value={this.state.latitude}
            placeholder="Latitude..."
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="longitude"
            value={this.state.longitude}
            placeholder="Longitude..."
            onChange={this.handleChange}
          />
          <input
            type="checkbox"
            name="accepts_own_containers"
            value={this.state.accepts_own_containers}
            placeholder="Longitude..."
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  
}
