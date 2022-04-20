/** @jest-environment jsdom */

import { render, screen, fireEvent } from '@testing-library/react/';
import '@testing-library/jest-dom';
import React from 'react';
import LfCategories from '../LfCategories';
import BfCategories from '../BfCategories';
//const fakeData = require('../../../../../database/dummyData/pois')

const currentCategories = {
  'food and cafes': true,
  'cultural': true,
};

describe('Given two categories as props', () => {

  it('LittleFilter should have two checkboxes', () => {
    render (<LfCategories suggestedCategories={ currentCategories }/>);
    const lfBoxes = screen.getAllByRole("checkbox");
    expect(lfBoxes.length).toBe(2);
  });

  it('BigFilter should have two checkboxes', () => {
    render (<BfCategories suggestedCategories={ currentCategories }/>);
    const bfBoxes = screen.getAllByRole("checkbox");
    expect(bfBoxes.length).toBe(2);
  });

});

it('should be able to check a box in little filter categories', () => {
  //const onChange = (value, checked) => {};
  render(<LfCategories suggestedCategories={currentCategories}/>);
  const lfCulturalBox = screen.getByRole("checkbox", {name: 'cultural'});
  expect(lfCulturalBox.checked).toEqual(true);
  fireEvent.change(lfCulturalBox, {target: {checked: false}});
  expect(lfCulturalBox.checked).toEqual(false);
});