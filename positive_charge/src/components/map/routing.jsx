import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "./lrm-tomtom.js";

const createRoutineMachineLayer = (props) => {
    var instance = props.isDriving 
    ? L.Routing.control({
        waypoints: [
            L.latLng(props.startingLat, props.startingLong),
            L.latLng(props.endingLat, props.endingLong)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        //showAlternatives: false
    }) 
    : L.Routing.control({
        waypoints: [
            L.latLng(props.startingLat, props.startingLong),
            L.latLng(props.endingLat, props.endingLong)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        //showAlternatives: false,
        router: new L.Routing.TomTom('lfI3k6sv1agp5oZhWAARgrVhbQQuYx0k', 
        {travelMode: 'pedestrian'})
    })
    return instance;
};
const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;