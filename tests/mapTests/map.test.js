/** @jest-environment jsdom */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from '../../positive_charge/src/components/map/map.jsx';
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event'
import mockData from './mockData.js';

describe('rendering', () => {
  test('renders Map component', () => {
    render(<Map userLocation={mockData.userLocation} props={mockData.destinations}/>);
  });

  test('Does not render directions without a location being selected', () => {
    render(<Map userLocation={mockData.userLocation} props={mockData.destinations}/>);
    const directions = screen.queryByText('Directions To');
    expect(directions).not.toBeInTheDocument();
  })

  

});
