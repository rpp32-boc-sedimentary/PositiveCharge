import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link } from 'react-router-dom';
import AddPOI from '../addPOI/AddPOI.jsx'
import Login from '../auth/Login.jsx';
import Signup from '../auth/Signup.jsx';
import Modal from '../poiDetails/Modal.jsx';

class SeePOI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render() {
    return(
      <div className='seePOI'>
        <div className='returnCharger'><Link to='/'>Find a different charger</Link></div>
        <div className='login'><Link to='/login'>Log In</Link></div><div className='signup'><Link to='/signup'>Sign up</Link></div>
        <h3 className='seePOIListHeader'>Experiences Near You</h3>
        <div className='map'>Map placeholder</div>
        <div className='POIList'>POI list placeholder</div>
        <div className='filters'>Filter placeholder</div>
        <div className='addPOI'><Link to='/addPOI'>Add a Point of Interest</Link></div>
      </div>



    )
  }

}

export default SeePOI;