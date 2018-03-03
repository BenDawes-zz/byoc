import * as React from 'react';
 
import { Locations, ILocation, ILocationProperties, updateLocation } from '../../api/locations';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export interface ILocationListEntryProps {
  location: ILocation;
}

export interface ILocationListEntryState {
  mode: string;
  name: string;
  latitude: number;
  longitude: number;
  properties: ILocationProperties;
}

// Location component - represents a single location
export default class LocationListEntry extends React.Component<ILocationListEntryProps,ILocationListEntryState> {

	constructor(props) {
		super(props);
		this.toggleState = this.toggleState.bind(this);
		this.deleteLocation = this.deleteLocation.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			mode: "default",
			name: this.props.location.name,
			latitude: this.props.location.location.lat,
      longitude: this.props.location.location.lng,
			properties: this.props.location.properties,
		}
	}

  private toggleState(e) {
  	e.preventDefault();
  	let { mode } = this.state;
  	if(mode === "edit") {
  		this.handleSubmit(e);
  		this.setState({mode: "default"});
  		return;
  	} else if(mode === "default") {
  		this.setState({mode: "edit"})
  		return;
  	}  	
  }


  private handleSubmit(e) {
    e.preventDefault();

    const { name, latitude, longitude, properties } = this.state;


    const formattedProperties: ILocationProperties = {}

    const accepts_own_containers = properties.accepts_own_containers && properties.accepts_own_containers.value;
    if(accepts_own_containers !== undefined) {
      formattedProperties.accepts_own_containers = {value: accepts_own_containers};
    }

    const location = {lat: latitude, lng: longitude};

    updateLocation(this.props.location._id,name,location,formattedProperties)
  }

  private handleChange(event) {
    if(event.target.name in Object.keys(this.state)) {
      this.setState({[event.target.name]: event.target.value});
    } else {
      this.setState((oldState,curProps) => {
        const newState = Object.assign({},oldState);
        switch(event.target.name) {
          case 'accepts_own_containers':
            newState.properties.accepts_own_containers = {value: event.target.value === 'on'};
        }
        return newState
      });
    }
  }

  private deleteLocation(_id) {
    Meteor.call('locations.delete',_id);
  }

  public render() {
  	const readOnly =
  		<div className="location-data">
  			<p>{this.state.name}</p>
        <button className="delete location" onClick={(e) => this.deleteLocation(this.props.location._id)}>
          Delete
        </button>
        <button className={(this.state.mode === "default" ? "edit" : "save") + " location"} onClick={this.toggleState}>
          Edit
        </button>
        <Link to={`/location/${this.props.location._id}`}>
          View
        </Link>
      </div>
  	const editMode = (
      <form className="edit-location">
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
          value={(this.state.properties.accepts_own_containers && this.state.properties.accepts_own_containers.value) ? "on" : "off"}
          onChange={this.handleChange}
        />
        <button className={(this.state.mode === "default" ? "edit" : "save") + " location"} onClick={this.toggleState}>
          Save
        </button>
      </form>
    )
    return (
      <li>
      	<div className="location row">
      		{this.state.mode === "default" 
      			? readOnly
      			: editMode}
      	</div>
      </li>
    );
  }
}