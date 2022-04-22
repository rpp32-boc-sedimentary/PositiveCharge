const _ = require('underscore');

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
  console.log('data on price filter', data);
  data.forEach(item => {
    if (selectedFilter.free && !item.price) {
         priceFiltered.push(item);
    }
    if (selectedFilter[item.price]) {
      priceFiltered.push(item);
    }
  });
  return priceFiltered;
};

const filterOnCategories = (selectedFilter, data) => {
  console.log('selected filter', selectedFilter)
  if (!selectedFilter.food && !selectedFilter.museum && !selectedFilter.cafe && !selectedFilter.park && !selectedFilter.landmark) {
    return data;
  }
  let categoryFiltered = [];
  data.forEach(item => {
    console.log('item in filter', item)
    if (selectedFilter[item.category]) {
      categoryFiltered.push(item);
    }
  });
  return categoryFiltered;
};

const filterLfCategories = (selectedFilter, data) => {
  let anySelected = false;
  Object.values(selectedFilter).forEach(item => {
    if (item) {
      anySelected = true;
    }
  });
  if (!anySelected) {
    return data;
  }
  let filtered = [];
  data.forEach(item => {
    if (selectedFilter.food) {
      if (item.category === 'food') {
        filtered.push(item);
      }
    } else if (selectedFilter['food and cafes']) {
      if (item.category === 'food' || item.category === 'cafe') {
        filtered.push(item);
      }
    }
    if (selectedFilter.cultural) {
      //change 'landmarks & historical' later to 'landmarks & historical' with real data
      if (item.category === 'museum' || item.category === 'landmarks & historical') {
        filtered.push(item);
      }
    }
  })
  return filtered;
}

const filterOnDistance = (selectedTime, data) => {
  if (!selectedTime || selectedTime === 'All distances') {
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

const findSuggested = (data) => {
  // this generates dynamic button categories in an object format.
  let points = Object.keys(data);
  let generated = {};
  if (points.indexOf('food') >= 0 && points.indexOf('cafe') >= 0) {
    generated['food and cafes'] = false;
  } else if (points.indexOf('food') >= 0) {
    generated['food'] = false;
  }
  if (points.indexOf('museum') >= 0 && points.indexOf('landmarks & historical') >= 0) {
    generated['cultural'] = false;
  }
  return generated;
}

const filterQuickWalks = (selected, data) => {
  if (!selected) {
    return data;
  }
  let filtered = data.filter(item =>
    item.duration <= 5
  );
  return filtered;
};

const sortFunc = (sortVal, data) => {
  let compare;
  if (sortVal === 'Loves') {
    compare = (a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }
      return 0;
    };

  } else if (sortVal === 'Distance') {
    compare = (a, b) => {
      if (a.duration < b.duration) {
        return -1;
      }
      if (a.duration > b.duration) {
        return 1;
      }
      return 0;
    };
  }
  let sorted = data.sort(compare);
  return sorted;
};

// const addCategory = (data) => {
//   let allData = [];
//   _.each(data, (value, key) => {
//     value.businesses.forEach(business => {
//       if (business.distance > 1260) {
//         return;
//       } else {
//         business.category = key;
//         allData.push(business);
//       }
//     })
//   })
//   return allData;
// }

const addCategoryToYelp = (data) => {
  let yelpWithCategories = [];
  for (var key in data) {
    if (key === 'database') {
      continue;
    } else {
      data[key].businesses.forEach(business => {
        if (business.distance > 1260) {
          return;
        } else {
          business.category = key;
          yelpWithCategories.push(business);
        }
      });
    }
  }
  return yelpWithCategories;

}



module.exports = {
  filterOnPrice,
  findCategories,
  filterOnCategories,
  filterLfCategories,
  filterOnDistance,
  findSuggested,
  filterQuickWalks,
  sortFunc,
  addCategoryToYelp
}