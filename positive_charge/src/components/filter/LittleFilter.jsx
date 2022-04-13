import React, { useState, useEffect } from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import axios from 'axios';
import dummyData from '../../../../database/dummyData/pois.js'

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
      categories: [],
      categoriesChecked: {}
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
    this.findCategories = this.findCategories.bind(this);
    this.handleDynamicCategories = this.handleDynamicCategories.bind(this);
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
    });
  };


  handleDynamicCategories = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let categoriesChecked = this.state.categoriesChecked;
    categoriesChecked = { ...categoriesChecked, [name]: value };
    this.setState({
      categoriesChecked
    });
  };

  handleDistance = (e) => {
    this.setState({
      distance: e.target.value
    });
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
  };

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
    let cats = this.findCategories(dummyData.poiData);
    console.log('cats', cats);
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


  //move this function into a helper file later
  findCategories = (data) => {
    let categories = {};
    data.forEach(item => {
      categories[item.category] = true;
    });
    let catKeys = Object.keys(categories);
    let categoriesChecked = {};
    catKeys.forEach(key => {
      categoriesChecked[key] = '';
    });
    //create an object with empty string values for categories and set the categories checked to it
    this.setState({
      categoriesChecked
    }, () => {
      console.log('cck', this.state.categoriesChecked)
    });
  }

  componentDidMount = () => {
    this.findCategories(dummyData.poiData);
  }

  //now that categories are filled, need to make dynamic checkboxes depending on what exists in state

////////////////////////////////////////////////////////////////////////////////

/*
function to calculate distances between latitude and longitude

look into calculating walking time
*/


//////////////////////////////////////////////////////////////////////////////


  render() {

    return (
      <div className="smallFilter">
        <select className="sfChild">
          <option>Recommended</option>
          <option>Distance</option>
          <option>Likes</option>
        </select>
        <button className="sfChild" onClick={ this.handleModalState } >More Filters</button>

        { this.state.modalState ? <BigFilter manageModalState={ this.handleModalState } distance = { this.state.distance } handleDistance={ this.handleDistance } price={ this.state.price } handlePrice={ this.handlePrice } handleBigFilterApply={ this.handleBigFilterApply } clearFilters={ this.clearFilters } categoriesChecked={ this.state.categoriesChecked } handleDynamicCategories={ this.handleDynamicCategories } /> : null }

        <button className="sfChild" onClick={ this.handlePriceModalState }>Price</button>

        { this.state.priceModalState ?  <PriceFilter priceModalState={ this.handlePriceModalState } handlePrice={ this.handlePrice } handlePriceApply={ this.handlePriceApply } price={this.state.price}/> : null }

        <button className="sfChild" onClick={ this.handleDynamicState }>Cafes</button>
        <button className="sfChild" onClick={ this.getYelpDataTest }>getYelpDataTest</button>
      </div>
    )
  }
}

export default LittleFilter;