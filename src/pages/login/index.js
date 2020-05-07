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
                <div className="container">
                    <div className="row">
                        <img src={logo} className="center" alt="" width="382px" height="200px"/>
                    </div>
                </div>
                <div className="container-form">
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.handleSignIn}>
                        <div className="form-center">
                            <input type="email" name="usr_email" size="50" placeholder="Enter e-mail address" required onChange={e => this.setState({ usr_email: e.target.value })}/>
                        </div>
                        <div className="form-center">
                            <input type="password" name="usr_password" className="" placeholder="Password" required onChange={e => this.setState({ usr_password: e.target.value })}/>
                        </div>
                        <div className="form-center">
                            <button className="btn-submit" type="submit">Sign in</button>
                        </div>
                        <a href="/" className="small">Forgot password?</a>
                    </form>
                </div>
            </div>
        )
    }
    
};
export default withRouter(Login);