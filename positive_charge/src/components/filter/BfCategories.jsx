import React from 'react';
const _ = require('underscore');

const BfCategories = (props) => {

  return (
    <div>
      {_.map(props.suggestedCategories, (val, key) =>
        <div key={ key }>
          <label className="categories">
            {key}
            <input type="checkbox" name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesBf } readOnly />
          </label>
        </div>
      )}
    </div>
  )
};

export default BfCategories;