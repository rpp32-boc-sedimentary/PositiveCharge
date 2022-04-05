import React from 'react';

class SeePOI extends React.Component {
  constructor(props) {
    super(props)
    this.state = {};
  }


  render() {
    return(
      <div className='seePOI'>
        <div className='returnCharger'>Find a different charger</div>
        <div className='login'>Log In</div><div className='signup'>Sign up</div>
        <div className='map'>Map placeholder</div>
        <h3 className='seePOIListHeader'>Experiences Near You</h3>
        <div className='POIList'>POI list placeholder</div>
        <div className='filters'>Filter placeholder</div>
        <div className='addPOI'>Add POI placeholder</div>
      </div>

    )
  }

}