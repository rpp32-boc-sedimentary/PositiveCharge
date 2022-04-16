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
            lat: 39.595244, //this.props.userLocation.userLat
            long: -104.7049212, //this.props.userLocation.userLong
            destinations: this.props.props,
            isDriving: false,
            directions: [],
            currDestination: {}
        }
        this.getDirections = this.getDirections.bind(this);
        this.haversine = this.haversine.bind(this);
        this.routingRef = React.createRef();
    }

    componentDidUpdate() {
        if (this.routingRef.current) {
            this.routingRef.current.setWaypoints([
                L.latLng(this.state.lat, this.state.long),
                L.latLng(this.state.currDestination.lat, this.state.currDestination.long)
            ])
        }
    }

    //Finds distance between two points in miles or feet depending on which is more appropriate
    haversine(lat1, lat2, lon1, lon2) {
        lon1 =  lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;

        // Haversine formula
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2),2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 3956;
        let distance = (c * r);

        return distance < 0.1 ? `. Continue for ${parseInt(distance * 5028)} feet` : `. Continue for ${+(Math.round(distance + "e+2") + "e-2")} miles`;
    }

    getDirections(event) {
        axios.get('/map', {
            params: {
                startingLat: this.state.lat,
                startingLong: this.state.long,
                endingLat: event.latlng.lat,
                endingLong: event.latlng.lng
            }
        })
        .then(response => {
            var directions = [];
            // response.data.instructions.forEach((direction) => {
            //     directions.push(direction.message);
            // })
            var instructions = response.data.guidance.instructions;
            instructions.forEach((direction) => {
                directions.push(direction.message);
            });
            for(var index = 0; index < instructions.length - 1; index++) {
                var distance = this.haversine(instructions[index].point.latitude, instructions[index + 1].point.latitude, instructions[index].point.longitude, instructions[index + 1].point.longitude)
                directions[index] += distance;
            }
            this.setState({
                directions: directions,
                currDestination: { lat: event.latlng.lat, long: event.latlng.lng }
            })
        })
        .catch(err => {
            console.log("Failed to reach /map route", err);
        })
    }
    render() {
        return (
            <div>
                <MapContainer center={[this.state.lat, this.state.long]} zoom={18} id="map">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[this.state.lat, this.state.long]} icon={L.icon({ iconUrl: './img/personMarker.png', iconSize: [90, 90] })}>
                        <Popup>
                            Your Location
                        </Popup>
                    </Marker>
                    <MapDestination
                        destinations={this.state.destinations}
                        getDirections={this.getDirections} >
                    </MapDestination>
                    {Object.keys(this.state.currDestination).length === 0
                        ? <div></div>
                        : <Routing
                            startingLat={this.state.lat}
                            startingLong={this.state.long}
                            endingLat={this.state.currDestination.lat}
                            endingLong={this.state.currDestination.long}
                            isDriving={this.state.isDriving}
                            ref={this.routingRef}
                        ></Routing>
                    }
                </MapContainer>
                <Directions directions={this.state.directions}></Directions>
            </div>

        )
    }
}

export default Map;