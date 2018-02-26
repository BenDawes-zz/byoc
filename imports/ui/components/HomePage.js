import React, { Component } from 'react';
import { TAPi18n } from 'meteor/tap:i18n';

const translations = (s) => TAPi18n.__(`HomePage.${s}`);


export default class HomePage extends Component {
    render() {
      return (
        <div className="home-page">
          <h1>{translations("main_text_header")}</h1>
          <p>{translations("main_text")}</p>
        </div>
      )
    }
}