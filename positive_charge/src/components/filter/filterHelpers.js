
const findCategories = (data) => {
  let categories = {};
  data.forEach(item => {
    categories[item.category] = true;
  });
  let catKeys = Object.keys(categories);
  let categoriesChecked = {};
  catKeys.forEach(key => {
    categoriesChecked[key] = '';
  });
  return categoriesChecked;
}

const filterOnPrice = (selectedFilter, data) => {
  if (!selectedFilter.free && !selectedFilter.$ && !selectedFilter.$$ && !selectedFilter.$$$) {
    return data;
  }
  let priceFiltered = [];
  data.forEach(item => {
    //need to filter free items in here
    if (selectedFilter[item.price]) {
      priceFiltered.push(item);
    }
  });
  return priceFiltered;
};

const filterOnCategories = (selectedFilter, data) => {
  if (!selectedFilter.food && !selectedFilter.museum && !selectedFilter.cafe && !selectedFilter.park && !selectedFilter['landmarks & historical']) {
    return data;
  }
  let categoryFiltered = [];
  data.forEach(item => {
    if (selectedFilter[item]) {
      categoryFiltered.push(item);
    }
  });
  return categoryFiltered;
};

const filterLfCategories = (selectedFilter, data) => {
  console.log('selected lfc filters', selectedFilter, 'data', data);
  let filtered = [];
  data.forEach(item => {
    if (selectedFilter.food) {
      if (item.category === 'food') {
        filtered.push(item);
      }
    } else if (selectedFilter['food and cafes']) {
      if (item.category === 'food' || item.category === 'cafe') {
        console.log('f and c')
        filtered.push(item);
      }
    }
    if (selectedFilter.cultural) {
      //change 'landmarks & historical' later to 'landmarks & historical' with real data
      if (item.category === 'museum' || item.category === 'landmarks & historical') {
        console.log('m and l')
        filtered.push(item);
      }
    }
  })
  return filtered;
}

const filterOnDistance = (selectedTime, data) => {
  if (selectedTime === 'All distances') {
    return data;
  }
  let timeObject = {
    '5 min or less': 5,
    '10 min or less': 10,
    '15 min or less': 15
  }
  let filtered = data.filter(item => {
    return item.duration <= Number(timeObject[selectedTime]);
  });
  return filtered;
}

//sorting function

module.exports = {
  filterOnPrice,
  findCategories,
  filterOnCategories,
  filterLfCategories,
  filterOnDistance
}