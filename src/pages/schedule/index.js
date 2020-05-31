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
                <Calendar/>
                <Footer />
            </div>
        )
    }
}

export default Schedule