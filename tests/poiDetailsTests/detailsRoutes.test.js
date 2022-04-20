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
  //  response.request._data
  describe("Getting the experiences from the DB", () => {
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

    test('should respond with object of experiences at that poi', async () => {
      const response = await request(mockApp)
      .get('/details/view?id=EjNI-dNAMrYxKgUIkqeqhg')
      expect(response.request.res.text).toEqual(expect.stringContaining("flag_status"))
    })
  })

  describe("Love or Flag Poi", () => {
    test("should respond with a status code of 201 for loving POI", async () => {
      const response = await request(mockApp)
      .post('/details/poi/love')
      .send({
        "name": "EjNI-dNAMrYxKgUIkqeqhg",
        "experience": "test"
      })
      .expect(201);
    })

    test('responds with json data type for loving POI', async () => {
      const response = await request(mockApp)
      .post('/details/poi/love')
      .send({
        "name": "EjNI-dNAMrYxKgUIkqeqhg",
        "experience": "test"
      })
      expect(response.request.res.socket._httpMessage._header).toEqual(expect.stringContaining("json"))
    })

    test("should respond with a status code of 201 for flagging POI", async () => {
      const response = await request(mockApp)
      .post('/details/poi/flag')
      .send({
        "name": "EjNI-dNAMrYxKgUIkqeqhg",
        "experience": "test"
      })
      .expect(201);
    })

    test('responds with json data type for flagging POI', async () => {
      const response = await request(mockApp)
      .post('/details/poi/flag')
      .send({
        "name": "EjNI-dNAMrYxKgUIkqeqhg",
        "experience": "test"
      })
      expect(response.request.res.socket._httpMessage._header).toEqual(expect.stringContaining("json"))
    })

    test('responds with poi_id', async () => {
      const response = await request(mockApp)
      .post('/details/poi/flag')
      .send({
        "name": "EjNI-dNAMrYxKgUIkqeqhg",
        "experience": "test"
      })
      expect(response.request._data.name).toBe("EjNI-dNAMrYxKgUIkqeqhg")
    })
  })

  describe('Love or Flag Experience', () => {
    test()
  })
})
