import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Table from '../../components/datatable/'
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

class Patient extends Component {
    state = {
        data: ''
    }

    componentDidMount = async () => {
        const response = await api.get("/patient");
        this.setState({data: response.data})
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="patient-title">
                    <h3>Registros de pacientes</h3>
                </div>
                <Link to={{
                    pathname: "/pacientes/form/",
                    state: {
                        id: null,
                        action: "adicionar"
                    }
                }} className="button"><FiUserPlus />Adicionar paciente</Link>
                <div className="top-40px">
                    <Table data={this.state.data} type="patient" />
                </div>
                
                <Footer />
            </div>
        )
    }
}

export default Patient