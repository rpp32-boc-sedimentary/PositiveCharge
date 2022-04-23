import React from 'react';
import axios from 'axios';
import Map from '../map/map.jsx'
import { Link } from 'react-router-dom';
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, InputLabel, Button, Input, Select, MenuItem } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

class FindChargingStations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userLatitude: 0,
      userLongitude: 0,
      userHeading: 'North',
      chosenDistance: 5,
      stationsList: [],
      chargerCoords: {}
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
    axios.get('/findStations', {
      params: {
        userLat: this.state.userLatitude,
        userLong: this.state.userLongitude,
        radius: this.state.chosenDistance
      }
    })
      .then((stations) => {
        this.setState({ stationsList: stations.data });
      })
      .catch((err) => {
        alert('There was a problem finding charging stations in your area. Refresh and try again');
        console.log('Error populating stations list: ', err);
      });
  }

  handleHeadingChange(event) {
    this.setState({ userHeading: event.target.value });
  }

  showFeedbackMap() {
    if (this.state.userLatitude !== 0 && this.state.userLongitude !== 0) {
      return <Map userLocation={{ userLat: this.state.userLatitude, userLong: this.state.userLongitude }} props={[{ lat: '', long: '' }]} />;
    }
  }

  render() {
    return (
      <div className='findStationsDiv'>
        <InputLabel id='stationsYourLocationLabel'>
          What is your current location?
          <Button variant="contained" sx={{ ml: 5 }} id='stationsUseMyLocationButton' onClick={this.getUserLocation.bind(this)}><AddLocationAltIcon /></Button>
        </InputLabel>
        <br></br>
        <div>
          <ol></ol>
        </div>
        {this.showFeedbackMap()}
        <div>
          <ol></ol>
        </div>
        <InputLabel id='stationsDirectionLabel'>
          Which direction are you traveling?
          <Select sx={{ ml: 5 }} id='stationsDirectionSelector' defaultValue={'North'} onChange={this.handleHeadingChange.bind(this)}>
            <MenuItem value='North'>North</MenuItem>
            <MenuItem value='South'>South</MenuItem>
            <MenuItem value='East'>East</MenuItem>
            <MenuItem value='West'>West</MenuItem>
          </Select>
        </InputLabel>
        <div>
          <ol></ol>
        </div>
        <InputLabel id='stationsDistanceLabel'>
          How far away to search?
          <Input sx={{ ml: 5, width: '10%' }} type='number' id='stationsDistanceInput'  min='1' max='50' defaultValue={this.state.chosenDistance} onChange={this.updateChosenDistance.bind(this)}></Input>
          miles
        </InputLabel>
        <br></br>
        <div>
          <ol></ol>
        </div>
        <Button variant="contained" id='findStationsButton' onClick={this.populateStationsList.bind(this)}>Find Stations</Button>
        <div>
          <ol></ol>
        </div>
        <InputLabel id='stationsNearbyListLabel'>
          Nearby Stations:
          <TableContainer sx={{ maxHeight: '50vh'}}>
            <Table id='stationsNearbyTable' stickyHeader>
              <TableHead style={{ backgroundColor: '#4eb5f1' }}>
              <TableRow>
                <TableCell className='stationName'>
                  Name
                </TableCell>
                <TableCell className='stationAddress'>
                  Address
                </TableCell>
                <TableCell className='stationConnectorTypes'>
                  Connector types
                </TableCell>
                <TableCell className='stationNetwork'>
                  Networked
                </TableCell>
                <TableCell className='stationDistance'>
                  Distance
                </TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {
                this.state.stationsList.map((currentStation) => {
                  if (this.state.userHeading === 'North' && currentStation.latitude > this.state.userLatitude) {
                    return (
                      <TableRow className='stationTableRow' >
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationName'>
                          {currentStation.station_name}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationAddress'>
                          {currentStation.street_address}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationConnectorTypes'>
                          {currentStation.ev_connector_types.map((connector, index) => {
                            if (index + 1 < currentStation.ev_connector_types.length) {
                              return connector + ', ';
                            } else {
                              return connector;
                            }
                          })}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationNetwork'>
                          {currentStation.ev_network}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationDistance'>
                          {(Math.round(currentStation.distance * 4) / 4).toFixed(2) + ' miles'}
                        </TableCell></Link>
                      </TableRow>
                    )
                  } else if (this.state.userHeading === 'South' && currentStation.latitude < this.state.userLatitude) {
                    return (
                      <TableRow className='stationTableRow' >
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationName'>
                          {currentStation.station_name}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationAddress'>
                          {currentStation.street_address}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationConnectorTypes'>
                          {currentStation.ev_connector_types.map((connector, index) => {
                            if (index + 1 < currentStation.ev_connector_types.length) {
                              return connector + ', ';
                            } else {
                              return connector;
                            }
                          })}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationNetwork'>
                          {currentStation.ev_network}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationDistance'>
                          {(Math.round(currentStation.distance * 4) / 4).toFixed(2) + ' miles'}
                        </TableCell></Link>
                      </TableRow>
                    )
                  } else if (this.state.userHeading === 'East' && currentStation.longitude > this.state.userLongitude) {
                    return (
                      <TableRow className='stationTableRow' >
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationName'>
                          {currentStation.station_name}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationAddress'>
                          {currentStation.street_address}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationConnectorTypes'>
                          {currentStation.ev_connector_types.map((connector, index) => {
                            if (index + 1 < currentStation.ev_connector_types.length) {
                              return connector + ', ';
                            } else {
                              return connector;
                            }
                          })}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationNetwork'>
                          {currentStation.ev_network}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationDistance'>
                          {(Math.round(currentStation.distance * 4) / 4).toFixed(2) + ' miles'}
                        </TableCell></Link>
                      </TableRow>
                    )
                  } else if (this.state.userHeading === 'West' && currentStation.longitude < this.state.userLongitude) {
                    return (
                      <TableRow className='stationTableRow' >
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationName'>
                          {currentStation.station_name}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationAddress'>
                          {currentStation.street_address}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationConnectorTypes'>
                          {currentStation.ev_connector_types.map((connector, index) => {
                            if (index + 1 < currentStation.ev_connector_types.length) {
                              return connector + ', ';
                            } else {
                              return connector;
                            }
                          })}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationNetwork'>
                          {currentStation.ev_network}
                        </TableCell></Link>
                        <Link to='/seePOI' className='toSeePOILink' state={{ chargerCoords: {chargerLat: currentStation.latitude, chargerLong: currentStation.longitude} }}><TableCell className='stationDistance'>
                          {(Math.round(currentStation.distance * 4) / 4).toFixed(2) + ' miles'}
                        </TableCell></Link>
                      </TableRow>
                    )
                  }
                })
              }
              </TableBody>
            </Table>
          </TableContainer>
        </InputLabel>
      </div>
    )
  }
}

export default FindChargingStations;
