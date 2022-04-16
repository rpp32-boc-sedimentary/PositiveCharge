import React from 'react';
const _ = require('underscore');

const BfCategories = (props) => {

  return (
    <div>
      {_.map(props.suggestedCategories, (val, key) =>
        <div>
          <label className="categories">
            {key}
            <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesBf } />
          </label>
        </div>
      )}
    </div>
  )
};

export default BfCategories;