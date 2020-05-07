import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo-home.png";

import './styles.css';
import { logout } from '../../services/auth';

class Navigation extends Component {
    handleLogout = e => {
        logout();
        this.props.history.push("/");
    }

    render(){
        return (
            <div className="fixed-header">
                <header>
                    <nav className="navbar navbar-expand-sm navbar-light">
                        <Link to="/home" className="navbar-brand">
                            <img src={logo} alt="" width="40px"/>
                        </Link>
                        <ul className="navbar-nav mr-auto">
                            <li>
                                <Link className="link" to="/agenda">Agenda</Link>
                            </li>
                            <li>
                                <Link className="link" to="/prontuario">Prontuários</Link>
                            </li>
                            <li>
                                <Link className="link" to="/usuarios">Pacientes</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav">
                            <li className="nav-logout">
                                <Link className="nav-button link" to="#" onClick={this.handleLogout}>Sair</Link>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}

export default withRouter(Navigation);