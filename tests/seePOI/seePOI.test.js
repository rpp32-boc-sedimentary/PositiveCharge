/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render, fireEvent, screen, cleanup } from '@testing-library/react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import SeePOI from '../../positive_charge/src/components/seePOI/seePOI.jsx';

// jest.mock(SeePOI);

beforeEach(() => {
  SeePOI.mockClear()
})
xdescribe('SeePOI', () => {
  test('renders SeePOI component', () => {
    render(<SeePOI />);
    expect(screen.getByText(/Experiences Near You/)).toBeInTheDocument();

  })
})

