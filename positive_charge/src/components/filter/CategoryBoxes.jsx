import React from 'react';
const _ = require('underscore');

const CategoryBoxes = (props) => {
  console.log('props', props);
  //need category to equal categoriesChecked.key
  return (
    _.map(props.categoriesChecked, (val, key) =>
      <label>
        { key }
        <input type="checkbox" name={ key } checked={ val } onChange={ props.handleDynamicCategories } />
      </label>
    )
  )
}

export default CategoryBoxes;