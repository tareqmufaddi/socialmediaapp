import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProject from "./components/project-forms/CreateProject";
import PrivateRoute from "./components/routing/PrivateRoute";
import ViewProject from "./components/dashboard/ViewProject";
import ViewUnit from "./components/dashboard/ViewUnit";
import AddUnit from "./components/project-forms/AddUnit";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-project"
                component={CreateProject}
              />
              <PrivateRoute
                exact
                path="/:projectname"
                component={ViewProject}
              />
              <PrivateRoute
                exact
                path="/project/:unit_id"
                component={ViewUnit}
              />
              <PrivateRoute
                exact
                path="/forms/:projectname"
                component={AddUnit}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
