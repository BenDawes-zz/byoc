import GoogleMap, { ClickEventValue } from 'google-map-react';
import * as React from 'react';
import { IPoint } from '../../api/locations';

export interface IMapProps {
    center: IPoint,
    zoom: number,
    onClick?(c: ClickEventValue): void,
}

export class Map extends React.Component<IMapProps,{}> {
    render() {
        console.log(this);
        return (
        <div style={{width:"800px",height:"400px"}}>
            <GoogleMap
                bootstrapURLKeys={{key: "AIzaSyBGqMRDzOc-WOa4AdQRCegZM9o-5baZfZA"}}
                center={this.props.center}
                zoom={this.props.zoom}
                onClick={this.props.onClick}
                {...this.props}
            >
                {this.props.children}
            </GoogleMap>
        </div>
        )
    }
}

export interface IMapMarkerProps {
    lat: number | undefined,
    lng: number | undefined,
}

export class MapMarker extends React.Component<IMapMarkerProps,{}> {
    render() {
        return (
            <div> HELLO! </div>
        )
    }
}