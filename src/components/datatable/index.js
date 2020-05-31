import React, { Component } from "react";
import { FiEye, FiEdit, FiXCircle, FiArchive } from "react-icons/fi";
import { Link, withRouter } from "react-router-dom";

import './styles.css';

const TableBody = props => {
    const response = Object.values(props.response)

    const linhas = response.map((linha, index) => {
        return(
            <tr key={index}>
                <td className="td-center"> 
                    <div className="dropdown">
                            <button type="button" className="dropbtn" data-toggle="dropdown">Ações</button>
                        <div className="dropdown-content">
                            <Link className="dropdown-item"><FiArchive className="icon"/>&nbsp;visualizar prontuário></Link>                            
                            <Link className="dropdown-item"><FiEye className="icon" />&nbsp;visualizar paciente/></Link>                            
                            <Link className="dropdown-item"><FiEdit className="icon" />&nbsp;editar paciente/></Link>                            
                            <Link className="dropdown-item"><FiXCircle className="icon" />&nbsp;excluir paciente/></Link>                            
                        </div>
                    </div> 
                </td>
                <td className="td-center">{linha.col1}</td>
                <td className="td-center">{linha.col2}</td>
                <td>{linha.col3}</td>
                <td>{linha.col4}</td>
                <td className="td-center">{linha.col5}</td>
            </tr>
        )
    })

    return(
        <tbody>{linhas}</tbody>
    )
}

const TableHead = props => {
    const type = props.type
    let header = ""
    if (type === "patient"){
        header = {
            col1: "",
            col2: "Nome do paciente",
            col3: "Nome do responsável",
            col4: "Idade",
            col5: "Gênero",
            col6: "Última consulta"
        }
    }
    
    const headers = 
        <tr>
            <th className="th-left" width="5%">{header.col1}</th>
            <th className="th-left" width="30%">{header.col2}</th>
            <th className="th-left" width="30%">{header.col3}</th>
            <th className="th-center" width="10%">{header.col4}</th>
            <th className="th-center" width="10%">{header.col5}</th>
            <th className="th-center" width="20%">{header.col6}</th>
        </tr>
       console.log(headers) 
    
    return (
        <thead>
            {headers}
        </thead>
    )
}

class Table extends Component {
    state = {
        pacientes: ''
    }
    render() {
        const data = this.props.data
        const type = this.props.type
        return (
            <div width='100%' className="container-div table-responsive">
                <table className="table table-bordered table-hover">
                    <TableHead type={type} />
                    <TableBody type={type} response={data} />
                </table>
            </div>
        );
    }
}

export default withRouter(Table);