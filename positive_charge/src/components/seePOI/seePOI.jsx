import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import AddPOI from '../addPOI/AddPOI.jsx'
import Login from '../auth/Login.jsx';
import Signup from '../auth/Signup.jsx';
import Modal from '../poiDetails/Modal.jsx';
import LittleFilter from '../filter/LittleFilter.jsx';
import BigFilter from '../filter/BigFilter.jsx';
import Map from '../map/map.jsx';
import PoiList from './poiList.jsx'
const axios = require('axios');



class SeePOI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 39.595244,
      long: -104.7049212,
      dist: 600
    };
    this.getPOIData = this.getPOIData.bind(this);
    this.filterForMap = this.filterForMap.bind(this);
    this.mapPOI = this.mapPOI.bind(this);
    this.walkTime = this.walkTime.bind(this);
  }

  getPOIData (lat, long, dist) {
    axios.post('/getPOI', {data:{lat: this.state.lat, long: this.state.long, dist: this.state.dist}})
    .then(result => {
      this.setState({data: JSON.parse(result.data.body)}, () => {
        this.filterForMap();
      })
    })
  }

  filterForMap () {
    let modifiedData = [];
    for(let i = 0; i < this.state.data.businesses.length; i++) {
      let mapRequiredData = {
        lat: this.state.data.businesses[i].coordinates.latitude,
        long: this.state.data.businesses[i].coordinates.longitude,
        destinationName: this.state.data.businesses[i].name
      }
      modifiedData.push(mapRequiredData);
    }
    this.setState({mapData: modifiedData})
  }

  walkTime (distance) {
    let walk = Math.round((distance/84));
    return walk
  }

  mapPOI () {
    this.state.data.businesses.map((item) => {
      return (
        <div key={item.id}>
        <span className='POIName' >{item.name}</span> <span className='likes'>{item.rating}</span> <span className='distance' >{this.walkTime(item.distance)}</span>
        </div>
      )
    })
  }

  componentDidMount () {
    this.getPOIData(this.state.lat, this.state.long, this.state.dist);

  }



  render() {

    return(
      <div className='seePOI'>
        <div className='returnCharger'><Link to='/'>Find a different charger</Link></div>
        <div className='login'><Link to='/login'>Log In</Link></div><div className='signup'><Link to='/signup'>Sign up</Link></div>
        <h3 className='seePOIListHeader'>Experiences Near You</h3>
        {/* <div className='map'> {this.state.mapData !== undefined ? <Map props={this.state.mapData}></Map> : <div className='loading'> Loading...</div>}</div> */}
        <PoiList props={this.state.data} walkTime={this.walkTime}></PoiList>
        <div className='filters'><LittleFilter /></div>
        <div className='addPOI'><Link to='/addPOI'>Add a Point of Interest</Link></div>
      </div>
    )

  }

}

export default SeePOI;