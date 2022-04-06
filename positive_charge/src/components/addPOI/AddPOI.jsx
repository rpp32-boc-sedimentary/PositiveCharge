import React, { useState } from 'react'
import axios from 'axios'

function AddPOI () {
  const [pointName, setPointName] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('food')
  const [price, setPrice] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    let data = {
      name: pointName,
      location,
      category,
      price
    }
    if (validatePoiInfo(data)) {
      axios.post('/addPOI', data)
      .then(response => {
        console.log('response in component', response)
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  //placeholder validation function
  function validatePoiInfo(data) {
    return true
  }

  return (
    <div className="add-poi-form-container">
      <div className="add-poi-form-wrapper">
        <h1>Add a Point of Interest</h1>
        <form onSubmit={(e) => handleSubmit(e)}>

        <label htmlFor="point-name-input">Name: </label>
        <input
          type="text"
          className="text-input"
          id="point-name-input"
          placeholder=""
          value={pointName}
          onChange={e => setPointName(e.target.value)}
          >
          </input><br></br><br></br>

          <label htmlFor="point-name-input">Location: </label>
          <input
          type="text"
          className="text-input"
          id="location-input"
          placeholder=""
          value={location}
          onChange={e => setLocation(e.target.value)}
          ></input><br></br><br></br>

          <label htmlFor="category-select">Category: </label>
          <select id="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="active">Active</option>
            <option value="culture">Culture</option>
            <option value="other">Other</option>
          </select><br></br><br></br>

          <h3>Price</h3>
          <input type="radio" className="radio-button price-input" name="price" id="free" value="free" onClick={e => setPrice(e.target.value)}></input>
          <label htmlFor="free">Free</label>

          <input type="radio" className="radio-button price-input" name="price" id="$" value="$" onClick={e => setPrice(e.target.value)}></input>
          <label htmlFor="$">$</label>

          <input type="radio" className="radio-button price-input" name="price" id="$$" value="$$" onClick={e => setPrice(e.target.value)}></input>
          <label htmlFor="$$">$$</label>

          <input type="radio" className="radio-button price-input" name="price" id="$$$" value="$$$" onClick={e => setPrice(e.target.value)}></input>
          <label htmlFor="$$$">$$$</label><br></br><br></br>

          <input type="submit" value="Add POI"></input>
          <br></br><br></br>
        </form>
      </div>
    </div>
  )
}

export default AddPOI;