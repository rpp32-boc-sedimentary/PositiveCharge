import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MapDestination from './mapDestination.jsx';
import Routing from './routing.jsx';
import Directions from './directions.jsx';
import axios from 'axios';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 32.877063,
            long: -117.234024,
            destinations: [
                {lat: 32.878071, long: -117.236941, destinationName: 'Center Hall'}, 
                {lat: 32.879749, long:-117.236921, destinationName: 'PC'}, 
                {lat: 32.881146, long: -117.237586, destinationName: 'Geisel'}
            ],
            isDriving: false,
            directions: [],
            currDestination: {lat: 32.881146, long: -117.237586}
        }
        this.getDirections = this.getDirections.bind(this);
    }
    componentDidUpdate() {
        for(var i = 0; i < this.state.destinations.length; i++) {
            if (this.state.destinations[i].lat === this.state.currDestination.lat) {
                console.log(this.state.destinations[i].destinationName);
            }
        }
        //console.log(this.state.currDestination);
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
                <Marker position={[this.state.lat, this.state.long]}>
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