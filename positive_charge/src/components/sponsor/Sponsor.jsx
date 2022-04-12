import React, { useState } from 'react';
import axios from 'axios';

function Sponsor() {

  const [fromDate, setFrom] = useState('');
  const [toDate, setTo] = useState('');
  const [name, setName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [exp, setExp] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('/sponsor', {
      fromDate: fromDate,
      toDate: toDate,
    })
    .then((res) => {
      // do something
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
        <label htmlFor="fromDate">From: </label>
        <input type="date" name="fromDate" value={fromDate} onChange={e => setFrom(e.target.value)}></input>
        <label htmlFor="toDate">To: </label>
        <input type="date" name="toDate" value={toDate} onChange={e => setTo(e.target.value)}></input>
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