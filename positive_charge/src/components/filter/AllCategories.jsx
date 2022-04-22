import React from 'react';
const _ = require('underscore');

const AllCategories = (props) => {

  if (Object.keys(props.categoriesChecked)[0] === 'undefined') {
    return (
      null
    )
  } else {
    return (
      <div>
        {_.map(props.categoriesChecked, (val, key) =>
          <div className="cksButton cksButtonWidth">
            <label>
              <input type="checkbox" key={ key } name={ key } checked={ val } onChange={ props.handleAllCategories } />
              <span>{ key }</span>
            </label>
          </div>
        )}
      </div>
    )
  }
}

export default AllCategories;