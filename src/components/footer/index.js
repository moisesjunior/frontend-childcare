import React, { Component } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

class Footer extends Component {
    render(){
        return (
            <footer id="sticky-footer" class="py-2 text-white-50">
                <div class="container text-center">
                    <small>Created by Moisés Junior</small>
                    <br></br>
                    <small>Copyright &copy; ChildCare</small>
                </div>
            </footer>
        )
    }
}

export default Footer;