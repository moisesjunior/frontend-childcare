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
                <Link to="/pacientes/form" className="button"><FiUserPlus />Adicionar paciente</Link>
                <Table data={this.state.data} type="patient"/>
                <Footer />
            </div>
        )
    }
}

export default Patient