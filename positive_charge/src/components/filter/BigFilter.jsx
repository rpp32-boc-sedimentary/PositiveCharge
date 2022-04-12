import React, { useState }  from 'react';
import ReactDOM from 'react-dom';

const BigFilter = ({ modalState, setModalState, manageModalState, distance, setDistance, handleDistance, price, setPrice, handlePrice, clearFilters }) => {


  return(
    <>
    { modalState ?
      <div className="bigModal">
        <div>Filters</div>
        <div>
         {distance !== '' ? distance : null }
        </div>
        <button onClick={ clearFilters }>Reset Filters</button>

        <div className="bigFilter" onChange={ handleDistance }>
          <div className="categoryHeader">Distance:</div>
          <label>
            2 min less
            <input type="radio" value="2 min or less" checked={ distance === "2 min or less" } />
          </label>
          <label>
            5 min or less
            <input type="radio" value="5 min or less" checked={ distance === "5 min or less" } />
          </label>
          <label>
            10 min or less
            <input type="radio" value="10 min or less" checked={ distance === "10 min or less" } />
          </label>
          <label>
            All distances
            <input type="radio" value="All distances" checked={ distance === "All distances" } />
          </label>
        </div>

        <div className="categoryHeader bigFilter">
          Price
          <label>
            Free
            <input type="checkbox" name="free" checked={ price.free } onChange={ handlePrice } />
          </label>
          <label>
            $
            <input type="checkbox" name="$" checked={ price.$ } onChange={ handlePrice } />
          </label>
          <label>
            $$
            <input type="checkbox" name="$$" checked={ price.$$ } onChange={ handlePrice } />
          </label>
          <label>
            $$$
            <input type="checkbox" name="$$$" checked={ price.$$$ } onChange={ handlePrice } />
          </label>
        </div>

        <div className="categoryHeader">Suggested</div>
        <div className="bigFilter">
          <label>
            Open Now
            <input type="checkbox" name="OpenNow" />
          </label>
          <label>
            Good For Kids
            <input type="checkbox" name="Good for kids" />
          </label>
          <label>
            Dogs Allowed
            <input type="checkbox" />
          </label>
        </div>

        <button onClick={ manageModalState }>Cancel</button>
        <button>Apply Filters</button>
      </div>
      : null }
    </>

  )
}



export default BigFilter;



