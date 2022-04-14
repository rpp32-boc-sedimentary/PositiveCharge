import React from 'react';

const CategoryButtons = (props) => {

  const generateCategories = () => {
    let points = Object.keys(props.categories);
    let generated = [];
    if (points.indexOf('food') >= 0 && points.indexOf('cafe') >= 0) {
      generated.push('food and cafes');
    } else if (points.indexOf('food') > 0) {
      generated.push('food');
    }
    if (points.indexOf('museum') > 0 && points.indexOf('landmarks & historical') > 0) {
      generated.push('cultural');
    }
    return generated;
  }

  let availableCategories = generateCategories();

  return (
    <div>
      {availableCategories.map(item =>
        <button value={ item } onClick={ props.handleCategoryButton }>{item}</button>
      )}
    </div>
  )
}

export default CategoryButtons;