import * as React from 'react';
 
import { ILocation, ILocationMeteor } from '../../api/model';
import { Locations } from '../../api/locations';
import { Map, MapMarker } from './Map';
import { withRouter } from 'react-router-dom';
import { withTracker } from '../../js-imports/react-meteor-data';
import { PropTypes } from 'prop-types';
import { TAPi18n } from '../../js-imports/tap:i18n';

const translations = (s) => TAPi18n.__(`LocationView.${s}`);

export interface ILocationViewMeteorProps {
  ready: boolean;
  location?: ILocationMeteor;
}

export interface ILocationViewExternalProps {
  id: string;
}

export type ILocationViewProps = ILocationViewMeteorProps & ILocationViewExternalProps;


// Location profile component - represents a single location
class LocationView extends React.Component<ILocationViewProps,{}> {

	constructor(props) {
    super(props);
	}

  render() {
    if(this.props.ready && this.props.location) {
      const location = this.props.location;
      const { name, properties, description } = location;
      const { lat, lng } = location.location;
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
          <h2>Description</h2>
          <div className="description">
            {description}
          </div>
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

export default withTracker<ILocationViewExternalProps,ILocationViewProps>((props) => {
  let sub = Meteor.subscribe('locations');
  if(props.id === undefined || props.id === null) {
    return {
      ...props,
      ready: false,
    }
  }
  return {
    ...props,
    ready: sub.ready(),
    location: Locations.find({_id: props.id}).fetch()[0] as ILocationMeteor,
  }
})(LocationView);