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
    grabview.mockResolvedValue({})
    addNewPoi.mockReset()
    addNewPoi.mockResolvedValue(0)
    lovePoi.mockReset()
    lovePoi.mockResolvedValue(0)
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

    it("should respond with a status code of 201", async () => {
      const response = await request(mockApp)
      .get('/details/view');
      expect(response.statusCode).toBe(201);
    })

    test('responds with json data type', async () => {
      const response = await request(mockApp)
      .get('/details/view')
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })
    test("should respond with a status code of 500 when adding a query param", async () => {
      const response = await request(mockApp)
      .get('/details/view/?id=vWsEv2nRmlNzUunfNBt7ng')
      expect(response.statusCode).toEqual(500)
    })
    xtest("should respond with a json object containg the user id", async () => {
      for (let i = 0; i < 10; i++) {
        createUser.mockReset()
        createUser.mockResolvedValue(i)
        const response = await request(app).post("/users").send({ username: "username", password: "password" })
        expect(response.body.userId).toBe(i)
      }
    })

    xtest("should respond with a 200 status code", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.statusCode).toBe(200)
    })
    xtest("should specify json in the content type header", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
    })
    xtest("response has userId", async () => {
      const response = await request(app).post("/users").send({
        username: "username",
        password: "password"
      })
      expect(response.body.userId).toBeDefined()
    })
  })

  xdescribe("when the username and password is missing", () => {
    test("should respond with a status code of 400", async () => {
      const bodyData = [
        {username: "username"},
        {password: "password"},
        {}
      ]
      for (const body of bodyData) {
        const response = await request(app).post("/users").send(body)
        expect(response.statusCode).toBe(400)
      }
    })
  })

})