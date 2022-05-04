
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
  if (!selectedFilter.food && !selectedFilter.museum && !selectedFilter.cafe && !selectedFilter.park && !selectedFilter.landmark) {
    return data;
  }
  let categoryFiltered = [];
  data.forEach(item => {
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
    if (selectedFilter.Food) {
      if (item.category === 'food') {
        filtered.push(item);
      }
    } else if (selectedFilter['Food and Cafes']) {
      if (item.category === 'food' || item.category === 'cafe') {
        filtered.push(item);
      }
    }
    if (selectedFilter.Cultural) {
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
  let points = Object.keys(data);
  let generated = {};
  if (points.indexOf('food') >= 0 && points.indexOf('cafe') >= 0) {
    generated['Food and Cafes'] = false;
  } else if (points.indexOf('food') >= 0) {
    generated['Food'] = false;
  }
  if (points.indexOf('museum') >= 0 && points.indexOf('landmarks & historical') >= 0) {
    generated['Cultural'] = false;
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

const addCategoryToYelp = (data) => {
  let yelpWithCategories = [];
  for (var key in data) {
    if (key === 'database'|| key === 'sponser') {
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
};

const walkTime = (data) => {
  data.forEach(item => {
    if (item.distance) {
      item.duration = Math.round((item.distance/84));
    }
  })
  return data;
};

const applyAllFilters = (filters, pois) => {
  let filtered;
  filtered = filterOnPrice(filters.price, pois);
  filtered = filterOnCategories(filters.categoriesChecked, filtered);
  filtered = filterLfCategories(filters.suggestedCategories, filtered);
  filtered = filterOnDistance(filters.distance, filtered);
  filtered = filterQuickWalks(filters.quickWalk, filtered);
  filtered = sortFunc(filters.sortVal, filtered);
  return filtered;
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
  addCategoryToYelp,
  walkTime,
  applyAllFilters
}