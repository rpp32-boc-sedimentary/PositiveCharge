import React from 'react';

const BigFilter = (props) => {


  return(
    <>
      <div className="bigModal">
        <div>Filters</div>
        <div>
         {props.distance !== '' ? props.distance : null }
        </div>
        <button onClick={ props.clearFilters }>Reset Filters</button>

        <div className="bigFilter" onChange={ props.handleDistance }>
          <div className="categoryHeader">Distance:</div>
          <label>
            2 min less
            <input type="radio" value="2 min or less" checked={ props.distance === "2 min or less" } />
          </label>
          <label>
            5 min or less
            <input type="radio" value="5 min or less" checked={ props.distance === "5 min or less" } />
          </label>
          <label>
            10 min or less
            <input type="radio" value="10 min or less" checked={ props.distance === "10 min or less" } />
          </label>
          <label>
            All distances
            <input type="radio" value="All distances" checked={ props.distance === "All distances" } />
          </label>
        </div>

        <div className="categoryHeader bigFilter">
          Price
          <label>
            Free
            <input type="checkbox" name="free" checked={ props.price.free } onChange={ props.handlePrice } />
          </label>
          <label>
            $
            <input type="checkbox" name="$" checked={ props.price.$ } onChange={ props.handlePrice } />
          </label>
          <label>
            $$
            <input type="checkbox" name="$$" checked={ props.price.$$ } onChange={ props.handlePrice } />
          </label>
          <label>
            $$$
            <input type="checkbox" name="$$$" checked={ props.price.$$$ } onChange={ props.handlePrice } />
          </label>
        </div>

        <div className="categoryHeader">Suggested</div>
        <div className="bigFilter">
          <label>
            Good For Kids
            <input type="checkbox" name="Good for kids" />
          </label>
          <label>
            Dogs Allowed
            <input type="checkbox" />
          </label>
        </div>

        <button onClick={ props.manageModalState }>Cancel</button>
        <button onClick={ props.handleBigFilterApply }>Apply Filters</button>
      </div>
    </>

  )
}



export default BigFilter;



