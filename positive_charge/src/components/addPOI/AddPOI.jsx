import React, { useState } from 'react'

function AddPOI () {
  const [pointName, setPointName] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('Food')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')

  return (
    <div className="add-poi-form-container">
      <div className="add-poi-form-wrapper">
        <h1>Add Point of Interest</h1>
        <form>

        <label htmlFor="point-name-input">Name of Point of Interest: </label>
        <input
          type="text"
          className="text-input"
          id="point-name-input"
          placeholder=""
          value={pointName}
          onChange={e => {setPointName(e.target.value)}}
          >
          </input><br></br>

          <label htmlFor="point-name-input">Location: </label>
          <input
          type="text"
          className="text-input"
          id="location-input"
          placeholder=""
          value={location}
          onChange={e => {setLocation(e.target.value)}}
          ></input><br></br>

          <label htmlFor="category-select">Category: </label>
          <select id="category-select"
          value={category}
          onChange={e => {setCategory(e.target.value)}}>
            <option value="food">Food</option>
            <option value="active">Active</option>
            <option value="culture">Culture</option>
            <option value="other">Other</option>
          </select><br></br>

          <h3>Price</h3>
          <input type="radio" className="radio-button price-input" name="price" id="free" value="free"></input>
          <label htmlFor="free">Free</label>

          <input type="radio" className="radio-button price-input" name="price" id="$" value="$"></input>
          <label htmlFor="$">$</label>

          <input type="radio" className="radio-button price-input" name="price" id="$$" value="$$"></input>
          <label htmlFor="$$">$$</label>

          <input type="radio" className="radio-button price-input" name="price" id="$$$" value="$$$"></input>
          <label htmlFor="$$$">$$$</label><br></br>
          
        </form>
      </div>
    </div>
  )
}

export default AddPOI;