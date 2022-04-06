import * as React from 'react'

function AddPOI () {
  // const [pointName, setPointName] = useState('')
  // const [location, setLocation] = useState('')
  // const [category, setCategory] = useState('')
  // const [price, setPrice] = useState('')
  // const [photo, setPhoto] = useState('')

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
          // value={pointName}
          // onChange={e => {setPointName(e.target.value)}}
          >

          </input><br></br>

          <label htmlFor="point-name-input">Location: </label>
          <input
          type="text"
          className="text-input"
          id="location-input"
          placeholder=""
          // value={location}
          // onChange={e => {setLocation(e.target.value)}}
          ></input><br></br>

          <label htmlFor="category-select">Category: </label>
          <select id="category-select"
          // value={category}
          // placeholder="Please select a category"
          // onChange={e => {setCategory(e.target.value)}}
          >
            <option value="food">Food</option>
            <option value="active">Active</option>
            <option value="culture">Culture</option>
            <option value="other">Other</option>
          </select>

        </form>
      </div>
    </div>
  )
}

export default AddPOI;