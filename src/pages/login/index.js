import React, {Component} from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { login } from "../../services/auth";
import logo from "../../assets/logo.png";

import 'bootstrap/dist/css/bootstrap.min.css';
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
            <div className="overflow">
                <div className="container">
                    <div className="row center">
                        <img class="image" src={logo} alt="" width="382px" height="200px"/>
                    </div>
                </div>
                <div className="container form-center">
                    {this.state.error && <p>{this.state.error}</p>}
                    <form onSubmit={this.handleSignIn}>
                        <div className="form-group col">
                            <input type="email" name="usr_email" className="col-md-5 form-control" placeholder="Enter e-mail address" required onChange={e => this.setState({ usr_email: e.target.value })}/>
                        </div>
                        <div className="form-group col">
                            <input type="password" name="usr_password" className="col-md-5 form-control" placeholder="Password" required onChange={e => this.setState({ usr_password: e.target.value })}/>
                        </div>
                        <div className="row">
                            <button className="col-md-5 btn btn-lg btn-danger btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
                        </div>
                        <div className="row">
                            <a href="/" className="small">Forgot password?</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
};
export default withRouter(Login);