
//look into filter method

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

module.exports = {
  filterOnPrice,
  findCategories,
  filterOnCategories,
}