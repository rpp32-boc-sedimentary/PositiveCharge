import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate, useLocation} from 'react-router-dom';
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
      lat: 39.73818,
      long: -104.98997,
      dist: 1260
    };
    this.getPOIData = this.getPOIData.bind(this);
    this.filterForMap = this.filterForMap.bind(this);
    this.mapPOI = this.mapPOI.bind(this);
    this.walkTime = this.walkTime.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);

  }

  getPOIData (path, callback) {
    axios.post(path, {data:{lat: this.state.lat, long: this.state.long, dist: this.state.dist}})
    .then(result => {
      callback(JSON.parse(result.data.body));
    })
    .catch(err => {
      console.error(err);
    })
  }

  filterForMap () {
    let modifiedData = [];
    for(let i = 0; i < this.state.data.length; i++) {
      let mapRequiredData = {
        lat: this.state.data[i].coordinates.latitude,
        long: this.state.data[i].coordinates.longitude,
        destinationName: this.state.data[i].name
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

  changeDisplay (newBusinesses) {
    this.setState({data: newBusinesses}, () => {
      this.filterForMap();
    });
  }



  componentDidMount () {
    this.setState({lat: this.props.props.chargerCoords.chargerLat, long: this.props.props.chargerCoords.chargerLong}, () => {
      this.getPOIData('/getPOI/getPOI', (data) => {this.setState({all: data})});
      this.getPOIData('/getPOI/getFoodPOI', (data) => {this.setState({food: data})});
      this.getPOIData('/getPOI/getCafesPOI', (data) => {this.setState({cafes: data})});
      this.getPOIData('/getPOI/getMuseumsPOI', (data) => {this.setState({museums: data})});
      this.getPOIData('/getPOI/getLAndHPOI', (data) => {this.setState({lAndH: data})});
      this.getPOIData('/getPOI/getParksPOI', (data) => {this.setState({parks: data})});
    })
  }

  componentDidUpdate () {
    if (this.state.data === undefined && this.state.all !== undefined) {
      this.setState({data: this.state.all.businesses.slice(0,5)}, () => {
        this.filterForMap()
      })
    }
    if (this.state.all && this.state.food && this.state.cafes && this.state.museums && this.state.lAndH && this.state.parks && this.state.flag === undefined) {
      this.setState({flag: true})
    }
  }



  render() {

    return(
      <div className='seePOI'>
        <div className='returnCharger'><Link to='/'>Find a different charger</Link></div>
        <div className='login'><Link to='/login'>Log In</Link></div><div className='signup'><Link to='/signup'>Sign up</Link></div>
        <h3 className='seePOIListHeader'>Experiences Near You</h3>
        <div className='map'> {this.state.mapData !== undefined ? <Map props={this.state.mapData} userLocation={{userLat: this.state.lat, userLong: this.state.long}}></Map> : <div className='loading'> Loading...</div>}</div>
        <div className='poiList'>{this.state.data !== undefined ? <PoiList props={this.state.data} walkTime={this.walkTime}></PoiList> : <div className='loading'> Loading...</div>} </div>
        <div className='filters'>{this.state.flag !== undefined ? <LittleFilter changeDisplay={this.changeDisplay} userLocation={{lat: this.state.lat, long: this.state.long}} allData={{all: this.state.all, food: this.state.food, cafes:this.state.cafes, lAndH:this.state.lAndH, museums:this.state.museums, parks:this.state.parks}} exampleInputForCDfunc={this.state.data}/> : <div className='loading'> Loading...</div>} </div>
        <div className='addPOI'><Link to='/addPOI'>Add a Point of Interest</Link></div>
      </div>
    )

  }

}

export default SeePOI;