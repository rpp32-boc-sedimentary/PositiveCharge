import React from 'react';
import AllCategories from './AllCategories.jsx';
import BfCategories from './BfCategories.jsx';

const BigFilter = (props) => {


  return(
    <>
      <div className="bigModal">
        <div>Filters</div>
        <div>
         {props.distance !== '' ? props.distance : null }
        </div>
        <button onClick={ props.clearFilters }>Reset Filters</button>

        <div className="bigFilter">
          <div className="categoryHeader">Distance:</div>
          <label className="categories">
            5 min or less
            <input type="radio" value="5 min or less" checked={ props.distance === "5 min or less" } onChange={ props.handleDistance } />
          </label>
          <label className="categories">
            10 min or less
            <input type="radio" value="10 min or less" checked={ props.distance === "10 min or less" } onChange={ props.handleDistance } />
          </label>
          <label className="categories">
            15 min or less
            <input type="radio" value="15 min or less" checked={ props.distance === "15 min or less" } onChange={ props.handleDistance } />
          </label>
          <label className="categories">
            All distances
            <input type="radio" value="All distances" checked={ props.distance === "All distances" } onChange={ props.handleDistance } />
          </label>
        </div>

        <div className="categoryHeader">
          Suggested
        </div>
        <div className="bigFilter">
          { Object.keys(props.suggestedCategories).length > 0 ? <BfCategories suggestedCategories={ props.suggestedCategories } handleSuggestedCategoriesBf={ props.handleSuggestedCategoriesBf } /> : null }

          { props.lessThanFive ? <label className="categories">Quick Walk (5 minutes or less)<input type="checkbox" name="quickWalk" checked={ props.quickWalk } onChange={ props.handleQuickBf } /></label> : null }
        </div>

        <div className="categoryHeader bigFilter">
          Price
          <label className="categories">
            Free
            <input type="checkbox" name="free" checked={ props.price.free } onChange={ props.handlePrice } />
          </label>
          <label className="categories">
            $
            <input type="checkbox" name="$" checked={ props.price.$ } onChange={ props.handlePrice } />
          </label>
          <label className="categories">
            $$
            <input type="checkbox" name="$$" checked={ props.price.$$ } onChange={ props.handlePrice } />
          </label>
          <label className="categories">
            $$$
            <input type="checkbox" name="$$$" checked={ props.price.$$$ } onChange={ props.handlePrice } />
          </label>
        </div>

        <div className="categoryHeader">Categories</div>
        <div className="bigFilter">
          { Object.keys(props.categoriesChecked).length > 0 ? <AllCategories categoriesChecked={ props.categoriesChecked } handleAllCategories={ props.handleAllCategories } /> : null }
        </div>


        <button onClick={ props.manageModalState }>Cancel</button>
        <button onClick={ props.handleBigFilterApply }>Apply Filters</button>
      </div>
    </>

  )
}



export default BigFilter;



