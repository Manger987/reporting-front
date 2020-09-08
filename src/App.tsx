import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import "./App.css";
import ReportListContainer from "./containers/ReportListContainer";
import Login from "./../src/components/Login/Login";
import Error404 from "./components/Errors/Errors";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path={'/login'} exact component={Login}></Route>
          {/*<Route path={'/reports'} exact component={ReportListContainer}></Route> */}
          <ProtectedRoute exact path="/reports" component={ReportListContainer} />
          <Route path={"*"} component={Error404}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
