const dummy = require('../dummyData/details.js');

exports.detailsModels = {

  grabview: async (poiId) => {
    return dummy.detailData;
  },

  lovePoi: async (poiId) => {
    dummy.detailData.poiLoves++;
    return dummy.detailData;
  },

  flagPoi: async () => {
    dummy.detailData.flagStatus = !dummy.detailData.flagStatus;
    return dummy.detailData;
  },

  loveExp: async () => {

  },

  flagExp: async () => {

  },

  addExperience: async () => {

  },

  deleteExperience: async () => {

  }

}