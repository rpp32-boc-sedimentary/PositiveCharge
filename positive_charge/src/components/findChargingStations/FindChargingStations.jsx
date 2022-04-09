import React from 'react';

class FindChargingStations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation: '',
      chosenDistance: ''
    };
  }

  getUserLocation() {
    var geoOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition()
  }

  populateStationsList() {

  }

  render() {
    return (
      <div>
        <label>
          Your Location:
          <button placeholder='Use my location' onClick={this.getUserLocation()}></button>
        </label>
        <label>
          Distance:
          <input type='number' className='stationsDistanceInput'></input>
        </label>
        <label>
          Nearby Stations:

        </label>
      </div>
    )
  }
}