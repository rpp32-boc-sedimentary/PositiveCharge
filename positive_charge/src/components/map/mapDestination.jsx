import React from 'react';
import { Marker, Popup } from 'react-leaflet';


var MapDestination = (props) => {
    return(
        props.destinations.map((dest, index) => {
            return (
                <Marker 
                    position={[dest.lat, dest.long]} 
                    key={index} 
                    eventHandlers={{
                        click: props.getDirections
                    }}>
                        <Popup>
                            {index + 1}
                        </Popup>
                </Marker>
            )
        })
    )
}

export default MapDestination;