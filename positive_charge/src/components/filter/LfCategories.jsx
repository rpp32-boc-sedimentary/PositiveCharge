import React from 'react';
const _ = require('underscore');

const LfCategories = (props) => {

  return (
    <div className="cksButton">
      { _.map(props.suggestedCategories, (val, key) =>
        <label>
          <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesLF } readOnly/>
          <span>{ key }</span>
        </label>
      )}
    </div>
  )
}

export default LfCategories;