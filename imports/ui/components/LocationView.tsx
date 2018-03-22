import * as React from 'react';
 
import { ILocation } from '../../api/model';
import { Locations } from '../../api/locations';
import { Map, MapMarker } from './Map';
import { withRouter } from 'react-router-dom';
import { withTracker } from '../../js-imports/react-meteor-data';
import { PropTypes } from 'prop-types';
import { TAPi18n } from '../../js-imports/tap:i18n';

const translations = (s) => TAPi18n.__(`LocationView.${s}`);

export interface ILocationViewProps {
  ready: boolean;
  location: ILocation;
}

// Location profile component - represents a single location
class LocationView extends React.Component<ILocationViewProps,{}> {

	constructor(props) {
    super(props);
	}

  render() {
    if(this.props.ready) {
      const location = this.props.location;
      const { name, latitude, longitude, properties } = {
        name: location.name,
        latitude: location.location.lat,
        longitude: location.location.lng,
        properties: location.properties,
      }
      const propertiesList: React.ReactElement<{}>[] = []
      for(let k in properties) {
        if(properties[k].value) {
          propertiesList.push(
            <li key={k} className="property">
              <span className="key">{translations(k)}</span><span className="value">{properties[k].value !== true && translations(properties[k].value)}</span>
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

export default withTracker((props) => {
  let sub = Meteor.subscribe('locations');
  if(props.id === undefined || props.id === null) {
    return {
      ready: false,
    }
  }
  return {
    ready: sub.ready(),
    location: Locations.find({_id: props.id}).fetch()[0]
  }
})(LocationView);