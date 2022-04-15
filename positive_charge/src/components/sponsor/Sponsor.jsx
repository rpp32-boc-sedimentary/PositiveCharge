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
    axios.post('/sponsor', {
      startDate: startDate,
      months: months,
      user: 'testuser',// something from props?
      poi: '15'// props
    })
    .then((res) => {
      // do something
      navigate('/', { replace: true })
    })
    .catch((err) => {
      console.error(err);
    })
  }

  return (
    <div className="sponsor">
      <h1>Sponsor this point of interest: &lt;POI&gt;</h1>
      <form onSubmit={handleSubmit}>
        <h3>Enter Date Range:</h3>
        <label htmlFor="startDate">Starting on: </label>
        <input type="date" name="startDate" value={startDate} onChange={e => setStart(e.target.value)}></input>
        <label htmlFor="months">Number of months: </label>
        <input type="number" name="months" value={months} onChange={e => setMonths(e.target.value)}></input>
        <br/>

        <h3>Pricing</h3>
        <ul>
          <li>$5 per month</li>
          <li>$45 per year</li>
        </ul>

        <h3>Enter Payment Information:</h3>
        <button>Paypal</button>
        <button>Google Pay</button>
        <button>Apple Pay</button>

        <br/>
        <input id="sponsor-btn" type="Submit" value="SPONSOR"/>
      </form>
    </div>
  )
}

export default Sponsor;