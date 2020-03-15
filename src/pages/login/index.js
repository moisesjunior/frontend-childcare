import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class Login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleSignIn = async e => {
        e.preventDefault();
        const { usr_email, usr_password } = this.state;
        if (!usr_email || !usr_password) {
          this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            
            try {
                const response = await api.post("/login", { usr_email, usr_password });
                login(response.data.token);
                this.props.history.push("/app");
            } catch (err) {
                this.setState({
                error:
                    err.response.data.mensagem
                });
            }
        }
    };

    render(){
        return (
            <div className="container-fluid">
            <div className="row no-gutter">
                <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                <div className="col-md-8 col-lg-6">
                    <div className="login d-flex align-items-center py-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                    <h3 className="login-heading mb-4">Welcome to ChildCare!</h3>
                                    {this.state.error && <p>{this.state.error}</p>}
                                    <form onSubmit={this.handleSignIn}>
                                        <div className="form-label-group">
                                            <input type="email"  
                                            className="form-control" 
                                            placeholder="Email address" 
                                            required autoFocus
                                            onChange={e => this.setState({ usr_email: e.target.value })}
                                            />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
                                        <div className="form-label-group">
                                            <input type="password" 
                                            className="form-control" 
                                            placeholder="Password" required
                                            onChange={e => this.setState({ usr_password: e.target.value })}
                                            />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        <div className="custom-control custom-checkbox mb-3">
                                            <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                            <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                        </div>
                                        <button className="btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                                        <div className="text-center">
                                            <a className="small" href="https://facebook.com">Forgot password?</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }   
}

export default withRouter(Login);