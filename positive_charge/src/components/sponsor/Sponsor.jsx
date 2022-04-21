import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

function Sponsor() {

  const [startDate, setStart] = useState('');
  const [months, setMonths] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;

  function handleSubmit(e) {
    e.preventDefault();
    console.log('data = ', data)
    // check if yelp id or poi id is passed down
    // if yelp id, add poi
    // poi id, sponsor it

    var poi_id, user_id;
    var yelpId = data.props.id;
    // check if POI exists in DB
    axios.get('/get-poi-user', {
      params: {
        id: data.props.id,
        name: data.props.name
      }
    })
    .then((result) => {
      // if poi exists, get the id's for poi and user
      user_id = result.data.user;
      if (result.data.poi) {
        poi_id = result.data.poi;
        return {user: user_id, poi: poi_id};
      } else {
        // if poi doesn't exist, add the poi
        axios.post('/addPOI', [yelpId])
        .then((poi) => {
          poi_id = poi[0].id;
          return {user: user_id, poi: poi_id};
        })
        .catch((err) => {
          console.error(err);
        })
      }
    })
    .catch((err) => {
      console.error(err);
    })
    .then((ids) => {
      console.log('poi_id:', ids.poi, 'user_id', ids.user);
      axios.post('/sponsor', {
        startDate: startDate,
        months: months,
        user: ids.user,
        poi: ids.poi
      })
      .then((res) => {
        // show sponsoring successful message / page with details
        alert(`Thank you!  ${data.props.name} will be sponsored starting on ${startDate}!`);
        navigate(-1, { replace: true })
        return res;
      })
      .catch((err) => {
        console.error(err);
      })
    })
    // immediately check if there are any active sponsors
    .then(() => {
      axios.get('/activate')
      .then((res) => {
        console.log('Activated POIs: ', res);
      })
      .catch((err) => {
        console.error(err);
      })
    })
  }

  // can't get this to work as helper function
  // should be returning a promise but unable to utilize within handleSubmit
  // function getIds(data) {
  //   var yelpId = data.props.id;
  //   axios.get('/get-poi-user', {
  //     params: {
  //       name: data.props.name
  //     }
  //   })
  //   .then((result) => {
  //     console.log('get-poi-user result', result.data)
  //     if (result.data.poi) {
  //       return result.data;
  //     } else {
  //       axios.post('/addPOI', [yelpId])
  //       .then((poi) => {
  //         console.log('addPOI result poi: ', poi);
  //         result.data.poi = poi[0].id;
  //         return result.data;
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       })
  //     }
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }

  return (
    <div className="sponsor">
      <h1>Sponsor this point of interest: {data.props.name}</h1>
      <form onSubmit={handleSubmit}>
        <h3>Enter Date Range:</h3>
        <label htmlFor="startDate">Starting on: </label>
        <input type="date" name="startDate" value={startDate} onChange={e => setStart(e.target.value)} required></input>
        <label htmlFor="months">Number of months: </label>
        <input type="number" name="months" value={months} onChange={e => setMonths(e.target.value)} required></input>
        <br/>

        <h3>Pricing</h3>
        <ul>
          <li>$5 per month (31 day increments from start date)</li>
          <li>$45 per year</li>
        </ul>

        <h3>Enter Payment Information:</h3>
        <button>Paypal</button>
        <button>Google Pay</button>
        <button>Apple Pay</button>

        <br/><br/>
        <input id="sponsor-btn" type="Submit" value="SPONSOR"/>
      </form>
    </div>
  )
}

export default Sponsor;