import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './components/admin';
import Invitation from './components/invitation';
import Landing from './components/landing';

function App() {
  return (
    <Router>
      <Route exact path='/' component={Landing} />
      <Route path="/invitation/:invitationId" component={Invitation} />
      <Route path='/admin' component={Admin} />
    </Router>
  );
}

export default App;
