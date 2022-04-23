/**
 * @jest-environment jsdom
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import FindChargingStations from '../../positive_charge/src/components/findChargingStations/FindChargingStations.jsx';
import axios from 'axios';


jest.mock('axios');

test('renders FindChargingStations Component', () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);
})

test('Use my location button renders', () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);
  const locationButton = screen.getByLabelText('What is your current location?');

  expect(locationButton).toBeInTheDocument();
});

test('Heading selector renders', () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);
  const headingSelector = screen.getByLabelText('Which direction are you traveling?');

  expect(headingSelector).toBeInTheDocument();
});

test('Distance numerical input renders', () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);

  const distanceInput = screen.getByLabelText('How far away to search?miles');

  expect(distanceInput).toBeInTheDocument();
});

test('inital empty Nearby Stations table renders', () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);
  const nearbyTable = screen.getByText('Nearby Stations:');

  expect(nearbyTable).toBeInTheDocument();
});

test('Should make a GET request when Find Stations button is clicked', async () => {
  render(<BrowserRouter><FindChargingStations /></BrowserRouter>);
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
    watchPosition: jest.fn(),
  }
  global.navigator.geolocation = mockGeolocation;
  axios.get.mockResolvedValue({ stations: { data: [{
    "access_code": "public",
    "fuel_type_code": "ELEC",
    "groups_with_access_code": "Public",
    "id": 118375,
    "latitude": 39.744703073211,
    "longitude": -105.15229735145,
    "city": "Lakewood",
    "state": "CO",
    "street_address": "1626 Cole Boulevard",
    "zip": "80401",
    "country": "US",
    "ev_connector_types": [
      "J1772"
    ],
    "ev_network": "SemaCharge Network",
    "ev_network_ids": {
      "station": [
        "1309"
      ],
      "posts": [
        "2976",
        "3633"
      ]
    },
    "distance": 0.10992,
    "distance_km": 0.1769
  }]}});
  const user = userEvent.setup();
  const locationButton = screen.getByLabelText('What is your current location?');
  const findButton = screen.getByText('Find Stations');
  const APIGetSpy = jest.spyOn(axios, 'get');

  await user.click(locationButton);
  await user.click(findButton);

  expect(APIGetSpy).toBeCalled();
});

test('GET request to /findStations should respond with a stations list', async () => {
  var response = await axios.get('http://localhost:3000/findStations', {
    params: {
      userLat: 39.0,
      userLong: -100,
      radius: 2
    }
  });

  expect(Array.isArray(response.stations.data)).toBeTruthy();
});





