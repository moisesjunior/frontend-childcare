import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import swal from '@sweetalert/with-react'
import api from "../../services/api";
import logo from "../../assets/logo.png";

import './styles.css';

class SignUp extends Component {
    constructor(props){
        super(props);

        this.stateInicial = {
            usr_name: '',
            usr_email: '',
            usr_password: '',
            usr_password2: ''
        }

        this.state = this.stateInicial
    }

    handlePasswordLength = () => {
        let passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if (this.state.usr_password !== '') {
            if (this.state.usr_password.match(passValid) === null) {
                this.setState({
                    error: "As senhas precisam ter entre 8 e 15 caracteres e conter no minímo uma letra minúscula, uma letra maiúscula, um número e um caracter especial"
                })
            } else if (this.state.usr_password2 !== this.state.usr_password) {
                this.setState({
                    error: "As senhas não coincidem, entrar com a mesma senha por favor!!"
                })
            } else {
                this.setState({
                    error: ""
                })
            }
        }
    }

    handleSignUp = async e => {
        e.preventDefault()
        if(this.state.error !== ""){
            const { usr_email, usr_password, usr_name } = this.state;
            if (!usr_email || !usr_password || !usr_name) {
                this.setState({ error: "Preencha Todas as informações para continuar!" })
                swal("AVISO", this.state.error, "error") 
            } else {
                try {
                    const response = await api.post("/signup", { usr_name, usr_email, usr_password });
                    swal("AVISO", response.data, "success", { closeOnClickOutside: false })
                        .then(() => {
                            this.props.history.push("/");
                        })
                } catch (error) {
                    this.setState({
                        error: error.response.data
                    })
                    swal("AVISO", error.response.data, "error")
                }
            }
        } else {
            swal("AVISO", this.state.error, "error") 
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
                    <form onSubmit={this.handleSignUp}>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <input className="input-login" type="text" name="usr_name" size="50" placeholder="Enter your full name" required onChange={e => this.setState({ usr_name: e.target.value })} />
                            </div>
                            <div className="col-md-4"></div>
                        </div>
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
                                <input className="input-login" type="password" name="usr_password" placeholder="Password" required onBlur={this.handlePasswordLength} onChange={e => this.setState({ usr_password: e.target.value })} />
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <input className="input-login" type="password" name="usr_password" placeholder="Confirm Password" required onBlur={this.handlePasswordLength} onChange={e => this.setState({ usr_password2: e.target.value })} />
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                        <div className="form-row">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                                <button className="btn-submit" type="submit">Register</button>
                            </div>
                            <div className="col-md-4"></div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
    
};
export default withRouter(SignUp);