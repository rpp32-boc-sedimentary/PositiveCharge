/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import * as React from 'react'
import {render, fireEvent, screen} from '@testing-library/react'
import AddPOI from './AddPOI'
import PlacesAutocomplete from './PlacesAutocomplete'

describe('Form renders', () => {
  it('renders the AddPOI form', () => {
    render(<AddPOI />);
    expect(screen.getByText(/Add a Point of Interest/)).toBeInTheDocument();
  })
})

// describe('Form behavior', () => {
//   it('validates user inputs and provides error messages', async () => {
//     render(<AddPOI />);

//   })
})