/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Sponsor from '../positive_charge/src/components/sponsor/Sponsor';

describe('rendering', () => {
  test('renders Sponsor component', () => {
    render(<Sponsor />);
  });
});