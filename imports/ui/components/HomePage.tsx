import * as React from 'react';
import LocationView from './LocationView';
import { TAPi18n } from '../../js-imports/tap:i18n';
import { Locations, ILocation } from '../../api/locations';
import { withTracker } from '../../js-imports/react-meteor-data';

const translations = (s) => TAPi18n.__(`HomePage.${s}`);

export interface IHomePageProps {
  id: string;
}

class HomePage extends React.Component<IHomePageProps,{}> {

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
    let all = Locations.find({}).fetch() as ILocation[];
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