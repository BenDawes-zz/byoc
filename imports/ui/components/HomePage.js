import React, { Component } from 'react';
import LocationView from './LocationView';
import { TAPi18n } from 'meteor/tap:i18n';
import { Locations } from '../../api/locations';
import { withTracker } from 'meteor/react-meteor-data';

const translations = (s) => TAPi18n.__(`HomePage.${s}`);


class HomePage extends Component {

  render() {
    return (
      <div className="home-page">
        <h1>{translations("main_text_header")}</h1>
        <p>{translations("main_text")}</p>
        <LocationView id={this.props.id}/>
      </div>
    )
  }

}

export default withTracker((props) => {
  let sub = Meteor.subscribe('locations');
  if(props.id === undefined || props.id === null) {
    let all = Locations.find({}).fetch();
    return {
      ...props,
      id: sub.ready() ? all[Math.floor(Math.random() * all.length)]._id : null
    }
  }
  return {
    ...props,
    id: props.id
  }
})(HomePage);