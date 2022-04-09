import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PlacesAutocomplete from './PlacesAutocomplete.jsx'

function AddPOI () {
  const [pointName, setPointName] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [category, setCategory] = useState('food')
  const [price, setPrice] = useState('')
  const [chargerLat, setChargerLat] = useState('')
  const [chargerLng, setChargerLng] = useState('')
  const [dist, setDist] = useState('')
  const [walkTime, setWalkTime] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    let data = {
      name: pointName,
      lat,
      lng,
      category,
      price
    }
    if (validatePoiInfo(data)) {
      axios.post('/addPOI', data)
      .then(response => {
        console.log('response in component', response)
        setChargerLat(createNearbyCoordinate(lat))
        setChargerLng(createNearbyCoordinate(lng))
      })
      .catch(err => {
        console.error(err)
      })
    }
  }

  function createNearbyCoordinate(coordinate) {
    console.log('typeof coordinate', typeof coordinate)
    let newCoordinate
    let random = Math.random()
    let changeAmount = random*0.01
    let changePositive = true
    if (random > 0.5) {
      changePositive = false
    } if (changePositive) {
      newCoordinate = coordinate + changeAmount
    } else {
      newCoordinate = coordinate - changeAmount
    } return newCoordinate
  }

  useEffect(() => {
    if (lat && lng && chargerLat && chargerLng) {
      let point1 = { lat, lng}
      let point2 = {
        lat: chargerLat,
        lng: chargerLng
      }
      console.log('point 1', point1, 'point2', point2)
      setDist(Math.round(haversineDistance(point1, point2)))
    }
  }, [lat, lng, chargerLat, chargerLng])

  useEffect(() => {
    if (dist) {
      setWalkTime(Math.round(dist/84))
    }
  }, [dist])

  function haversineDistance(point1, point2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = point1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = point2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (point2.lng-point1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    console.log('d in miles', d)
    return d * 1609.34;
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

        <label htmlFor="point-name-input">Name: </label><br />
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
          <PlacesAutocomplete setLat={setLat} setLng={setLng}/>
          {lat &&
          <p>POI latitude: {lat}</p>}
          {lng &&
          <p>POI longitude: {lng}</p>}
          {chargerLat &&
          <p>Charger latitude: {chargerLng}</p>}
          {chargerLng &&
          <p>Charger longitude: {chargerLat}</p>}
          {dist &&
          <p>Distance in meters: {dist}</p>}
          {walkTime &&
          <p>Walking time in minutes: {walkTime}</p>}
          {/* <p id="place-geometry">Latitude and longitude (for demonstration purposes only): {location}</p> */}

          <br></br><br></br>

          <label htmlFor="category-select">Category: </label><br />
          <select id="category-select"
          value={category}
          onChange={e => setCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="cafe">Cafe</option>
            <option value="museum">Museum</option>
            <option value="landmark">Landmark or Historical</option>
            <option value="park">Park</option>
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

          {/* Check if user is a business user, if so, show checkbox for "this is my business" */}

          <input type="submit" value="Add POI"></input>
          <br></br><br></br>
        </form>
      </div>
    </div>
  )
}

export default AddPOI;