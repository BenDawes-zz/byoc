import * as React from 'react';
 
import { Locations, updateLocation } from '../../api/locations';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ILocationProperties, ILocationMeteor, ILocationBase, InputEventTarget } from '../../api/model';

export interface ILocationListEntryProps {
  location: ILocationMeteor;
}

export interface ILocationListEntryState {
  mode: string;
  location: ILocationBase;
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
      location: Object.assign({},this.props.location) as ILocationBase,
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


  private handleSubmit(event: React.FormEvent<HTMLElement>) {
    event.preventDefault();
    updateLocation(this.props.location._id, this.state.location)
  }

  private handleChange(key: string){
    return (event: React.FormEvent<HTMLInputElement>) => {
      if(key in Object.keys(this.state.location)) {
        this.setState((oldState) => {
          const newState = Object.assign({},oldState);
          newState.location[key].value = event.target
          return newState;
        })
      } else {
        this.setState((oldState,curProps) => {
          const newState = Object.assign({},oldState);
          switch(key) {
            case 'accepts_own_containers':
              if(newState.location.properties.accepts_own_containers) {
                newState.location.properties.accepts_own_containers.value = (event.currentTarget as InputEventTarget).value === 'on';
              } else {
                newState.location.properties.accepts_own_containers = { value: (event.currentTarget as InputEventTarget).value === 'on', upvotes: 0, downvotes: 0}
              }
              break;
            case 'location_latitude':
              newState.location.location.lat = parseFloat((event.currentTarget as InputEventTarget).value);
              break;
            case 'location_longitude':
              newState.location.location.lng = parseFloat((event.currentTarget as InputEventTarget).value);
              break;
          }
          return newState
        });
      }
    }
  }

  private deleteLocation(_id) {
    Meteor.call('locations.delete',_id);
  }

  public render() {
  	const readOnly =
  		<div className="location-data">
  			<p>{this.state.location.name}</p>
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
    const { name, location, properties, description } = this.state.location;
  	const editMode = (
      <form className="edit-location">
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Location name..."
          onChange={this.handleChange("name")}
        />
        <input
          type="text"
          name="latitude"
          value={location.lat}
          placeholder="Latitude..."
          onChange={this.handleChange("location_latitude")}
        />
        <input
          type="text"
          name="longitude"
          value={location.lng}
          placeholder="Longitude..."
          onChange={this.handleChange("location_longitude")}
        />
        <input
          type="checkbox"
          name="accepts_own_containers"
          value={(properties.accepts_own_containers && properties.accepts_own_containers.value) ? "on" : "off"}
          onChange={this.handleChange("accepts_own_containers")}
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