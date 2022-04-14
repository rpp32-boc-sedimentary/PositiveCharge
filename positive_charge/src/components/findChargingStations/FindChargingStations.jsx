import React from 'react';
import axios from 'axios';

class FindChargingStations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      chosenDistance: 5,
      stationsList: []
    };
  }

  getUserLocation() {
    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    const positionCallback = function (position) {
      this.setState({ userLatitude: position.coords.latitude, userLongitude: position.coords.longitude });
    }.bind(this);

    const postionError = function (err) {
      console.error('Error finding device location: ', err);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(positionCallback, postionError, geoOptions);
    } else {
      alert('Geolocation is not supported by this browser');
    }
  }


  updateChosenDistance(event) {
    var dist = event.target.value;
    this.setState({ chosenDistance: dist });
  }

  populateStationsList() {
    axios.post('/findStations', {
      userLat: this.state.userLatitude,
      userLong: this.state.userLongitude,
      radius: this.state.chosenDistance
    })
      .then((stations) => {
        console.log('Stations', stations.data);
        this.setState({ stationsList: stations.data });
      })
      .catch((err) => {
        console.log('Error populating stations list: ', err);
      });
  }


  render() {
    return (
      <div>
        <label>
          Your Location:
          <button onClick={this.getUserLocation.bind(this)}>Use my location</button>
        </label>
        {

        }
        <br></br>
        <div>
          <ol></ol>
        </div>
        <label>
          Distance:
          <input type='number' className='stationsDistanceInput' onChange={this.updateChosenDistance.bind(this)}></input>
          miles
        </label>
        <br></br>
        <div>
          <ol></ol>
        </div>
        <button className='findStationsButton' onClick={this.populateStationsList.bind(this)}>Find Stations</button>
        <div>
          <ol></ol>
        </div>
        <label>
          Nearby Stations:
          <table>
            <tr>
              <td>
                Name
              </td>
              <td>
                Address
              </td>
              <td>
                Connector types
              </td>
              <td>
                Networked
              </td>
              <td>
                Distance
              </td>
            </tr>
            {
              this.state.stationsList.map((currentStation) => {
                var networked = 'TRUE';
                if (currentStation.ev_network === 'Non-Network') {
                  networked = 'FALSE';
                }
                return (
                <tr>
                  <td>
                    {currentStation.station_name}
                  </td>
                  <td>
                    {currentStation.street_address}
                  </td>
                  <td>
                    {currentStation.ev_connector_types.map((connector, index) => { if (index + 1 < currentStation.ev_connector_types.length) {
                      return connector + ', ';
                    } else {
                      return connector;
                    } })}
                  </td>
                  <td>
                    {networked}
                  </td>
                  <td>
                    {currentStation.distance + ' miles'}
                  </td>
                </tr>
                )})
            }
          </table>
        </label>
      </div>
    )
  }
}

export default FindChargingStations;