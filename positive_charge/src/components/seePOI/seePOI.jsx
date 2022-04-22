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
import { createTheme, ThemeProvider } from '@mui/material/styles';
const axios = require('axios');

const theme = createTheme({
  palette: {
    primary: {
      main: '#da8107',
    },
    secondary: {
      main: '#11730a',
    }
  }
})

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
      this.getPOIData('/getPOI/getCafesPOI', (data) => {this.setState({cafes: data})});
      this.getPOIData('/getPOI/getMuseumsPOI', (data) => {this.setState({museums: data})});
      this.getPOIData('/getPOI/getLAndHPOI', (data) => {this.setState({lAndH: data})});
      this.getPOIData('/getPOI/getParksPOI', (data) => {this.setState({parks: data})});
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
    if (this.state.all && this.state.food && this.state.cafes && this.state.museums && this.state.lAndH && this.state.parks && this.state.flag === undefined) {
      this.setState({flag: true})
    }
  }



  render() {
    return(

      <div className='seePOI'>
        <div className='returnCharger'><Link to='/'>Find a different charger</Link></div>
        <div className='login'><Link to='/login'>Log In</Link></div><div className='signup'><Link to='/signup'>Sign up</Link></div>
        <h3 className='seePOIListHeader'>Experiences Near You</h3> <br></br>
        <div className='map'> {this.state.mapData !== undefined ? <Map props={this.state.mapData} userLocation={{userLat: this.state.lat, userLong: this.state.long}}></Map> : <div className='loading'> Loading...</div>}</div>
        <div className='poiList'>{this.state.data !== undefined ? <PoiList props={this.state.data} walkTime={this.walkTime}></PoiList> : <div className='loading'> Loading...</div>} </div>
        <div className='filters'>{this.state.flag !== undefined ? <LittleFilter changeDisplay={this.changeDisplay} userLocation={{lat: this.state.lat, long: this.state.long}} allData={{all: this.state.all, database:this.state.database, food: this.state.food, cafes:this.state.cafes, lAndH:this.state.lAndH, museums:this.state.museums, parks:this.state.parks}} exampleInputForCDfunc={this.state.data}/> : <div className='loading'> Loading...</div>} </div>
        <div className='addPOI'><Link to='/addPOI'>Add a Point of Interest</Link></div>
      </div>

    )

  }

}

export default SeePOI;