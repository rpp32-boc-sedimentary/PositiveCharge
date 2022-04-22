import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import GoogleMaps from './AutocompleteMUI.jsx'
import Box from '@mui/material/Box';


function AddPOI () {
  const [pointName, setPointName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('food')
  const [price, setPrice] = useState('')
  const [showCostGuide, setShowCostGuide] = useState(false)
  const [noName, setNoName] = useState(false)
  const [noCoords, setNoCoords] = useState(false)
  const [noPrice, setNoPrice] = useState(false)
  const [canSubmit, setCanSubmit] = useState(true)

  useEffect(() => {
    console.log('address', address)
  }, [address])

  function handleSubmit() {
    let data = [
      pointName,
      address,
      lat,
      lng,
      category,
      price
  ]
    if (validatePoiInfo(data)) {
      axios.post('/addPOI', data)
      .then(() => {
        return
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  function validatePoiInfo(data) {
    let isValid = true
    if (pointName === '') {
      isValid = false
      setNoName(true)
    } if (lat === '' || lng === '') {
      isValid = false
      setNoCoords(true)
    } if (price === '') {
      isValid = false
      setNoPrice(true)
    }
    return isValid
  }

  useEffect(() => {
    if (pointName !== '') {
      setNoName(false)
    } if (lat !== '' && lng !== '') {
      setNoCoords(false)
    } if (price !== '') {
      setNoPrice(false)
    } if (!noPrice && !noName && !noCoords) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }, [pointName, lat, lng, price, noPrice, noName, noCoords])

  return (
    <div className="add-poi-form-container">
      <div className="add-poi-form-wrapper">
        <h1 className="text">Add a Point of Interest</h1>
          <Box
            component="form"
          >
          <TextField
            id="poi-name"
            label="Name"
            sx={{ width: "300px" }}
            onChange={e => setPointName(e.target.value)}></TextField><br /><br />
        {/* <label htmlFor="poi-name-input" required>Name: </label><br />
        <input
          type="text"
          className="text-input"
          id="poi-name-input"
          data-testid="name-input"
          placeholder=""
          value={pointName}
          onChange={e =>
            setPointName(e.target.value)}
        />
        <br/><br/> */}
        {/* <label htmlFor="poi-location-input" required>Location: </label>
          <PlacesAutocomplete setAddress={setAddress} setLat={setLat} setLng={setLng}/><br /><br /> */}

        <GoogleMaps setAddress={setAddress} setLat={setLat} setLng={setLng}/>

        <br></br><br></br>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          id="poi-category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}>
            <MenuItem value="food">Food</MenuItem>
            <MenuItem value="cafe">Cafe</MenuItem>
            <MenuItem value="museum">Museum</MenuItem>
            <MenuItem value="landmark">Landmark</MenuItem>
            <MenuItem value="park">Park</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          <br></br><br></br>
        {/* <label htmlFor="poi-category-select" required>Category: </label><br />
        <select id="category-select"
        value={category}
        onChange={e => setCategory(e.target.value)}>
          <option value="food">Food</option>
          <option value="cafe">Cafe</option>
          <option value="museum">Museum</option>
          <option value="landmark">Landmark or Historical</option>
          <option value="park">Park</option>
          <option value="other">Other</option>
        </select><br></br><br></br> */}

        <ToggleButtonGroup
          value={price}
          exclusive
          onChange={(e) => setPrice(e.target.value)}
        >
          <ToggleButton value="free">Free</ToggleButton>
          <ToggleButton value="$">$</ToggleButton>
          <ToggleButton value="$$">$$</ToggleButton>
          <ToggleButton value="$$$">$$$</ToggleButton>
        </ToggleButtonGroup>
        <Tooltip
          // title="$: $1-$15\n$$: $15-$30\n$$$: $30+"
          title={<div>$: $1-$15<br />$$: $15-$30<br />$$$: $30</div>}
          placement="right"
        >
          <HelpIcon></HelpIcon>
        </Tooltip><br></br>
        {/* <input type="radio" className="radio-button poi-price-input" name="price" id="free" value="free" onClick={e => setPrice(e.target.value)}></input>
        <label htmlFor="free">Free</label>

        <input type="radio" className="radio-button price-input" name="price" id="$" value="$" onClick={e => setPrice("1")}></input>
        <label htmlFor="$">$</label>

        <input type="radio" className="radio-button price-input" name="price" id="$$" value="$$" onClick={e => setPrice("2")}></input>
        <label htmlFor="$$">$$</label>

        <input type="radio" className="radio-button price-input" name="price" id="$$$" value="$$$" onClick={e => setPrice("3")}></input>
        <label htmlFor="$$$">$$$</label><br></br> */}

        {/* {!showCostGuide &&
        <p onClick={() => setShowCostGuide(true)}>Show Cost Guidelines</p>}

        {showCostGuide &&
        <>
        <p>Cost Guidelines</p>
        <p>$: Low. For restaurants, the average meal costs less than $15</p>
        <p>$$: Medium. For restaurants, the average meal costs $15 - $30</p>
        <p>$$$: High. For restaurants, the average meal costs more than $30</p>
        </>} */}

        {/* Check if user is a business user, if so, show checkbox for "this is my business" */}
        <br /><br />
        <Button variant="contained" onClick={() => handleSubmit()}>Add this Place</Button><br></br>
        <br/>
        {/* {noName &&
        <p className="warning">Please add a name</p>}
        {noCoords &&
        <p className="warning">Please select a valid address</p>}
        {noPrice &&
        <p className="warning">Please select a price level</p>} */}
        <br />
        </Box>
      </div>
    </div>
  )
}

export default AddPOI;