import React from 'react';
// import axios from 'axios';

class FindChargingStations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: '',
      chosenDistance: '',
      stationsList: []
    };
  }

  getUserLocation() {
    // var geoOptions = {
    //   enableHighAccuracy: false,
    //   timeout: 5000,
    //   maximumAge: 0
    // };

    // navigator.geolocation.getCurrentPosition()
  }

  populateStationsList() {
    // var stations = [];

    // axios.get()
  }

  updateChosenDistance(event) {
    // var dist = event.target.value;

    // this.setState({ chosenDistance: dist});
  }

  render() {
    return (
      <div>
        <label>
          Your Location:
          <button /* onClick={this.getUserLocation().bind(this) }*/>Use my location</button>
        </label>
        <br></br>
        <div>
          <ol></ol>
        </div>
        <label>
          Distance:
          <input type='number' className='stationsDistanceInput' /* onChange={ this.updateChosenDistance().bind(this) }*/></input>
        </label>
        <br></br>
        <div>
          <ol></ol>
        </div>
        <label>
          Nearby Stations:
          <ol>
            <li>
              Name: '[Station Name Here]'   Address: '[Station Address]'   Connector Type: '[Connector Type Here]'   Networked: '[Yes or No]'   Distance: '[0.00 to chosen distance (miles)]'
            </li>
          </ol>
        </label>
      </div>
    )
  }
}

export default FindChargingStations;