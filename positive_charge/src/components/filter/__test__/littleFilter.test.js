/** @jest-environment jsdom */

import { render, screen, waitFor } from '@testing-library/react/';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import React from 'react';
import LittleFilter from '../LittleFilter';
import SeePOI from '../../SeePOI/SeePoi';
//import App from '../../../../App';
const fakeData = require('../../../../../database/dummyData/pois')

it('Sort dropdown contains Loves option', () => {
  render (<LittleFilter allData={fakeData} />);
  const sortDropDown = screen.getByRole("option", { name: "Loves" });
  expect(sortDropDown).toBeInTheDocument();
});

it('Sort dropdown contains Distance option', () => {
  render (<LittleFilter allData={fakeData} />);
  const sortDropDown2 = screen.getByRole("option", { name: "Distance"});
  expect(sortDropDown2).toBeInTheDocument();
});

it('renders a dropdown with two options for sorting', () => {
  render (<LittleFilter allData={fakeData} />);
  const dropDown = screen.getAllByRole("option");
  expect(dropDown.length).toBe(2);
});

it('renders a button called More Filters', () => {
  render (<LittleFilter allData={fakeData} />);
  const moreFilterButton = screen.getByRole("button", { name: "More Filters"});
  expect(moreFilterButton).toBeInTheDocument();
  //expect(buttons.length).toBe(2);
});

it('renders a button called Prices', () => {
  render (<LittleFilter allData={fakeData} />);
  const priceButton = screen.getByRole("button", { name: "Price"});
  expect(priceButton).toBeInTheDocument();
});


//integration test
const MockPOIList = () => {
  return (
    <BrowserRouter>
      <SeePOI allData={fakeData}/>
    </BrowserRouter>
  )
}
// it('should render filtered data into SeePOI component', async (done) => {
//   //const { container } = render(<MockPOIList />);
//   //let contain = container.querySelector('.filters');
//   //console.log('contain', contain)
//   //const filterButton = await screen.getByText("Price");
//   // setTimeout(function() {
//   //   screen.getByText("Price");
//   //   done();
//   // }, 500);
//   //console.log('eiei', eiei);
//   // const waited = await waitFor(() => screen.getByText("Price"), {timeout: 1000});
//   //console.log('filterbutton', filterButton)
//   //const price = screen.getByRole('j');
//   render(<App />);
//   const xx = screen.getByText("Price");
// })