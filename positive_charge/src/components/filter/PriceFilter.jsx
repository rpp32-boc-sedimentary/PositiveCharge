import React, { useState } from 'react';

const PriceFilter = ({ priceModalState, setPriceModalState, managePriceModalState, price, setPrice, handlePrice, handlePriceApply }) => {


  return (
    <>
      { priceModalState ?
        <div>
            <form className='priceFilterModal' onSubmit={ handlePriceApply }>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='free' checked={price.free} onChange={ handlePrice } />
                  <span>Free</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$' checked={price.$} onChange={ handlePrice } />
                  <span>$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$' checked={price.$$} onChange={ handlePrice }  />
                  <span>$$</span>
                </label>
              </div>

              <div className='ckButton'>
                <label>
                  <input type='checkbox' name='$$$' checked={price.$$$} onChange={ handlePrice }  />
                  <span>$$$</span>
                </label>
              </div>

              <input type='submit' value='Save'/>
            </form>
        </div>
      : null }
    </>
  )
}

export default PriceFilter;

