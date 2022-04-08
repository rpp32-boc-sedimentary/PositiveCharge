import React from 'react';
import { Marker, Popup } from 'react-leaflet';


var MapDestination = (props) => {
    return(
        props.destinations.map((dest, index) => {
            return (
                <Marker position={[dest[0], dest[1]]} key={index}>
                    <Popup>
                        Custom Customizable Number;
                    </Popup>
                </Marker>
            )
        })
    )
}

export default MapDestination;