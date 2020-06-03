import React, { Component, useState, useEffect } from "react"
import './styles.css'
import Buttons from '../buttons/index'
import api from "../../services/api";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from '@sweetalert/with-react'

const Select = props => {
    const [options, setOptions] = useState('')
    const { value, tipo, tipo_nome, onChange } = props;

    const fetchOptions = async () => {
        const response = await api.get('/grupo/' + tipo)
        setOptions(response.data)
    }

    useEffect(() => {
        fetchOptions()
    }, [tipo])

    if (!options) {
        return <span>Carregando</span>
    }

    return (
        <select required value={value} onChange={onChange} className="select" name={tipo_nome} id={tipo_nome}>
            <option value=""></option>
            {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
            ))}
        </select>
    )
}

class Event extends Component {
    constructor(props) {
        super(props);

        this.stateInicial = {
            age_id: props.age_id,
            age_type_con: '',
            age_type_ate: '',
            age_status: 1,
            age_date: props.age_date,
            age_start: props.age_start,
            age_end: '',
            age_patient: '',
            age_doctor: '',
            age_description: '',
            show: false
        }

        this.state = this.stateInicial
    }

    loadValues = async () => {
        const response = await api.get('/event/' + this.state.age_id)
        this.setState({
            age_id: response.data[0].age_id,
            age_type_con: response.data[0].age_type_con,
            age_type_ate: response.data[0].age_type_ate,
            age_status: response.data[0].age_status,
            age_date: response.data[0].age_date,
            age_start: response.data[0].age_start,
            age_end: response.data[0].age_end,
            age_patient: response.data[0].age_patient,
            age_doctor: response.data[0].age_doctor,
            age_description: response.data[0].age_description
        })
    }

    componentDidMount(){
        if (this.state.age_id) {
            this.loadValues()
        } else{
            this.setState({age_patient: "", age_doctor: ""})
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        const { age_type_con, age_type_ate, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description } = this.state;
        try{
            if (this.state.age_id) {
                const response = await api.put('/event/' + this.state.age_id, { age_type_con, age_type_ate, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description })
                console.log(response.data)
                swal("AVISO", response.data, "success", { closeOnClickOutside: false})
                    .then(() => { 
                        window.location.href = '/agenda'
                    })
            } else{
                const response = await api.post('/event', { age_type_con, age_type_ate, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description })
                swal("AVISO", response.data, "success")
                    .then(() => {
                        window.location.href = '/agenda'
                    })
            }
        } catch (error){
            this.setState({
                error: error.response.data
            })
            swal("AVISO", error.response.data, "error");
        }
    }

    render(){
        const { show, handleClose } = this.props;

        return (
            <div id="schedule" className="modal" show={`${show}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Agendamento</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <label htmlFor="age_type_con">Tipo de consulta</label>
                                        <select required value={this.state.age_type_con} className="select" name="age_type_con" id="age_type_con" onChange={e => this.setState({ age_type_con: e.target.value })}>
                                            <option value=""></option>
                                            <option value="1">Consulta</option>
                                            <option value="2">Retorno</option>
                                            <option value="3">Acompanhamento</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <label htmlFor="age_type_ate">Tipo de atendimento</label>
                                        <select required value={this.state.age_type_ate} className="select" name="age_type_ate" id="age_type_ate" onChange={e => this.setState({ age_type_ate: e.target.value })}>
                                            <option value=""></option>
                                            <option value="1">Convênio</option>
                                            <option value="2">Particular</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <label htmlFor="age_start">Data da consulta</label>
                                        <input required className="input--style-1 js-datepicker" value={this.state.age_date || ''} type="date" name="age_date" id="age_date" onChange={e => this.setState({ age_date: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <label htmlFor="age_start">Horário de início</label>
                                        <input required type="time" className="time" name="age_start" id="age_start" value={this.state.age_start || ''} onChange={e => this.setState({ age_start: e.target.value })} />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="input-group">
                                        <label htmlFor="age_end">Horário de término</label>
                                        <input required type="time" className="time" name="age_end" id="age_end" value={this.state.age_end} onChange={e => this.setState({ age_end: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-12">
                                    <label>Paciente</label>
                                    <Select required tipo="3" value={this.state.age_patient} onChange={e => this.setState({ age_patient: e.target.value })} tipo_nome="age_patient" />
                                </div>
                            </div>
                            
                            <div className="form-row top-15px">
                                <div className="col-md-12">
                                    <label>Doutor</label>
                                    <Select tipo="2" value={this.state.age_doctor} onChange={e => this.setState({ age_doctor: e.target.value })} tipo_nome="age_doctor" />
                                </div>
                            </div>
                            <div className="form-row top-15px">
                                <div className="col-md-12">
                                    <label htmlFor="age_description">Descrição</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={this.state.age_description}
                                        onChange={
                                            (event, editor) => {
                                                const data = editor.getData();
                                                this.setState({ age_description: data })
                                            }
                                        }
                                    />
                                </div>
                            </div>
                            <div className="top-15px">
                                <Buttons handleClose={handleClose} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
};

export default Event