import React from 'react';
const _ = require('underscore');

const AllCategories = (props) => {

  if (Object.keys(props.categoriesChecked)[0] === 'undefined') {
    return (
      null
    )
  } else {
    return (
      _.map(props.categoriesChecked, (val, key) =>
        <label className="categories">
          { key }
          <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleAllCategories } />
        </label>
      )

    )
  }
}

export default AllCategories;