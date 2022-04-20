import React from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import LfCategories from './LfCategories.jsx';
import axios from 'axios';
import dummyData from '../../../../database/dummyData/pois.js';
import helpers from './filterHelpers.js';

class LittleFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: false,
      priceModalState: false,
      sortVal: 'Loves',
      price: {
        free: '',
        $: '',
        $$: '',
        $$$: ''
      },
      dynamicState: false,
      distance: '',
      categoriesChecked: {},
      suggestedCategories: {},
      //userLocation: {lat: 37.776447823372365, long: -122.43286289002232},
      sampleData: dummyData.poiData,
      modifiedData: [],
      filteredData: [],
      lessThanFive: false,
      quickWalk: false,
      dataFromDom: [],

    }

    this.handleBigModalState = this.handleBigModalState.bind(this);
    this.handlePriceModalState = this.handlePriceModalState.bind(this);

    this.handlePrice = this.handlePrice.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleAllCategories = this.handleAllCategories.bind(this);
    this.handleSuggestedCategoriesBf = this.handleSuggestedCategoriesBf.bind(this);
    this.handleSuggestedCategoriesLF = this.handleSuggestedCategoriesLF.bind(this);
    this.handleQuickLf = this.handleQuickLf.bind(this);
    this.handleQuickBf = this.handleQuickBf.bind(this);
    this.handleSort = this.handleSort.bind(this);

    this.findTimeToTravel = this.findTimeToTravel.bind(this);
    this.handleBigFilterApply = this.handleBigFilterApply.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    //this.getYelpDataTest = this.getYelpDataTest.bind(this);
  }


  handleBigModalState = () => {
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
  handleSort = (e) => {
    let chosen = e.target.value;
    this.setState({
      sortVal: chosen
    }, () => {
      this.applyFilters();
    })
  }

  handlePrice = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let price = this.state.price
    price = { ...price, [name]: value };
    this.setState({
      price
    });
  };


  handleAllCategories = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let categoriesChecked = this.state.categoriesChecked;
    categoriesChecked = { ...categoriesChecked, [name]: value };
    this.setState({
      categoriesChecked
    });
  };

  handleSuggestedCategoriesLF = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    let suggestedCategories = this.state.suggestedCategories;
    suggestedCategories = { ...suggestedCategories, [name]: value };
    this.setState({
      suggestedCategories
    }, () => {
      this.applyFilters();
    });
  };

  handleSuggestedCategoriesBf = (e) => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    let suggestedCategories = this.state.suggestedCategories;
    suggestedCategories = { ...suggestedCategories, [name]: value };
    this.setState({
      suggestedCategories
    });
  };

  handleQuickLf = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.checked;
    this.setState({
      [name]: value
    }, () => {
      this.applyFilters();
    });
  };

  handleQuickBf = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.checked;
    this.setState({
      [name]: value
    });
  };

  handleDistance = (e) => {
    this.setState({
      distance: e.target.value
    }, () => {
      let filteredOnDistance = helpers.filterOnDistance(this.state.distance, this.state.modifiedData);
      this.setState({
        filteredData: filteredOnDistance
      });
    });
  };

  handlePriceApply = (e) => {
    e.preventDefault();
    let filtered = helpers.filterOnPrice(this.state.price, this.state.sampleData);
    this.setState({
      filteredData: filtered
    }, () => {
      this.applyFilters();
    })
    this.handlePriceModalState();
  };

  handleBigFilterApply = (e) => {
    this.applyFilters();
    this.handleBigModalState();
  };

  applyFilters = (e) => {
    const { filterOnPrice, filterOnCategories, filterLfCategories, filterOnDistance, filterQuickWalks } = helpers;
    let filteredData = filterOnPrice(this.state.price, this.state.modifiedData);
    filteredData = filterOnCategories(this.state.categoriesChecked, filteredData);
    filteredData = filterLfCategories(this.state.suggestedCategories, filteredData);
    filteredData = filterOnDistance(this.state.distance, filteredData);
    filteredData = filterQuickWalks(this.state.quickWalk, filteredData);
    filteredData = helpers.sortFunc(this.state.sortVal, filteredData);
    this.props.changeDisplay(filteredData);
    this.setState({
      filteredData
    }, () => {
    });

  };

  clearFilters = () => {
    let categoriesChecked = this.state.categoriesChecked;
    for (let key in categoriesChecked) {
      categoriesChecked[key] = false;
    }
    let suggestedCategories = this.state.suggestedCategories;
    for (let key in suggestedCategories) {
      suggestedCategories[key] = false;
    }
    this.setState({
      distance: '',
      price: {
        free: '',
        $: '',
        $$: '',
        $$$: ''
      },
      categoriesChecked,
      suggestedCategories,
      quickWalk: false,
    });
  };

  // DELETE Later, for testing purposes
  // getYelpDataTest = () => {
  //   axios.get('/filter/graphql', {
  //     params: {
  //       lat: this.state.userLocation.lat,
  //       long: this.state.userLocation.long
  //     }
  //   })
  //     .then(data => {
  //       console.log('data', data);
  //     })
  //     .catch(err => {
  //       console.log('error', err);
  //     })
  // };


  componentDidMount = () => {
    console.log('props from DOM', this.props)
    let data = this.props.allData;
    data['landmarks & historical'] = data.lAndH;
    delete data.lAndH;
    delete data.all;
    let addedCategories = helpers.addCategory(data);
    this.findTimeToTravel(addedCategories);


  }

  findTimeToTravel = (allData) => {
    let starting = this.props.userLocation;
    axios.post('/filter/walkingTime', {
      data: {
        starting,
        data: allData
      }
    })
      .then(data => {
        this.setState({
          modifiedData: data.data.all,
          lessThanFive: data.data.lessThanFive
        }, () => {
          let categoriesChecked = helpers.findCategories(this.state.modifiedData);
          let suggestedCategories = helpers.findSuggested(categoriesChecked);
          this.setState({
            categoriesChecked,
            suggestedCategories
          });
        });
      })
      .catch(err => {
        console.log('error sending', err)
      })
  }

//when cancel is clicked all filters should clear???

  render() {

    return (
      <div className="smallFilter">

        <select className="sfChild" name="category" onChange={ this.handleSort }>
          <option>Loves</option>
          <option>Distance</option>
        </select>

        <button className="sfChild" onClick={ this.handleBigModalState }>More Filters</button>

        { this.state.modalState ? <BigFilter manageModalState={ this.handleBigModalState } distance = { this.state.distance } handleDistance={ this.handleDistance } price={ this.state.price } handlePrice={ this.handlePrice } handleBigFilterApply={ this.handleBigFilterApply } clearFilters={ this.clearFilters } categoriesChecked={ this.state.categoriesChecked } handleAllCategories={ this.handleAllCategories } suggestedCategories=
        { this.state.suggestedCategories } handleSuggestedCategoriesBf={ this.handleSuggestedCategoriesBf } lessThanFive={ this.state.lessThanFive } quickWalk={ this.state.quickWalk } handleQuickBf={ this.handleQuickBf } /> : null }

        <button className="sfChild" onClick={ this.handlePriceModalState }>Price</button>

        { this.state.priceModalState ?  <PriceFilter priceModalState={ this.handlePriceModalState } handlePrice={ this.handlePrice } handlePriceApply={ this.handlePriceApply } price={this.state.price}/> : null }

        { Object.keys(this.state.suggestedCategories).length > 0 ? <LfCategories suggestedCategories={ this.state.suggestedCategories } handleSuggestedCategoriesLF={ this.handleSuggestedCategoriesLF } /> : null}

        { this.state.lessThanFive ? <div className="cksButton"><label>Quick Walk<input type="checkbox" checked={ this.state.quickWalk } name="quickWalk" onChange={ this.handleQuickLf } /></label></div> : null }
      </div>
    )
  }
}

export default LittleFilter;
