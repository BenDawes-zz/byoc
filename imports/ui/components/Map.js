import GoogleMap from 'google-map-react';
import React, { Component } from 'react';

export class Map extends Component {
    render() {
        console.log(this);
        return (
        <div style={{width:"800px",height:"400px"}}>
            <GoogleMap
                bootstrapURLKeys={{key: "AIzaSyBGqMRDzOc-WOa4AdQRCegZM9o-5baZfZA"}}
                center={this.props.center}
                zoom={this.props.zoom}
                {...this.props}
            >
                {this.props.children}
            </GoogleMap>
        </div>
        )
    }
}

export class MapMarker extends Component {
    render() {
        return (
            <div> HELLO! </div>
        )
    }
}