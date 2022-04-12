import React from 'react';

const PriceFilter = (props) => {

  return (
    <>
        <div>
            <form className='priceFilterModal' onSubmit={ props.handlePriceApply }>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='free' checked={props.price.free} onChange={ props.handlePrice } />
                  <span>Free</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$' checked={props.price.$} onChange={ props.handlePrice } />
                  <span>$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$' checked={props.price.$$} onChange={ props.handlePrice }  />
                  <span>$$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$$' checked={props.price.$$$} onChange={ props.handlePrice }  />
                  <span>$$$</span>
                </label>
              </div>

              <input type='submit' value='Save'/>
            </form>
        </div>
    </>
  )
}

export default PriceFilter;

