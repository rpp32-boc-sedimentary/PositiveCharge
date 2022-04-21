import React from 'react';
const _ = require('underscore');

const LfCategories = (props) => {

  return (
    <div>
      { _.map(props.suggestedCategories, (val, key) =>
        <label>
          { key }
          <input type="checkbox" name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesLF } />
        </label>
      )}
    </div>
  )
}

export default LfCategories;