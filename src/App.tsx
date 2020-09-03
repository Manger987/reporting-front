import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// import ReportListContainer from './containers/ReportListContainer';
import Login from './../src/components/Login/Login';
function App() {
  return (
    <div className="App">
      INICIAL
        <Router>
          <Switch>
            <Route path={'/login'} component={Login}></Route>
            {/* <Route path={'/reports'} component={ReportListContainer}></Route> */}
          </Switch>
        </Router>
    </div>
  );
}

export default App;
