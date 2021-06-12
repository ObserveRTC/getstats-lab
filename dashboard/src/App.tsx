import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import {About} from './components/about';
import {Home} from './components/home';
import { NotFound404 } from './components/not.found.404';
import {StatsImplementationDetails} from "./components/stats.implementation.details";
import {StatsImplementationReports} from "./components/stats.implementation.reports";

const App = () => (
  <Router>
    <>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about" exact component={About}/>
        <Route path="/" exact component={Home}/>
        <Route path="/stats-details" exact component={StatsImplementationDetails}/>
        <Route path="/stats-reports" exact component={StatsImplementationReports}/>
        <Route path="*" component={NotFound404}/>
      </Switch>
    </>
  </Router>
);

export default App;
