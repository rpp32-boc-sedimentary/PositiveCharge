import React from 'react';
const _ = require('underscore');

const LfCategories = (props) => {

  return (
    _.map(props.suggestedCategories, (val, key) =>
      <div className="chButton" key= { key }>
        <label>
          <input type="checkbox" name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesLF } readOnly/>
          <span>{ key }</span>
        </label>
      </div>
    )
  )
}

export default LfCategories;