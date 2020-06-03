import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login/index";
import Home from "./pages/home/index";
import Patient from "./pages/patients/index";
import Schedule from "./pages/schedule/index";
import PatientForm from "./pages/patient-form/index";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/agenda" component={Schedule} />
      <PrivateRoute exact path="/pacientes" component={Patient} />
      <PrivateRoute exact path="/pacientes/form/" component={PatientForm} />
      <PrivateRoute exact path="/pacientes/form/:id" component={PatientForm} />
      <PrivateRoute path="/medicos" component={() => <h1>Medicos</h1>} />
      <PrivateRoute path="/medicos/form" component={PatientForm} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes