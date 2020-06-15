import React, {Component} from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";
import logo from "../../assets/logo.png";

import './styles.css';

class Login extends Component {
    constructor(props){
        super(props);

        this.stateInicial = {
            usr_email: '',
            usr_password: ''
        }

        this.state = this.stateInicial
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { usr_email, usr_password } = this.state;
        if (!usr_email || !usr_password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("/login", { usr_email, usr_password });
                login(response.data.token);
                this.props.history.push("/home");
            } catch (err) {
                this.setState({
                    error: err.response.data.mensagem
                });
            }
        }
    };

    render(){
        return (
            <div className="overflow">
                <div className="container-logo">
                    <div className="form-row">
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <img src={logo} className="center" alt="" width="382px" height="200px" />
                        </div>
                    </div>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="container-form">
                    <form onSubmit={this.handleSignIn}>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <input className="input-login" type="email" name="usr_email" size="50" placeholder="Enter e-mail address" required onChange={e => this.setState({ usr_email: e.target.value })} />
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <input className="input-login" type="password" name="usr_password" placeholder="Password" required onChange={e => this.setState({ usr_password: e.target.value })} />
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <button className="btn-submit" type="submit">Sign in</button>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <a href="/signup" className="small">Ainda não é cadastrado?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
};
export default withRouter(Login);