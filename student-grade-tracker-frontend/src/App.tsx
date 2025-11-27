import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './features/auth/Login';
import StudentList from './features/students/StudentList';
import PrivateRoute from './features/auth/PrivateRoute';
import { RootState } from './store';
import './App.css';

function App() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="App">
        {isAuthenticated && (
          <header className="App-header">
            <h1>Student Grade Tracker</h1>
            <nav>
              <ul>
                <li><a href="/students">Students</a></li>
              </ul>
            </nav>
          </header>
        )}
        <main className="App-main">
          <Switch>
            <Route exact path="/login" component={Login} />
            <PrivateRoute exact path="/students" component={StudentList} />
            <Route exact path="/">
              {isAuthenticated ? (
                <Redirect to="/students" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
