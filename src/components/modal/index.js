import React, { Component, useState, useEffect } from "react"

import './styles.css'
import Buttons from '../buttons/index'
import api from "../../services/api";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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
        <select value={value} onChange={onChange} className="select" name={tipo_nome} id={tipo_nome}>
            <option value=""></option>
            {options.map((option, index) => (
                <option key={index} value={option.usr_id}>{option.usr_name}</option>
            ))}
        </select>
    )
}

class Modal extends Component {
    constructor(props) {
        super(props);

        this.stateInicial = {
            age_id: props.age_id,
            age_type: '',
            age_status: 1,
            age_date: '',
            age_start: '',
            age_end: '',
            age_patient: '',
            age_doctor: '',
            age_description: ''
        }

        this.state = this.stateInicial
    }

    loadValues = async () => {
        const response = await api.get('/event/' + this.state.age_id)
        this.setState({
            age_id: response.data[0].age_id,
            age_type: response.data[0].age_type,
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
        const { age_type, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description } = this.state;
        try{
            if (this.state.age_id) {
                // console.log("olá")
                // await api.put('/event/' + this.state.age_id, { age_type, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description })
                // this.event = setTimeout(() => {
                //     this.props.history.push("/agenda")
                // }, 60000);
            } else{
                console.log(this.state)
                // const response = await api.post('/event', { age_type, age_status, age_date, age_start, age_end, age_patient, age_doctor, age_description })
                // this.event = setTimeout(() => {
                //     this.props.history.push("/agenda")
                // }, 60000);
            }
        } catch (error){
            this.setState({
                error: error.response.data.mensagem
            });
        }
    }

    render(){
        const { show, handleClose } = this.props;
        console.log(this.state)
        const showHideClassName = show ? 'display-block' : 'display-none';

        return (
            <div id="schedule" className={showHideClassName + " modal"}>
                <div className='modal-content'>
                    <div className="modal-header">
                        <h2>Agendamento</h2>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row row-space">
                                <div className="col-2">
                                    <div className="input-group">
                                        <select value={this.state.age_type} className="select" name="age_type" id="age_type" onChange={e => this.setState({ age_type: e.target.value })}>
                                            <option value="0" disabled="disabled">Tipo de consulta</option>
                                            <option value="1">Consulta</option>
                                            <option value="2">Retorno</option>
                                            <option value="3">Acompanhamento</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="input-group">
                                        <input className="input--style-1 js-datepicker" value={this.state.age_date} type="date" name="age_date" id="age_date" onChange={e => this.setState({ age_date: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row row-space">
                                <div className="col-2">
                                    <div className="input-group">
                                        <label htmlFor="age_start">Horário de início</label>
                                        <input type="time" className="time" name="age_start" id="age_start" value={this.state.age_start} onChange={e => this.setState({ age_start: e.target.value })}/>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="input-group">
                                        <label htmlFor="age_end">Horário de término</label>
                                        <input type="time" className="time" name="age_end" id="age_end" value={this.state.age_end} onChange={e => this.setState({ age_end: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group">
                                <label>Paciente</label>
                                <Select tipo="3" value={this.state.age_patient} onChange={e => this.setState({ age_patient: e.target.value })} tipo_nome="age_patient" />
                            </div>
                            <div className="input-group">
                                <label>Doutor</label>
                                <Select tipo="2" value={this.state.age_doctor} onChange={e => this.setState({ age_doctor: e.target.value })} tipo_nome="age_doctor"/>
                            </div>
                            <div className="input-group">
                                <label htmlFor="age_description">Descrição</label>
                                <CKEditor 
                                    editor={ClassicEditor}
                                    data={this.state.age_description}
                                    onChange={
                                        (event, editor) => {
                                            const data = editor.getData();
                                            this.setState({age_description: data})
                                        }
                                    }
                                />
                            </div>
                            <Buttons handleClose={handleClose} />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    
};

export default Modal