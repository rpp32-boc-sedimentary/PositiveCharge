import React from 'react';
const _ = require('underscore');

const returnCategory = (category) => {
  if (category === 'food') {
    return 'Food';
  } else if (category === 'cafe' || category === 'cafes') {
    return 'Cafes';
  } else if (category === 'museum' || 'museums') {
    return 'Museums';
  } else if (category === 'park' || category === 'parks') {
    return 'Parks';
  } else if (category === 'landmarks and historical' || category === 'landmarks & historical') {
    return 'Landmarks and Historical'
  }
}

const AllCategories = (props) => {

  if (Object.keys(props.categoriesChecked)[0] === 'undefined') {
    return (
      null
    )
  } else {
    return (
      <div>
        {_.map(props.categoriesChecked, (val, key) =>
          <div className="cksButton cksButtonWidth" key={ key }>
            <label>
              <input type="checkbox" name={ key } checked={ val } onChange={ props.handleAllCategories } />
              <span>{ key }</span>
            </label>
          </div>
        )}
      </div>
    )
  }
}

export default AllCategories;