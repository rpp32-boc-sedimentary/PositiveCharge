import React from 'react';
import BigFilter from './BigFilter.jsx';
import PriceFilter from './PriceFilter.jsx';
import LfCategories from './LfCategories.jsx';
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
      modifiedData: [],
      filteredData: [],
      lessThanFive: false,
      quickWalk: false,
      dataFromDom: [],
      userPois: [],
      filteredUserPois: [],
      sponsoredPois: [],
      filteredSponsored: [],
      combinedFiltered: [],
      showMore: false,
    }

    this.handleBigModalState = this.handleBigModalState.bind(this);
    this.handlePriceModalState = this.handlePriceModalState.bind(this);

    this.handleShowMore = this.handleShowMore.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDistance = this.handleDistance.bind(this);
    this.handleAllCategories = this.handleAllCategories.bind(this);
    this.handleSuggestedCategoriesBf = this.handleSuggestedCategoriesBf.bind(this);
    this.handleSuggestedCategoriesLF = this.handleSuggestedCategoriesLF.bind(this);
    this.handleQuickLf = this.handleQuickLf.bind(this);
    this.handleQuickBf = this.handleQuickBf.bind(this);
    this.handleSort = this.handleSort.bind(this);

    this.handleBigFilterApply = this.handleBigFilterApply.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
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


  handleShowMore = () => {
    let showMoreStatus = this.state.showMore;
    let showThisMany;
    this.setState({
      showMore: !showMoreStatus
    }, () => {
      if (!this.state.showMore) {
        showThisMany = this.state.combinedFiltered.slice(0, 5);
      } else {
        showThisMany = this.state.combinedFiltered.slice(0, 20);
      }
      this.props.changeDisplay(showThisMany);
    });
    return false;
  }

  handleSort = (e) => {
    let chosen = e.target.value;
    this.setState({
      sortVal: chosen
    }, () => {
      this.applyFilters();
    })
    return false;
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
    return false;
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
    return false;
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
    return false;
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
    let filtered = helpers.filterOnPrice(this.state.price, this.state.filteredData);
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

    const filtersChosen = {
      price: this.state.price,
      categoriesChecked: this.state.categoriesChecked,
      suggestedCategories: this.state.suggestedCategories,
      distance: this.state.distance,
      quickWalk: this.state.quickWalk,
      sortVal: this.state.sortVal
    };

    let filteredUserPois;
    let filteredSponsored;
    if (this.state.userPois.length) {
      filteredUserPois = helpers.applyAllFilters(filtersChosen, this.state.userPois);
    } else {
      filteredUserPois = [];
    }
    if (this.state.sponsoredPois.length) {
      filteredSponsored = helpers.applyAllFilters(filtersChosen, this.state.sponsoredPois)
    } else {
      filteredSponsored = [];
    }
    let filteredData = helpers.applyAllFilters(filtersChosen, this.state.modifiedData);
    let combinedData = filteredSponsored.concat(filteredUserPois, filteredData);

    let showFive = combinedData.slice(0, 5);
    let showTwenty = combinedData.slice(0, 20);
    if (this.state.showMore) {
      this.props.changeDisplay(showTwenty);
    } else {
      this.props.changeDisplay(showFive);
    }
    this.setState({
      filteredData,
      filteredUserPois,
      filteredSponsored,
      combinedFiltered: combinedData
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

  componentDidMount = () => {
    let data = this.props.allData;
    let userPois = data.database;
    let sponsoredPois = data.sponser;
    delete data.all;
    delete data.dist;
    delete data.flag;
    delete data.lat;
    delete data.long;
    let addedCategories = helpers.addCategoryToYelp(data);
    let addedDurations = helpers.walkTime(addedCategories);
    if (addedDurations.lessThanFive) {
      this.setState({
        lessThanFive: true
      })
    }
    let userPoisWithDuration;
    let sponsoredPoisWithDuration;
    if (userPois) {
      userPoisWithDuration = helpers.walkTime(userPois);
    } else {
      userPoisWithDuration = [];
    }

    if (sponsoredPois) {
      sponsoredPoisWithDuration = helpers.walkTime(sponsoredPois);
    } else {
      sponsoredPoisWithDuration = [];
    }
    this.setInitialState(sponsoredPoisWithDuration, userPoisWithDuration, addedDurations);
  }

  setInitialState = (sponsored, userAdded, yelpData) => {
    let allData = sponsored.concat(userAdded, yelpData);
    let lessThanFive = false;
    allData.forEach(item => {
      if (item.duration <= 5) {
        lessThanFive = true;
      }
    });
    let categoriesChecked = helpers.findCategories(allData);
    let suggestedCategories = helpers.findSuggested(categoriesChecked);
    this.setState({
      userPois: userAdded,
      filteredUserPois: userAdded,
      sponsoredPois: sponsored,
      filteredSponsored: sponsored,
      filteredData: yelpData,
      modifiedData: yelpData,
      categoriesChecked,
      suggestedCategories,
      lessThanFive,
      combinedFiltered: allData
    });
  };


  render() {

    return (
      <div className="smallFilter">

        <select className="sortBtn" name="category" onChange={ this.handleSort }>
          <option>Loves</option>
          <option>Distance</option>
        </select>

        { this.state.filteredData.length > 5 ? <button className="showBtn" onClick={this.handleShowMore}>{ this.state.showMore ? "Show Less" : "Show More"}</button> : null }

        <button className="sfBtn" onClick={ this.handleBigModalState }>More Filters</button>
        { this.state.modalState ? <BigFilter modalState={this.state.modalState} manageModalState={ this.handleBigModalState } distance = { this.state.distance } handleDistance={ this.handleDistance } price={ this.state.price } handlePrice={ this.handlePrice } handleBigFilterApply={ this.handleBigFilterApply } clearFilters={ this.clearFilters } categoriesChecked={ this.state.categoriesChecked } handleAllCategories={ this.handleAllCategories } suggestedCategories=
        { this.state.suggestedCategories } handleSuggestedCategoriesBf={ this.handleSuggestedCategoriesBf } lessThanFive={ this.state.lessThanFive } quickWalk={ this.state.quickWalk } handleQuickBf={ this.handleQuickBf } /> : null }

        <button className="priceBtn" onClick={ this.handlePriceModalState }>Price</button>
        { this.state.priceModalState ?  <PriceFilter priceModalState={ this.handlePriceModalState } handlePrice={ this.handlePrice } handlePriceApply={ this.handlePriceApply } price={this.state.price}/> : null }

        { Object.keys(this.state.suggestedCategories).length ? <LfCategories suggestedCategories={ this.state.suggestedCategories } handleSuggestedCategoriesLF={ this.handleSuggestedCategoriesLF } /> : null}

        { this.state.lessThanFive ? <div className="chButton"><label><input type="checkbox" checked={ this.state.quickWalk } name="quickWalk" onChange={ this.handleQuickLf } /><span>Quick Walk</span></label></div> : null }
      </div>
    )
  }
}

export default LittleFilter;

// findTimeToTravel = (allData) => {
//   let starting = this.props.userLocation;
//   axios.post('/filter/walkingTime', {
//     data: {
//       starting,
//       data: allData
//     }
//   })
//     .then(data => {
//       this.setState({
//         modifiedData: data.data.all,
//         filteredData: data.data.all,
//         lessThanFive: data.data.lessThanFive
//       }, () => {
//         let categoriesChecked = helpers.findCategories(this.state.modifiedData);
//         let suggestedCategories = helpers.findSuggested(categoriesChecked);
//         this.setState({
//           categoriesChecked,
//           suggestedCategories
//         });
//       });
//     })
//     .catch(err => {
//       console.log('error sending', err)
//     })
// }