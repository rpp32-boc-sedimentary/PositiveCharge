import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';


var MapDestination = (props) => {
    return(
        props.destinations.map((dest, index) => {
            return (
                <Marker 
                    position={[dest.lat, dest.long]} 
                    key={index}
                    icon={L.icon({iconUrl: './img/experience.png', iconSize: [90, 90]})}
                    eventHandlers={{
                        click: props.getDirections
                    }}>
                        <Popup>
                            {dest.destinationName}
                        </Popup>
                </Marker>
            )
        })
    )
}

export default MapDestination;