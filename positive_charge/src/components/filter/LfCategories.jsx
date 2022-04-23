import React from 'react';
const _ = require('underscore');

const LfCategories = (props) => {

  return (

    _.map(props.suggestedCategories, (val, key) =>
      <div className="chButton item4 clickableElement">
        <label>
          <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesLF } readOnly/>
          <span>{ key }</span>
        </label>
      </div>
    )


  )
}

export default LfCategories;