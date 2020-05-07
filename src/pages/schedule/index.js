import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Calendar from '../../components/calendar/'
import api from "../../services/api";


class Schedule extends Component{
    constructor(props) {
        super(props);

        this.stateInicial = {
            email: ""
        }

        this.state = this.stateInicial
    }

    handleGet = async e => {
        try {
            const response = await api.get("/event");
            console.log(response)
        } catch (err) {
            this.setState({
                error: err.response.data.mensagem
            });
        }
    }

    render(){
        return(
            <div>
                <Navigation />
                <Calendar />
                <button onClick={this.handleGet}></button>
                <Footer />
            </div>
        )
    }
}

export default Schedule