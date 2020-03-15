import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class Footer extends Component {
    render(){
        return (
            <footer id="sticky-footer" class="py-4 bg-dark text-white-50">
                <div class="container text-center">
                    <small>Copyright &copy; Your Website</small>
                </div>
            </footer>
        )
    }
}

export default Footer;