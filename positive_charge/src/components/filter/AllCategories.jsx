import React from 'react';
const _ = require('underscore');

const AllCategories = (props) => {

  return (
    _.map(props.categoriesChecked, (val, key) =>
      <label className="categories">
        { key }
        <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleAllCategories } />
      </label>
    )
  )
};

export default AllCategories;