import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Header from '../../components/header/index'
import Navigation from '../../components/navigation/index'
import Footer from '../../components/footer/index'

class Home extends Component{
    render(){
        return(
            <div>
                <Footer />
            </div>
        )
    }
}

export default Home