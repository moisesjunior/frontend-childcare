import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Table from '../../components/datatable/'
import api from "../../services/api";

class RecordsItens extends Component {
    constructor(props){
        super(props)

        console.log(props.location)

        this.state = {
            pat_id: props.location.state.id,
            name: props.location.state.name,
            data: []
        }
    }

    componentDidMount = async () => {
        const response = await api.get(`/records/${this.state.pat_id}`);
        this.setState({ data: response.data })
    }

    render() {
        console.log(this.state.name)
        return (
            <div> 
                <Navigation />
                <div className="patient-title">
                    <h3>Prontuário médico - {this.state.name}</h3>
                </div>
                <div className="top-40px">
                    <Table data={this.state.data} type="records" />
                </div>
                <Footer />
            </div>
        )
    }
}

export default RecordsItens