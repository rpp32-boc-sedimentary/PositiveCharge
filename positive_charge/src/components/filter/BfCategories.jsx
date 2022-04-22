import React from 'react';
const _ = require('underscore');

const BfCategories = (props) => {

  return (
    <div>
      {_.map(props.suggestedCategories, (val, key) =>
        <div className="cksButton" key={ key }>
          <label className="categories">
            <input type="checkbox" name={ key } checked={ val } onChange={ props.handleSuggestedCategoriesBf } readOnly />
            <span>{ key }</span>
          </label>
        </div>
      )}
    </div>
  )
};

export default BfCategories;
