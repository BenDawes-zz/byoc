import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';
import { Link, withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import '../styles/AppHeader';

// App header with link home and profile/other links
class AppHeader extends Component {

	constructor(props) {
    super(props);
	}

  render() {
    return (
      <div className="header">
        <div className="logo">
          <Link to={"/"}>
            <span>BYOC</span>
          </Link>
        </div>
        <div className="links">
          <Link to={"/locations"}>Locations</Link>
          {this.props.currentUser && <Link to={"/my-profile"}>Profile</Link>}
          <AccountsUIWrapper/>
        </div>
      </div>
    )
  }
}

export default withRouter(withTracker((props) => {
  let sub = Meteor.subscribe('users');
  return {
    currentUser: Meteor.user(),
  }
})(AppHeader));