import React from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import CategoryButtons from './CategoryButtons.jsx';
import axios from 'axios';
import dummyData from '../../../../database/dummyData/pois.js';
import helpers from './filterHelpers.js';

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
      categoriesChecked: {},
      littleFilterCategories: {},
      userLocation: {lat: 37.776447823372365, long: -122.43286289002232},
      sampleData: dummyData.poiData,
      modifiedData: [],
      filteredData: [],
    }

    this.handleModalState = this.handleModalState.bind(this);
    this.handlePriceModalState = this.handlePriceModalState.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.getYelpDataTest = this.getYelpDataTest.bind(this);
    this.handleBigFilterApply = this.handleBigFilterApply.bind(this);
    this.handleDynamicCategories = this.handleDynamicCategories.bind(this);
    this.findTimeToTravel = this.findTimeToTravel.bind(this);
    this.handleCategoryButton = this.handleCategoryButton.bind(this);

  }


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
  // handleDynamicState = (e) => {
  //   e.preventDefault();
  //   this.setState({
  //     dynamicState: !this.state.dynamic
  //   }, () => {
  //     this.applyFilter();
  //   })
  // };

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

  handleCategoryButton = (e) => {
    console.log(e.target.value);
    let lFC = this.state.littleFilterCategories;
    if (!lFC[e.target.value]) {
      lFC[e.target.value] = true;
    } else if (lFC[e.target.value] === true) {
      lFC[e.target.value] = false;
    }
    this.setState({
      littleFilterCategories: lFC
    }, () => {
      let filteredLfc = helpers.filterLfCategories(this.state.littleFilterCategories, this.state.sampleData);
      // need to update state with filteredLfc / use DOM's func
    });
  };

  handleDistance = (e) => {
    this.setState({
      distance: e.target.value
    }, () => {
      let filteredOnDistance = helpers.filterOnDistance(this.state.distance, this.state.modifiedData);
      console.log('filtered on distance', filteredOnDistance)
    });
  };

  handlePriceApply = (e) => {
    e.preventDefault();
    console.log('price filters', this.state.price);
    let filtered = helpers.filterOnPrice(this.state.price, this.state.sampleData);
    // need to update state with filtered / use DOM's func
    console.log('price filter test', filtered);
    this.handlePriceModalState();
  };

  handleBigFilterApply = (e) => {
    e.preventDefault();
    //collect all of the selected filters in big filter
    //apply them all to modified data state
    this.handleModalState();
  };

  clearFilters = () => {
    let categoriesChecked = this.state.categoriesChecked;
    console.log('cat', categoriesChecked)
    for (let key in categoriesChecked) {
      categoriesChecked[key] = '';
    }
    this.setState({
      distance: '',
      price: {
        free: '',
        $: '',
        $$: '',
        $$$: ''
      },
      categoriesChecked
    });
  };

  // DELETE Later, for testing purposes
  getYelpDataTest = () => {
    axios.get('/filter/graphql', {
      params: {
        lat: this.state.userLocation.lat,
        long: this.state.userLocation.long
      }
    })
      .then(data => {
        console.log('data', data);
      })
      .catch(err => {
        console.log('error', err);
      })
  };


  componentDidMount = () => {
    console.log('props from DOM', this.props)

    let categoriesInData = helpers.findCategories(this.state.sampleData);
    this.setState({
      categoriesChecked: categoriesInData
    });
    this.findTimeToTravel();

  }

  findTimeToTravel = () => {
    let places = this.state.sampleData;
    axios.post('/filter/walkingTime', {
      data: {
        starting: this.state.userLocation,
        places
      }
    })
      .then(data => {
        this.setState({
          modifiedData: data.data
        }, () => {
          console.log('mod', this.state.modifiedData)
        })
      })
      .catch(err => {
        console.log('error sending', err)
      })
  }



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

        <CategoryButtons categories={ this.state.categoriesChecked } handleCategoryButton={ this.handleCategoryButton }/>

        <button className="sfChild" onClick={ this.findTimeToTravel }>Calc Time to Walk</button>
      </div>
    )
  }
}

export default LittleFilter;