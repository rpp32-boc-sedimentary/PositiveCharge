import React from 'react';
const _ = require('underscore');

const LfCategories = (props) => {

  return (
    <div>
      { _.map(props.suggestedCategories, (val, key) =>
        <label>
          { key }
          <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesLF } readOnly/>
        </label>
      )}
    </div>
  )
}

export default LfCategories;