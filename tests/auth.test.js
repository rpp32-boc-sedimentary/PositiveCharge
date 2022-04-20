/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../positive_charge/src/components/auth/Login';
import Signup from '../positive_charge/src/components/auth/Signup';

xdescribe('rendering', () => {
  test('renders login component', () => {
    render(<Login />);
  });

  test('renders signup component', () => {
    render(<Signup />);
  });
});