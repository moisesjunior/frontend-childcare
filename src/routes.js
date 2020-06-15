import React from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/login/index";
import Home from "./pages/home/index";
import Patient from "./pages/patients/index";
import Schedule from "./pages/schedule/index";
import PatientForm from "./pages/patient-form/index";
import Doctor from './pages/doctors'
import DoctorForm from './pages/doctor-form'
import RecordsHeader from './pages/records-header'
import RecordsItens from './pages/records-itens'
import RecordsForm from './pages/records-form'
import SignUp from './pages/signup'

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
      <Route path="/signup" component={SignUp} />
      <PrivateRoute path="/home" component={Home} />
      <PrivateRoute path="/agenda" component={Schedule} />
      <PrivateRoute exact path="/pacientes" component={Patient} />
      <PrivateRoute exact path="/pacientes/form/" component={PatientForm} />
      <PrivateRoute exact path="/medicos" component={Doctor} />
      <PrivateRoute exact path="/medicos/form" component={DoctorForm} />
      <PrivateRoute exact path="/prontuario" component={RecordsHeader} />
      <PrivateRoute exact path="/prontuario/itens" component={RecordsItens} />
      <PrivateRoute exact path="/prontuario/form" component={RecordsForm} />
      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes