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
import { Table, TableHead, TableBody, TableRow, TableCell, InputLabel, Button, Input, Select, MenuItem } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
const axios = require('axios');


class SeePOI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 38.6235914,
      long: -90.33517859999999,
      dist: 1260
    };
    this.getPOIData = this.getPOIData.bind(this);
    this.filterForMap = this.filterForMap.bind(this);
    this.mapPOI = this.mapPOI.bind(this);
    this.walkTime = this.walkTime.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.getDatabaseData = this.getDatabaseData.bind(this);
    this.getSponserData = this.getSponserData.bind(this);
  }

  getDatabaseData (callback) {
    let data = [this.props.props.chargerCoords.chargerLat, this.props.props.chargerCoords.chargerLong]

    axios.post('/getPOI/seeDataPOI', data)
    .then (result => {
      callback(result.data.rows);
    })
    .catch (err => {
      console.error(err);
    })
  }

  getSponserData (callback) {
    let data = [this.props.props.chargerCoords.chargerLat, this.props.props.chargerCoords.chargerLong]

    axios.post('/getPOI/seeSponserPOI', data)
    .then (result => {
      callback(result.data.rows);
    })
    .catch (err => {
      console.error(err);
    })
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
      if (this.state.data[i].coordinates !== undefined) {
      let mapRequiredData = {
        lat: this.state.data[i].coordinates.latitude,
        long: this.state.data[i].coordinates.longitude,
        destinationName: this.state.data[i].name
      }
      modifiedData.push(mapRequiredData);
    } else {
      let mapRequiredData = {
        lat: this.state.data[i].lat,
        long: this.state.data[i].long,
        destinationName: this.state.data[i].name
      }
      modifiedData.push(mapRequiredData);
    }
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
      this.getDatabaseData((data) => this.setState({database: data}));
      this.getSponserData((data) => this.setState({sponser: data}));
      this.getPOIData('/getPOI/getPOI', (data) => {this.setState({all: data})});
      this.getPOIData('/getPOI/getFoodPOI', (data) => {this.setState({food: data})});
      this.getPOIData('/getPOI/getCafesPOI', (data) => {this.setState({cafe: data})});
      this.getPOIData('/getPOI/getMuseumsPOI', (data) => {this.setState({museum: data})});
      this.getPOIData('/getPOI/getLAndHPOI', (data) => {this.setState({landmark: data})});
      this.getPOIData('/getPOI/getParksPOI', (data) => {this.setState({park: data})});
    })
  }

  componentDidUpdate () {
    if (this.state.data === undefined && this.state.all !== undefined && this.state.sponser !== undefined && this.state.database !== undefined) {
      let data = [];
      let sponL = this.state.sponser.length;
      let baseL = this.state.database.length;

      if (sponL >= 5) {
        data = this.state.sponser.slice(0, 5);
      } else if (sponL > 0) {
        if (baseL > 0) {
          if(baseL + sponL >= 5) {
            let pullTo = 5 - sponL;
            data = this.state.sponser.concat(this.state.database.slice(0, pullTo));
          } else {
            let pullTo = 5 - (sponL + baseL);
            data = this.state.sponser.concat(this.state.database, this.state.all.businesses.slice(0, pullTo));
          }
        } else {
          let pullTo = 5 - sponL;
          data = this.state.sponser.concat(this.state.all.businesses.slice(0, pullTo));
        }
      } else if (baseL > 0) {
        if (baseL >= 5) {
          data = this.state.database.slice(0, 5);
        } else {
          let pullTo = 5 - baseL;
          data = this.state.database.concat(this.state.all.businesses.slice(0, pullTo))
        }
      } else {
        data = this.state.all.businesses.slice(0, 5);
      }
      this.setState({data: data}, () => {
        this.filterForMap()
        console.log('seePOI', this.state);
      })
    }
    if (this.state.all && this.state.food && this.state.cafe && this.state.museum && this.state.landmark && this.state.park && this.state.flag === undefined) {
      this.setState({flag: true})
    }
  }



  render() {
    return(

      <div className='seePOI'>
        <div className='returnCharger'><Link to='/' style={{textDecoration: 'none'}}>Find a different charger</Link></div>
        <div className='seePOIListHeader'>Experiences Near You</div><br></br>
        <div className='map'> {this.state.mapData !== undefined ? <Map props={this.state.mapData} userLocation={{userLat: this.state.lat, userLong: this.state.long}}></Map> : <div className='loading'> Loading...</div>}</div>
        <div className='seePOIbottom'>
        <div className='poiList'>{this.state.data !== undefined ? <PoiList props={this.state.data} walkTime={this.walkTime}></PoiList> : <div className='loading'> Loading...</div>} </div>
        <div className='filters'>{this.state.flag !== undefined ? <LittleFilter changeDisplay={this.changeDisplay} userLocation={{lat: this.state.lat, long: this.state.long}} allData={{all: this.state.all, database:this.state.database, food: this.state.food, cafe:this.state.cafe, landmark:this.state.landmark, museum:this.state.museum, park:this.state.park, sponser:this.state.sponser}} exampleInputForCDfunc={this.state.data}/> : <div className='loading'> Loading...</div>} </div>
        <div className='addPOI'><Link to='/addPOI' style={{textDecoration: 'none'}}>Add a Point of Interest</Link></div>
        </div>
      </div>

    )

  }

}

export default SeePOI;