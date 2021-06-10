import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {About} from './components/about';
import {Home} from './components/home';
import { NotFound404 } from './components/NotFound404';

const App = () => (
  <Router>
    <>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about" exact component={About}/>
        <Route path="/" exact component={Home}/>
        <Route path="*" component={NotFound404}/>
      </Switch>
    </>
  </Router>
);

export default App;
