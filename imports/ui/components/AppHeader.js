import React, { Component } from 'react';
import AccountsUIWrapper from './AccountsUIWrapper';
import { Link, withRouter } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

// App header with link home and profile/other links
class AppHeader extends Component {

	constructor(props) {
    super(props);
	}

  render() {
    return (
      <div className="header">
        <Link to={"/"}>
          <div className="logo">
            <span>BYOC</span>
          </div>
        </Link>
        <div className="links">
          <ul>
            <li><Link to={"/locations"}>Locations</Link></li>
            {this.props.currentUser && <li><Link to={"/my-profile"}>Profile</Link></li>}
            <AccountsUIWrapper/>
          </ul>
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