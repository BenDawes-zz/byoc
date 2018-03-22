import * as React from 'react';
import { Locations, IPoint, ILocationProperties, insertLocation } from '../../api/locations';
import { Meteor } from 'meteor/meteor';
import { Map, MapMarker } from './Map';
import { ClickEventValue } from 'google-map-react';

export interface IAddLocationFormProps {
  center: IPoint,
  zoom: number,
}

export interface IAddLocationFormState {
  name: string,
  latitude: number | undefined,
  longitude: number | undefined,
  accepts_own_containers: string,
}

export default class AddLocationForm extends React.Component<IAddLocationFormProps,IAddLocationFormState> {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      latitude: undefined,
      longitude: undefined,
      accepts_own_containers: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMapClick = this.handleMapClick.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    const { name, latitude, longitude, accepts_own_containers } = this.state;

    const does_accept_own_containers = accepts_own_containers === "on";

    const properties: ILocationProperties = {
      accepts_own_containers: {
        value: does_accept_own_containers,
      }
    }

    let location = {lat: latitude || 0, lng: longitude || 0};

    insertLocation({name,location,properties});
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleMapClick(event: ClickEventValue) {
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
            onChange={this.handleChange}
          /> Accepts Own Containers
          <div className="input-map map"
              style={{width:"800px",height:"400px"}}>
            <Map
              center={this.props.center}
              zoom={this.props.zoom}
              onClick={this.handleMapClick}
            >
              {this.state.latitude !== undefined && 
              <MapMarker
                lat={this.state.latitude || 0}
                lng={this.state.longitude || 0}
              />}
            </Map>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
  
}
