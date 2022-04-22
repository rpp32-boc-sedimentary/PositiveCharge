import React from 'react';

const PriceFilter = (props) => {

  const renderDropDown = () => {
    return (
        <form className='priceFilterModal' onSubmit={ props.handlePriceApply }>
          <div className='cksButton'>
            <label>
              <input type='checkbox' name='free' checked={props.price.free} onChange={ props.handlePrice } />
              <span>Free</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$' checked={props.price.$} onChange={ props.handlePrice } />
              <span>$</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$$' checked={props.price.$$} onChange={ props.handlePrice }  />
              <span>$$</span>
            </label>
          </div>

          <div className='cksButton'>
            <label>
              <input type='checkbox' name='$$$' checked={props.price.$$$} onChange={ props.handlePrice }  />
              <span>$$$</span>
            </label>
          </div>
          <input type='submit' value='Save'/>
        </form>
    )
  }


  return (

    <div className="dropdown-container">
      <div className='dropdown-trigger'>
        <button onClick={ props.handlePriceModalState }>
          Price
        </button>
          { props.priceModalState && renderDropDown() }
      </div>
    </div>

  )
}

export default PriceFilter;

