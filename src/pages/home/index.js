import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/index'
import Footer from '../../components/footer/index'

class Home extends Component{
    render(){
        return(
            <div>
                <Navigation />
                <Footer />
            </div>
        )
    }
}

export default Home