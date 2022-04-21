import React from 'react';
import ReactDOM from 'react-dom';
import AllCategories from './AllCategories.jsx';
import BfCategories from './BfCategories.jsx';
const modalRoot = document.getElementById('bigFilter-portal');

class BigFilter extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {

    return ReactDOM.createPortal(
      <>
        <div className="bigModal">
          <div>Filters</div>
          <div>
           {this.props.distance !== '' ? this.props.distance : null }
          </div>
          <button onClick={ this.props.clearFilters }>Reset Filters</button>

          <div className="bigFilter">
            <div className="categoryHeader">Distance:</div>
            <label className="categories">
              5 min or less
              <input type="radio" value="5 min or less" checked={ this.props.distance === "5 min or less" } onChange={ this.props.handleDistance } />
            </label>
            <label className="categories">
              10 min or less
              <input type="radio" value="10 min or less" checked={ this.props.distance === "10 min or less" } onChange={ this.props.handleDistance } />
            </label>
            <label className="categories">
              15 min or less
              <input type="radio" value="15 min or less" checked={ this.props.distance === "15 min or less" } onChange={ this.props.handleDistance } />
            </label>
            <label className="categories">
              All distances
              <input type="radio" value="All distances" checked={ this.props.distance === "All distances" } onChange={ this.props.handleDistance } />
            </label>
          </div>

          <div className="categoryHeader">
            Suggested
          </div>
          <div className="bigFilter">
            { Object.keys(this.props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ this.props.suggestedCategories } handleSuggestedCategoriesBf={ this.props.handleSuggestedCategoriesBf } /> : null }

            { this.props.lessThanFive ? <label className="categories">Quick Walk (5 minutes or less)<input type="checkbox" name="quickWalk" checked={ this.props.quickWalk } onChange={ this.props.handleQuickBf } /></label> : null }
          </div>

          <div className="categoryHeader bigFilter">
            Price
            <label className="categories">
              Free
              <input type="checkbox" name="free" checked={ this.props.price.free } onChange={ this.props.handlePrice } />
            </label>
            <label className="categories">
              $
              <input type="checkbox" name="$" checked={ this.props.price.$ } onChange={ this.props.handlePrice } />
            </label>
            <label className="categories">
              $$
              <input type="checkbox" name="$$" checked={ this.props.price.$$ } onChange={ this.props.handlePrice } />
            </label>
            <label className="categories">
              $$$
              <input type="checkbox" name="$$$" checked={ this.props.price.$$$ } onChange={ this.props.handlePrice } />
            </label>
          </div>

          <div className="categoryHeader">Categories</div>
          <div className="bigFilter">
            { Object.keys(this.props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ this.props.categoriesChecked } handleAllCategories={ this.props.handleAllCategories } /> : null }
          </div>


          <button onClick={ this.props.manageModalState }>Cancel</button>
          <button onClick={ this.props.handleBigFilterApply }>Apply Filters</button>
        </div>
      </>,
      this.el

    )
  }

}



export default BigFilter;



