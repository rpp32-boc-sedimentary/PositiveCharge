import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapDestination from './mapDestination.jsx';
import Routing from './routing.jsx';
import Directions from './directions.jsx';
import axios from 'axios';
import L from 'leaflet';


class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 39.595244,
            long: -104.7049212,
            destinations: this.props.props,
            isDriving: false,
            directions: [],
            //currDestination: {lat: 32.881146, long: -117.237586}
            currDestination: {}
        }
        this.getDirections = this.getDirections.bind(this);
        console.log('passed in props', this.props);
    }

    getDirections(event) {
        //console.log(event);
        this.setState({
            currDestination: {lat: event.latlng.lat, long: event.latlng.lng}
        }, () => {
            axios.get('/map', {params: {
                startingLat: this.state.lat,
                startingLong: this.state.long,
                endingLat: this.state.currDestination.lat,
                endingLong: this.state.currDestination.long
            }})
            .then(response => {
                var directions = [];
                response.data.instructions.forEach((direction) => {
                    directions.push(direction.message);
                })
                return this.setState({
                    directions: directions
                })
            })
            .catch(err => {
                console.log("Failed to reach /map route", err);
            })
        })
    }


    render() {
        console.log(this.state.currDestination);
        return(
            <div>
                <MapContainer center={[this.state.lat, this.state.long]} zoom={20} id="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[this.state.lat, this.state.long]} icon={L.icon({iconUrl: './img/personMarker.png', iconSize: [90, 90]})}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapDestination 
                    destinations = {this.state.destinations}
                    getDirections = {this.getDirections}
                ></MapDestination>
                {Object.keys(this.state.currDestination).length === 0 
                    ? <div></div>
                    : <Routing
                            startingLat={this.state.lat}
                            startingLong={this.state.long}
                            endingLat={this.state.currDestination.lat}
                            endingLong={this.state.currDestination.long}
                            isDriving = {this.state.isDriving}
                    ></Routing>
                }
            </MapContainer>
            <Directions directions={this.state.directions}></Directions>
            </div>
            
        )
    }
}

export default Map;