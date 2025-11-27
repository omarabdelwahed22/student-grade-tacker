import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore([]);

describe('Login Component', () => {
  it('renders login form', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Student Grade Tracker')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('shows validation error when fields are empty', async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email and password are required')).toBeInTheDocument();
    });
  });

  it('shows error for invalid email', async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    const emailInput = screen.getByPlaceholderText('you@example.com') as HTMLInputElement;
    const submitButton = screen.getByRole('button', { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('renders loading state during login', () => {
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: true,
        error: null,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /signing in/i });
    expect(submitButton).toBeDisabled();
  });

  it('displays error message from auth state', () => {
    const errorMsg = 'Invalid credentials';
    const store = mockStore({
      auth: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: errorMsg,
      },
    });

    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
