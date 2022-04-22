import React from 'react';
import ReactDOM from 'react-dom';
import AllCategories from './AllCategories.jsx';
import BfCategories from './BfCategories.jsx';
import Button from '@mui/material/Button';
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
          <div className="bigFilterSection">
            <Button style={{ maxWidth: '90px', maxHeight: '30px' }} variant="contained" onClick={ this.props.manageModalState }>Cancel</Button>
            <div className="categoryHeader">Filters</div>
            <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" onClick={ this.props.clearFilters }>Reset Filters</Button>
          </div>

          <div>
           {this.props.distance !== '' ? this.props.distance : null }
          </div>
          <hr/>
          <div className="categoryHeader">Maximum Walking Duration</div>
          <div className="bigFilterSection">
            <div>
              <label className="categories">
                <input type="radio" value="5 min or less" checked={ this.props.distance === "5 min or less" } onChange={ this.props.handleDistance } />
                <span>5 Minutes</span>
              </label>
            </div>
            <div>
              <label className="categories">
                <input type="radio" value="10 min or less" checked={ this.props.distance === "10 min or less" } onChange={ this.props.handleDistance } />
                <span>10 Minutes</span>
              </label>
            </div>
            <div>
              <label className="categories">
                <input type="radio" value="15 min or less" checked={ this.props.distance === "15 min or less" } onChange={ this.props.handleDistance } />
                <span>15 Minutes</span>
              </label>
            </div>
            <div>
              <label className="categories">
                <input type="radio" value="All distances" checked={ this.props.distance === "All distances" } onChange={ this.props.handleDistance } />
                <span>All</span>
              </label>
            </div>
          </div>
          <hr/>
          <div className="categoryHeader">Popular</div>
          <div className="bigFilterSection">
            <div>
              { Object.keys(this.props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ this.props.suggestedCategories } handleSuggestedCategoriesBf={ this.props.handleSuggestedCategoriesBf } /> : null }

              { this.props.lessThanFive ? <label className="categories">Quick Walk (5 minutes or less)<input type="checkbox" name="quickWalk" checked={ this.props.quickWalk } onChange={ this.props.handleQuickBf } /></label> : null }
            </div>
          </div>
          <hr/>
          <div className="categoryHeader">Price</div>
          <div className="bigFilterSection">
            <div className="cksButton">
              <label className="categories">
                <input type="checkbox" name="free" checked={ this.props.price.free } onChange={ this.props.handlePrice } />
                <span>Free</span>
              </label>
            </div>
            <div className="cksButton">
              <label className="categories">
                <input type="checkbox" name="$" checked={ this.props.price.$ } onChange={ this.props.handlePrice } />
                <span>$</span>
              </label>
            </div>
            <div className="cksButton">
              <label className="categories">
                <input type="checkbox" name="$$" checked={ this.props.price.$$ } onChange={ this.props.handlePrice } />
                <span>$$</span>
              </label>
            </div>
            <div className="cksButton">
              <label className="categories">
                <input type="checkbox" name="$$$" checked={ this.props.price.$$$ } onChange={ this.props.handlePrice } />
                <span>$$$</span>
              </label>
            </div>
          </div>
          <hr/>
          <div className="categoryHeader">Categories</div>
          <div className="bigFilterSection">
            { Object.keys(this.props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ this.props.categoriesChecked } handleAllCategories={ this.props.handleAllCategories } /> : null }
          </div>
          <hr/>
          <div className="bigFilterSection">
            <Button style={{ maxWidth: '180px', maxHeight: '30px' }} variant="contained" onClick={ this.props.handleBigFilterApply }>Apply Filters</Button>
          </div>
        </div>
      </>,
      this.el
    )
  }
}



export default BigFilter;



