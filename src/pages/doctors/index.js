import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Table from '../../components/datatable/'
import api from "../../services/api";
import { Link } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";

class Doctor extends Component {
    state = {
        data: ''
    }

    componentDidMount = async () => {
        const response = await api.get("/doctor");
        this.setState({ data: response.data })
    }

    render() {
        return (
            <div>
                <Navigation />
                <Link to={{
                    pathname: "/medicos/form/",
                    state: {
                        id: null,
                        action: "adicionar"
                    }
                }} className="button"><FiUserPlus />Adicionar médico</Link>
                <div className="top-40px">
                    <Table data={this.state.data} type="doctor" />
                </div>
                <Footer />
            </div>
        )
    }
}

export default Doctor