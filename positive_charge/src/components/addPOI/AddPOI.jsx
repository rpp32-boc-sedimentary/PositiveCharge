import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import HelpIcon from '@mui/icons-material/Help';
import Tooltip from '@mui/material/Tooltip';
import GoogleMaps from './AutocompleteMUI.jsx'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function AddPOI () {
  const [pointName, setPointName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [address, setAddress] = useState('')
  const [category, setCategory] = useState('food')
  const [price, setPrice] = useState('free')
  const [nameError, setNameError] = useState(false)
  const [locationError, setLocationError] = useState(false)
  const [nameHelperText, setNameHelperText] = useState('')
  const [locationHelperText, setLocationHelperText] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function handleSubmit() {
    let data = [
      pointName,
      address,
      lng,
      lat,
      price,
      category
  ]
    if (validatePoiInfo(data)) {
      axios.post('/addPOI', data)
      .then((result) => {
        console.log('result of post', result)
        if (result.status === 201 && result.statusText === 'Created') {
          setSuccessMessage(`Successfully added ${result.data[0].name}!`)
        }
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  useEffect(() => {
    if (pointName !== '') {
      setNameError(false)
      setNameHelperText('')
      setSuccessMessage('')
    }
  }, [pointName])

  useEffect(() => {
    if (lat !== '' && lng !== '') {
      setLocationError(false)
      setLocationHelperText('')
      setSuccessMessage('')
    }
  }, [lat, lng])

  useEffect(() => {
    if (successMessage !== '') {
      setPointName('')
      setAddress('')
    }
  }, [successMessage])

  function validatePoiInfo(data) {
    let valid = true
    if (data[0] === '') {
      setNameError(true)
      setNameHelperText('What is this place called?')
      valid = false
    } if (data[2] === '' || data[3] === '') {
      setLocationError(true)
      setLocationHelperText('Where is this place?')
      valid = false
    } return valid
  }



  return (
    <div className="add-poi-form-container">
      <div className="add-poi-form-wrapper">
        <h2 className="text">Add a Point of Interest</h2>
        <div className="left">
          <Box
            component="form"
          >
          <TextField
            id="poi-name"
            label="Name"
            sx={{ width: "300px" }}
            error={nameError}
            helperText={nameHelperText}
            onChange={e => setPointName(e.target.value)}></TextField><br /><br />
        <GoogleMaps setAddress={setAddress} setLat={setLat} setLng={setLng} locationHelperText={locationHelperText} locationError={locationError}/>


        <br></br>
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
        <div className="price-and-tooltip">
        <ToggleButtonGroup
          value={price}
          exclusive
          onChange={(e) => setPrice(e.target.value)}
        >
          <ToggleButton value="free">Free</ToggleButton>
          <ToggleButton value="$">$</ToggleButton>
          <ToggleButton value="$$">$$</ToggleButton>
          <ToggleButton value="$$$">$$$</ToggleButton>
        </ToggleButtonGroup>&nbsp;&nbsp;
        <Tooltip
          title={<div>$: $1-$15<br />$$: $15-$30<br />$$$: $30</div>}
          placement="right"
        >
          <HelpIcon></HelpIcon>
        </Tooltip>
        </div>
        <br /><br />
        <div className="centered-button">
        <Button variant="contained"
        color="secondary"
        onClick={() => handleSubmit()}
        >Add this Place</Button>
        </div><br></br>
        <div className="center">
        <Typography color="secondary">{successMessage}</Typography>
        </div>
        <br></br>
        <br/>
        <br />
        </Box>
        </div>
      </div>
    </div>
  )
}

export default AddPOI;