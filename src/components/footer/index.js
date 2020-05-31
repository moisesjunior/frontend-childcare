import React, { Component } from "react";

import './styles.css';

class Footer extends Component {
    render(){
        return (
            <div>
                <footer id="sticky-footer" className="footer text">
                    <div className="text-center">
                        <small>Created by Moisés Junior</small>
                        <br></br>
                        <small>Copyright &copy; ChildCare</small>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer;