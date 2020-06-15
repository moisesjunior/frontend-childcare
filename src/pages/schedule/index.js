import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Calendar from '../../components/calendar/'


class Schedule extends Component{
    render(){
        return(
            <div>
                <Navigation />
                <div className="schedule-title">
                    <h3>Agendamento de consultas</h3>
                </div>
                <Calendar/>
                <Footer />
            </div>
        )
    }
}

export default Schedule