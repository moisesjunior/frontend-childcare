import React, { Component } from "react";
import { FiEye, FiEdit, FiXCircle, FiArchive } from "react-icons/fi";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import swal from '@sweetalert/with-react'
import { medicalOptions } from '../../services/data'
import './styles.css';

const SelectData = (value) => {
    const valor = medicalOptions.find(k => value === k.value);
    return valor
}

const TableBody = props => {
    const type = props.type
    const response = Object.values(props.response)

    let prontuario = "/"
    let link = ""
    let description = ""
    let home = ""
    let del = ""
    let hidden = ""
    switch (type) {
        case "patient":
            link = "/pacientes/form/"
            home = "/pacientes"
            description = "paciente"    
            del = "/patient/"
            prontuario = "/itens"
            break;
        case "doctor":
            link = "/medicos/form/"
            home = "/medicos"
            description = "médico"
            del = "/doctor/"
            prontuario = "/"
            break;
        case "records":
            link = "/prontuario/form/"
            home = "/prontuario"
            description = "consulta"
            hidden = "hide-drop"
            del = "/records/"
            break;
        default:
            break;
    }

    const handleDelete = (id) => {
        swal({
            title: "Tem certeza que deseja deletar o registro?",
            text: "Uma vez deletado, não é possível restaurar o registro!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then( async (willDelete) => {
                if (willDelete) {
                    const response = await api.delete(del + id)
                    swal(response.data, { icon: "success"})
                        .then(() => {
                            window.location.href = home
                        })
                }
            });
    }

    const linhas = response.map((linha, index) => {
        let descricao = SelectData(linha.col2)
        if (type === "doctor" && descricao !== undefined){
            descricao = descricao.label
        } else {
            descricao = linha.col2
        }

        let id = ""
        let params = {}
        if(type === "records"){
            id = linha.id.split("|")
            params = {
                pro_id: id[0],
                con_id: id[1],
                age_id: id[2],
                action: "visualizar"
            }
        } else {
            params = {
                id: linha.id,
                action: "visualizar"
            }
        }

        if(linha.id !== null){
            return (
                <tr key={index}>
                    <td className="td-center">
                        <div className="dropdown">
                            <button type="button" className="dropbtn" data-toggle="dropdown">Ações</button>
                            <div className="dropdown-content">
                                <Link className={"dropdown-item " + hidden} to={{
                                    pathname: `/prontuario${prontuario}`,
                                    state: {
                                        id: linha.id,
                                        action: "editar"
                                    }
                                }}><FiArchive className="icon" />&nbsp;visualizar prontuário</Link>
                                <Link className={"dropdown-item " + hidden}
                                    to={{
                                        pathname: `${link}`,
                                        state: {
                                            id: linha.id,
                                            action: "editar"
                                        }
                                    }}><FiEdit className="icon" />&nbsp;editar {description}
                                </Link>
                                <a className={"dropdown-item " + hidden} href="#" onClick={() => handleDelete(linha.id)}><FiXCircle className="icon" />&nbsp;excluir {description}</a>
                            </div>
                        </div>
                    </td>
                    <td className="td-center">{linha.col1}</td>
                    <td className="td-center">{descricao}</td>
                    <td>{linha.col3}</td>
                    <td>{linha.col4}</td>
                    <td className="td-center">{linha.col5}</td>
                </tr>
            )
        } else {
            return(
                <tr key={index}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
    })

    return(
        <tbody>{linhas}</tbody>
    )
}

const TableHead = props => {
    let width = {
        col1: "5%",
        col2: "30%",
        col3: "30%",
        col4: "10%",
        col5: "10%",
        col6: "20%"
    }

    const type = props.type
    let header = ""
    switch(type){
        case 'patient':
            header = {
                col1: "",
                col2: "Nome do paciente",
                col3: "Nome do responsável",
                col4: "Idade",
                col5: "Gênero",
                col6: "Última consulta"
            }
            break
        case 'doctor':
            header = {
                col1: "",
                col2: "Nome completo",
                col3: "Especialidade",
                col4: "CRM",
                col5: "E-mail",
                col6: "Telefone"
            }
            break
        case 'records':
            header = {
                col1: "",
                col2: "Data da consulta",
                col3: "Horário",
                col4: "Médico Responsável",
                col5: "Tipo da consulta",
                col6: "Tipo do atendimento"
            }
            width = {
                col1: "5%",
                col2: "15%",
                col3: "20%",
                col4: "25%",
                col5: "15%",
                col6: "15%"
            }
            break
        default:
            header = {
                col1: "",
                col2: "",
                col3: "",
                col4: "",
                col5: "",
                col6: ""
            }
            break
    }
    
    const headers = 
        <tr>
            <th className="th-left" width={width.col1}>{header.col1}</th>
            <th className="th-left" width={width.col2}>{header.col2}</th>
            <th className="th-left" width={width.col3}>{header.col3}</th>
            <th className="th-center" width={width.col4}>{header.col4}</th>
            <th className="th-center" width={width.col5}>{header.col5}</th>
            <th className="th-center" width={width.col6}>{header.col6}</th>
        </tr>
    
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

        console.log(data)

        return (
            <div width='100%' className="container-div table-responsive">
                <table className="table table-bordered table-hover">
                    <TableHead type={type}/>
                    <TableBody type={type} response={data} />
                </table>
            </div>
        );
    }
}

export default withRouter(Table);