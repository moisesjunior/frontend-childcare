import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import api from "../../services/api";
import { Link, withRouter } from "react-router-dom";
import { FiEye } from "react-icons/fi";

const TableBody = props => {    
    let response = []
    if(props.data !== undefined){
        response = Object.values(props.data)
    }

    const link = "/prontuario/itens"
    const description = "prontuário"

    const linhas = response.map((linha, index) => {
        return (
            <tr key={index}>
                <td className="td-center">
                    <div className="dropdown">
                        <button type="button" className="dropbtn" data-toggle="dropdown">Ações</button>
                        <div className="dropdown-content">
                            <Link className="dropdown-item" to={{
                                pathname: `${link}`,
                                state: {
                                    id: linha.pat_id,
                                    action: "visualizar"
                                }
                            }}><FiEye className="icon" />&nbsp;visualizar {description}</Link>
                        </div>
                    </div>
                </td>
                <td className="td-center">{linha.col1}</td>
                <td className="td-center">{linha.col2}</td>
            </tr>
        )
    })

    return (
        <tbody>{linhas}</tbody>
    )
}

const TableHead = props => {
    const header = {
        col1: "",
        col2: "Nome do paciente",
        col3: "Médico responsável"
    }

    const headers =
        <tr>
            <th className="th-left" width="10%">{header.col1}</th>
            <th className="th-left" width="45%">{header.col2}</th>
            <th className="th-left" width="45%">{header.col3}</th>
        </tr>

    return (
        <thead>
            {headers}
        </thead>
    )
}

class RecordsHeader extends Component {
    constructor(props){
        super(props)
        
        let usr_id = ""
        if(props.location.state !== undefined){
            usr_id = `/${props.location.state.id}`
        }

        this.stateInicial = {
            usr_id: usr_id
        }

        this.state = this.stateInicial
    }

    componentDidMount = async () => {
        const response = await api.get(`/records`);
        
        this.setState({
            data: response.data
        })
    }

    render() {          
        return (
            <div>
                <Navigation />
                <div width='100%' className="top-40px container-div table-responsive">
                    <table className="table table-bordered table-hover">
                        <TableHead />
                        <TableBody data={this.state.data}/>
                    </table>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(RecordsHeader);