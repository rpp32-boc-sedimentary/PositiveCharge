/**
 * @jest-environment jsdom
 */

import React from 'react';
// import { createRoot } from 'react-dom/client';
import '@testing-library/jest-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';
import Login from '../positive_charge/src/components/auth/Login';
import Signup from '../positive_charge/src/components/auth/Signup';

describe('Signup Form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
  })
    onSubmit.mockClear();
    render(<Signup />, {wrapper: MemoryRouter});

  it('onSubmit is called when all fields pass validation', async () => {
    user.type(getName(), 'Test User');
    user.type(getEmail(), 'test@test');
    user.type(getPassword(), 'test');
    user.click(getSignupButton());

    // fireEvent.submit(getButton());
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({"name":"Test User","email":"test@test","password":"test"});
    })

    expect(onSubmit).toHaveBeenCalledTimes(1);
  })

});

describe('Login Form', () => {
  const onSubmit = jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
    render(<Login />, {wrapper: MemoryRouter});
  })

  it('onSubmit is called when all fields pass validation', async () => {
    user.type(getEmail(), 'test@test');
    user.type(getPassword(), 'test');
    user.click(screen.getByRole('button', {name: /login/i}))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({"email":"test@test","password":"test"});
    })

    expect(onSubmit).toHaveBeenCalledTimes(1);
  })

});

function getName() {
  return screen.getByRole('textbox', {name: /name:/i});
}

function getEmail() {
  return screen.getByRole('textbox', {name: /email:/i});
}

function getPassword() {
  return screen.getByRole('textbox', {name: /password:/i});
}

function getSignupButton() {
  return screen.getByRole('button', {name: /sign up/i});
}