import * as React from 'react';
import { Locations } from '../../api/locations';
import { withTracker } from '../../js-imports/react-meteor-data';
import { Map, MapMarker } from './Map';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import LocationListEntry from './LocationListEntry.js';
import AddLocationForm from './AddLocationForm'
import LocationView from './LocationView';
import AppHeader from './AppHeader';
import HomePage from './HomePage';
import { ILocationMeteor } from '../../api/model';

export interface IAppMeteorProps {
  locations: ILocationMeteor[],
  currentUser: Meteor.User,
}
 
export interface IAppExternalProps {
}

export type IAppProps = IAppMeteorProps & IAppExternalProps;

// App component - represents the whole app
 class App extends React.Component<IAppProps,{}> {

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
                <AddLocationForm zoom={7} center={{lat: 55.9533,lng: -3.1883}}/>
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
                <Map zoom={7} center={{lat:55.9533,lng:-3.1883}}>
                  {this.props.locations.map((location) => {
                    return <MapMarker
                      key={location._id}
                      lat={location.location.lat}
                      lng={location.location.lng}
                      popupDetails={<div>{location.name}</div>}
                      />
                  })}
                </Map>
              </ul>
            </div>
          }>
          </Route>
        <Route exact path="/location/:_id" render={({match}) => <LocationView id={match.params._id}/>}/>
        </div>
      </Router>
    );
  }
  
}

export default withTracker<IAppExternalProps, IAppProps>((props) => {
  Meteor.subscribe('locations');
  return {
    ...props,
    locations: Locations.find({}).fetch() as ILocationMeteor[],
    currentUser: Meteor.user(),
  };
})(App);