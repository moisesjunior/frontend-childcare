import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import logo from "../../assets/logo-home.png";
import { FiMenu } from "react-icons/fi"
import './styles.css';
import { logout } from '../../services/auth';

class Navigation extends Component {
    handleLogout = e => {
        logout();
        this.props.history.push("/");
    }

    myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        } 
    }

    render(){
        return (
            <div className="fixed-header">
                <header>
                    <div className="topnav" id="myTopnav">
                        <Link to="/home" className="float-left">
                            <img src={logo} alt="" width="30px" />
                        </Link>
                        <Link className="float-left" to="/agenda">Agenda</Link>
                        <Link className="float-left" to="/prontuario">Prontuários</Link>
                        <Link className="float-left" to="/pacientes">Pacientes</Link>
                        <Link className="float-left" to="/medicos">Médicos</Link>
                        <a href="#" className="icon" onClick={this.myFunction}>
                            <FiMenu></FiMenu>
                        </a>
                        <Link className="float-right" to="#" onClick={this.handleLogout}>Sair</Link>
                    </div>
                </header>
            </div>
        )
    }
}

export default withRouter(Navigation);