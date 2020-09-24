import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import ReportListContainer from "./containers/ReportListContainer";
import CreateReport from './components/Report/Create';
import Login from "./../src/components/Login/Login";
import Error404 from "./components/Errors/Errors";
import { ProtectedRoute } from "./components/ProtectedRoute";
import "./FontAwesomeIcons";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/login'} exact component={Login}></Route>
          {/*<Route path={'/reports'} exact component={ReportListContainer}></Route> */}
          <ProtectedRoute exact path="/reports" component={ReportListContainer} />
          <ProtectedRoute exact path="/reports/create" component={CreateReport} />
          <Route path={"*"} component={Error404}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
