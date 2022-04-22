/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import * as React from 'react';
import {render, fireEvent, screen, getByLabelText} from '@testing-library/react';
import AddPOI from './AddPOI';
import PlacesAutocomplete from './PlacesAutocomplete';
import user from '@testing-library/user-event';


describe('Form renders', () => {
  it('renders the AddPOI form', () => {
    jest.fn().mockClear()
    render(<AddPOI />);
    const heading = screen.getByRole('heading', {
      name: /add a point of interest/i
    })
    expect(heading).toBeInTheDocument();
    jest.fn().mockClear()
  })
})

describe('Form behavior', () => {
  // const onSubmit = jest.fn();

  // beforeEach(() => {
  //   onSubmit.mockClear();
  //   render(<AddPOI />)
  // })
  jest.fn().mockClear()
  render(<AddPOI />);
  user.type(getName(), 'Bob\'s Burgers')
})

function getName() {
  return screen.getByRole('textbox', { name: /name:/i })
}

