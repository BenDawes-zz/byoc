import GoogleMap, { ClickEventValue, ChildComponentProps } from 'google-map-react';
import * as React from 'react';
import { IPoint } from '../../api/locations';
import * as feather from 'feather-icons';
import '../styles/Map';

export interface IMapProps {
    center: IPoint,
    zoom: number,
    onClick?(c: ClickEventValue): void,
}

export class Map extends React.Component<IMapProps,{}> {

    constructor(props: IMapProps) {
        super(props);
    }

    render() {
        return (
        <div style={{width:"800px",height:"400px"}}>
            <GoogleMap
                bootstrapURLKeys={{
                    key: "AIzaSyBGqMRDzOc-WOa4AdQRCegZM9o-5baZfZA",
                    v: '3.30'
                }}
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

export interface IMapMarkerProps extends ChildComponentProps {
    popupDetails?: JSX.Element;
    onClick?(key: string): void;
}

export interface IMapMarkerState {
    open: boolean;
}

export class MapMarker extends React.Component<IMapMarkerProps,IMapMarkerState> {

    constructor(props: IMapMarkerProps) {
        super(props);
        this.state = {
            open: false,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    private handleClick(e) {
        console.log("Clicked");
        this.setState({ open: !this.state.open})
    }

    render() {
        feather.replace();
        return (
            <div className="map-marker-container" onClick={this.handleClick}>
                {this.state.open && 
                <div className="map-marker-details-container">
                    <div className="map-marker-details">
                        {this.props.popupDetails}
                    </div>
                </div>
                }
                <div className="icon-container">
                    <i className="map-pin" data-feather="map-pin"/>
                </div>
            </div>
        )
    }
}