import * as React from 'react';
import LocationView from './LocationView';
import { TAPi18n } from '../../js-imports/tap:i18n';
import { Locations } from '../../api/locations';
import { withTracker } from '../../js-imports/react-meteor-data';
import { ILocationMeteor } from '../../api/model';

const translations = (s) => TAPi18n.__(`HomePage.${s}`);

export interface IHomePageExternalProps {
  id: string | null;
}

export interface IHomePageMeteorProps {
}

export type IHomePageProps = IHomePageMeteorProps & IHomePageExternalProps;

class HomePage extends React.Component<IHomePageProps,{}> {

  public render() {
    return (
      <div className="home-page">
        <h1>{translations("main_text_header")}</h1>
        <p>{translations("main_text")}</p>
        {this.props.id && <LocationView id={this.props.id}/>}
      </div>
    )
  }

}

export default withTracker<IHomePageExternalProps,IHomePageProps>((props) => {
  let sub = Meteor.subscribe('locations');
  if(props.id === undefined || props.id === null) {
    let all = Locations.find({}).fetch() as ILocationMeteor[];
    return {
      ...props,
      id: sub.ready() && all.length > 0 ? all[Math.floor(Math.random() * all.length)]._id : null
    }
  }
  return {
    ...props,
    id: props.id
  }
})(HomePage);