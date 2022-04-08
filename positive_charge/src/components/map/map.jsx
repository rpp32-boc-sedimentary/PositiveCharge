import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapDestination from './mapDestination.jsx';
import Routing from './routing.jsx';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 32.877063,
            long: -117.234024,
            destNames: ['Center Hall', 'PC', 'Geisel'],
            destinations: [[32.878071, -117.236941], [32.879749, -117.236921], [32.881146, -117.237586]],
            isDriving: false
        }
    }
    render() {
        return(
            <MapContainer center={[this.state.lat, this.state.long]} zoom={20} id="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.state.lat, this.state.long]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapDestination destinations = {this.state.destinations}></MapDestination>
                {/* <Routing
                    startingLat={this.state.lat}
                    startingLong={this.state.long}
                    endingLat={this.state.destinations[1][0]}
                    endingLong={this.state.destinations[1][1]}
                    isDriving = {this.state.isDriving}
                ></Routing> */}
            </MapContainer>
        )
    }
}

export default Map;