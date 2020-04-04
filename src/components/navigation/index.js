import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo-home.png";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { logout } from '../../services/auth';

class Navigation extends Component {
    handleLogout = e => {
        logout();
        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <nav class="navbar navbar-expand-sm bg-light navbar-light">
                    <Link href="/app" className="navbar-brand">
                        <img src={logo} alt="" width="40px"/>
                    </Link>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" href="">Active</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="#">Link</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="#">Link</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" href="#">Disabled</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav nav-logout">
                        <li class="nav-logout">
                            <Link className="nav-button nav-link" href="#" onClick={this.handleLogout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default withRouter(Navigation);