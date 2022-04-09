const dummy = require('../dummyData/details.js');

exports.detailsModels = {

  grabview: async (poiId) => {
    return dummy.detailData;
  },

  lovePoi: async (poiId) => {
    dummy.detailData.poiLoves++;
    return dummy.detailData;
  },

  flagPoi: async (poiId) => {
    dummy.detailData.flagStatus = !dummy.detailData.flagStatus;
    return dummy.detailData;
  },

  loveExp: async (expId) => {
    dummy.detailData.experiences[expId].expLoves++;
    return dummy.detailData;
  },

  flagExp: async (expId) => {
    dummy.detailData.experiences[expId].flagStatus = !dummy.detailData.experiences[expId].flagStatus;
    return dummy.detailData;
  },

  addExperience: async (exp) => {
    dummy.detailData.experiences['4'] = {
      expId: 4,
      expLoves: 0,
      flagStatus: false,
      experience: exp,
      photos: null
    }
    return dummy.detailData;
  },

  deleteExperience: async (expId) => {
    delete dummy.detailData.experiences[expId];
    return dummy.detailData;
  }

}