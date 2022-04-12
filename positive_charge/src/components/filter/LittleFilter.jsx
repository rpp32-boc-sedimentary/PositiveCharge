import React, { useState, useEffect } from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import axios from 'axios';

class LittleFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      priceModalState: false,
      price: {
        free: '',
        $: '',
        $$: '',
        $$$: ''
      },
      dynamicState: false,
      distance: '',
    }

    this.handleModalState = this.handleModalState.bind(this);
    this.handlePriceModalState = this.handlePriceModalState.bind(this);
    this.handleDynamicState = this.handleDynamicState.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.getYelpDataTest = this.getYelpDataTest.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.handleBigFilterApply = this.handleBigFilterApply.bind(this);
  }
  ///////////////// temporary usage
  // let categories = ['food', 'museums', 'cafes', 'landmarks', 'parks'];
  // const getRandomCategory = (max) => {
  //   return Math.floor(Math.random() * max);
  // };
  // let randomCategory = categories[getRandomCategory(categories.length)];
  //////////////////////////

  handleModalState = () => {
    this.setState({
      modalState: !this.state.modalState
    })
  };

  handlePriceModalState = () => {
    console.log('hello')
    this.setState({
      priceModalState: !this.state.priceModalState
    })
  };

  //add function to change the color of the button when clicked
  handleDynamicState = (e) => {
    e.preventDefault();
    this.setState({
      dynamicState: !this.state.dynamic
    }, () => {
      this.applyFilter();
    })
  };

  handlePrice = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let prices = this.state.price
    prices = { ...prices, [name]: value };
    this.setState({
      price: prices
    })
  };

  handleDistance = (e) => {
    this.setState({
      distance: e.target.value
    })
  };

  handlePriceApply = (e) => {
    e.preventDefault();
    this.applyFilter();
    this.handlePriceModalState();
  };

  handleBigFilterApply = (e) => {
    e.preventDefault();
    this.applyFilter();
    this.handleModalState();
  }

  applyFilter = () => {
    axios.get('/filter/selectedFilters', {
      params: {
        dynamic: this.state.dynamicState,
        price: this.state.price,
        distance: this.state.distance,
      }
    })
      .then(data => {
        console.log('success applying filters', data);
      })
      .catch(err => {
        console.error('error applying filters', err);
      })
  };

  // DELETE Later, for testing purposes
  getYelpDataTest = () => {

    let lat = 37.776447823372365;
    let long = -122.43286289002232;
    axios.get('/filter/graphql', {
      params: {
        lat: lat,
        long: long
      }
    })
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('error', err);
      })
  };

  clearFilters = () => {
    this.setState({
      distance: '',
      price: {
        free: '',
        $: '',
        $$: '',
        $$$: ''
      }
    });
  };




////////////////////////////////////////////////////////////////////////////////

/*
function to calculate distances between latitude and longitude

look into calculating walking time
*/


//////////////////////////////////////////////////////////////////////////////



  //when someone clicks on a filter, check the status of all of the filters and then update the list of all states and send it back
  render() {

    return (
      <div className="smallFilter">
        <select className="sfChild">
          <option>Recommended</option>
          <option>Distance</option>
          <option>Likes</option>
        </select>
        <button className="sfChild" onClick={ this.handleModalState } >More Filters</button>
        {this.state.modalState ? <BigFilter manageModalState={ this.handleModalState } distance = {this.state.distance} handleDistance={ this.handleDistance } price={this.state.price} handlePrice={ this.handlePrice } handleBigFilterApply={ this.handleBigFilterApply } clearFilters={ this.clearFilters } /> : null}
        <button className="sfChild" onClick={ this.handlePriceModalState }>Price</button>
        {this.state.priceModalState ?  <PriceFilter priceModalState={ this.handlePriceModalState } handlePrice={ this.handlePrice } handlePriceApply={ this.handlePriceApply } price={this.state.price}/> : null}
        <button className="sfChild" onClick={ this.handleDynamicState }>Cafes</button>
        <button className="sfChild" onClick={ this.getYelpDataTest }>getYelpDataTest</button>
      </div>
    )
  }
}

export default LittleFilter