const {jest} = require('@jest/globals');
const request = require('supertest');
const makeApp = require('../../servers/index.js');
const { pool } = require('../../database/models.js');
require('regenerator-runtime/runtime');

const addNewPoi = jest.fn()
const grabview = jest.fn();
const lovePoi = jest.fn()
const flagPoi = jest.fn()
const loveExp = jest.fn()
const flagExp = jest.fn()
const addExperience = jest.fn()
const deleteExperience = jest.fn()

// mocking DB functions
const mockApp = makeApp({
  addNewPoi,
  grabview,
  lovePoi,
  flagPoi,
  loveExp,
  flagExp,
  addExperience,
  deleteExperience
})

// mocking server routes
const app = makeApp(pool)

describe("Testing the Details Server Route Functionality", () => {

  beforeEach(() => {
    grabview.mockReset()
    grabview.mockResolvedValue(0)
    addNewPoi.mockReset()
    addNewPoi.mockResolvedValue(0)
    lovePoi.mockReset()
    lovePoi.mockResolvedValue()
    flagPoi.mockReset()
    flagPoi.mockResolvedValue(0)
    loveExp.mockReset()
    loveExp.mockResolvedValue(0)
    flagExp.mockReset()
    flagExp.mockResolvedValue(0)
    addExperience.mockReset()
    addExperience.mockResolvedValue(0)
  })

  afterEach(() => {

  })

  // 'Acfd4Rqr97p3j5ICb5wBAQ'
  describe("When the modal is clicked from /moreDetails", () => {

    test("should respond with a status code of 201", async () => {
      const response = await request(mockApp)
      .get('/details/view')
      .expect(201);
    })

    test('responds with json data type', async () => {
      const response = await request(mockApp)
      .get('/details/view')
      .expect('Content-Type', /json/)
    })
  })

  describe("Love or Flag Poi", () => {

    test("should respond with a status code of 201", async () => {
      const response = await request(mockApp)
      .put('/details/poi/love')
      .expect(201);
    })

    test('responds with json data type', async () => {
      const response = await request(mockApp)
      .put('/details/poi/love')
      .expect('Content-Type', /json/)
    })
  })

})