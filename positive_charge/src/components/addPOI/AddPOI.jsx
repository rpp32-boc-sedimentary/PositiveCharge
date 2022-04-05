import { React, useState, useEffect } from 'react'

function AddPOI(props) {
  const [pointName, setPointName] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [photo, setPhoto] = useState('')

  return (
    <div className="add-poi-form-container">
      <div className="add-poi-form-wrapper">
        <form>
          <input
          type="text"
          className="text-input"
          id="point-name-input"
          placeholder=""
          value={pointName}
          onChange={e => {setPointName(e.target.value)}}></input>
          <label htmlFor="point-name-input">Name of Point of Interest</label>
          <input
          type="text"
          className="text-input"
          id="location-input"
          placeholder=""
          value={location}
          onChange={e => {setLocation(e.target.value)}}></input>
          <label htmlFor="point-name-input">Location</label>
          <select id="category-select">
            <option value="food">Food</option>
            <option value="active">Active</option>
            <option value="other">Other</option>
          </select>
          type="text"
          className="text-input"
          id="category-input"
          placeholder=""
          value={location}
          onChange={e => {setLocation(e.target.value)}}></input>
          <label htmlFor="point-name-input">Category</label>
        </form>
      </div>
    </div>
  )
}