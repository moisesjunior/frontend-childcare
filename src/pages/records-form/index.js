import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Buttons from '../../components/buttons'
import api from "../../services/api";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import swal from '@sweetalert/with-react'
import { Link, withRouter } from "react-router-dom";

class RecordsForm extends Component {
    constructor(props) {
        super(props);
        
        this.stateInicial = {
            pro_id: this.props.location.state.pro_id,
            con_id: this.props.location.state.con_id,
            age_id: this.props.location.state.age_id,
            prevPath:this.props.location.pathname,
            active: "dados_gerais",
            pat_name: "",
            pat_tipo: "",
            pat_data_consulta: "",
            pat_age: "",
            pat_gender: "",
            pat_responsavel: "",
            con_queixa:"",
            con_alergias:"",
            con_medicamentos:"",
            con_problemas_respiratorios:"",
            con_problemas_gastricos:"",
            con_problemas_musculares:"",
            con_altura:"",
            con_peso:"",
            con_imc:"",
            con_freq_cardio:"",
            con_arterial:"",
            con_freq_resp:"",
            con_temp_corp:"",
            con_observacoes:"",
            con_diagnostico:"",
            con_evolucao:""
        }

        this.state = this.stateInicial
    }

    loadPatientInfo = async () => {
        const response = await api.get('/event/patient/' + this.state.age_id)
        this.setState({
            age_id: response.data[0].age_id,
            pat_id: response.data[0].pat_id,
            pro_id: response.data[0].pro_id,
            pat_name: response.data[0].pat_name,
            pat_responsavel: response.data[0].pat_responsavel,
            pat_age: response.data[0].pat_age,
            pat_gender: response.data[0].pat_sexo,
            pat_data_consulta: `${response.data[0].age_date} ${response.data[0].age_start}`,
            pat_tipo: response.data[0].age_consulta
        })
    }

    loadValues = async () => {
        const response = await api.get('/appointment/' + this.state.con_id)
        this.setState({
            con_queixa: response.data[0].con_queixa,
            con_alergias: response.data[0].con_alergias,
            con_medicamentos: response.data[0].con_medicamentos,
            con_problemas_respiratorios: response.data[0].con_problemas_respiratorios,
            con_problemas_gastricos: response.data[0].con_problemas_gastricos,
            con_problemas_musculares: response.data[0].con_problemas_musculares,
            con_altura: response.data[0].con_altura,
            con_peso: response.data[0].con_peso,
            con_imc: response.data[0].con_imc,
            con_freq_cardio: response.data[0].con_freq_cardio,
            con_arterial: response.data[0].con_arterial,
            con_freq_resp: response.data[0].con_freq_resp,
            con_temp_corp: response.data[0].con_temp_corp,
            con_observacoes: response.data[0].con_observacoes,
            con_diagnostico: response.data[0].con_diagnostico,
            con_evolucao: response.data[0].con_evolucao
        })
    }

    componentDidMount() {
        if (this.state.age_id) {
            this.loadPatientInfo()
            console.log(this.state)
        }
        if(this.state.con_id){
            this.loadValues()
        }
    }

    onChangeIMC = (altura, peso) => {
        this.setState({ con_altura: altura, con_peso: peso })
        const imc = peso / (altura * altura)
        if (peso > 0 && altura > 0) {
            this.setState({ con_imc: imc.toFixed(2) })
        }
    }

    handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await api.post('/appointment', this.state)
            swal("AVISO", response.data, "success", { closeOnClickOutside: false })
                .then(() => {
                    window.location.href = '/prontuario'
                })
        } catch (error) {
            this.setState({
                error: error.response.data
            })
            swal("AVISO", error.response.data, "error");
        }
    }

    handleClose = () => {
        window.location = "/prontuario"
    }

    changeForm = (event) => {
        const clicked = event.target.name
        if (this.state.active === clicked) {
            this.setState({ active: '' });
        } else {
            this.setState({ active: clicked })
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <h2 className="title">Consulta do paciente</h2>
                <div className="container">
                    <ul className="navform nav-pills">
                        <li className={`${this.state.active === "dados_gerais" ? 'active' : ''}`}><a data-toggle="pill" onClick={this.changeForm.bind(this)} name="dados_gerais" >Dados gerais</a></li>
                        <li className={`${this.state.active === "anamnese" ? 'active' : ''}`}><a data-toggle="pill" name="anamnese" onClick={this.changeForm.bind(this)}>Anamnese</a></li>
                        <li className={`${this.state.active === "exame_fisico" ? 'active' : ''}`}><a data-toggle="pill" name="exame_fisico" onClick={this.changeForm.bind(this)}>Exame físico</a></li>
                        <li className={`${this.state.active === "diagnostico" ? 'active' : ''}`}><a data-toggle="pill" name="diagnostico" onClick={this.changeForm.bind(this)}>Diagnóstico</a></li>
                        <li className={`${this.state.active === "evolucao" ? 'active' : ''}`}><a data-toggle="pill" name="evolucao" onClick={this.changeForm.bind(this)}>Evolução</a></li>
                        {/* <li className={`${this.state.active === "exames" ? 'active' : ''}`}><a data-toggle="pill" name="exames" onClick={this.changeForm.bind(this)}>Exames</a></li> */}
                    </ul>
                    <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div className="margin">
                            <div className="tab-content">
                                <div id="dados_gerais" className={`tab-pane fade ${this.state.active === "dados_gerais" ? 'in active' : ''}`}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label>Nome completo: {this.state.pat_name}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label>Nome do responsável: {this.state.pat_responsavel}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-2"></div>
                                        <div className="col-md-4">
                                            <Link className="btn info" to={{
                                                pathname: "/pacientes/form/",
                                                state: {
                                                    id: this.state.pat_id,
                                                    action: "adicionar",
                                                    prevPath: this.state.prevPath
                                                }
                                            }}>
                                                Visualizar dados do paciente
                                        </Link>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <label>Idade do paciente: {this.state.pat_age}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label>Gênero do paciente: {this.state.pat_gender}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label>Data da consulta: {this.state.pat_data_consulta}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="input-group">
                                                <label>Tipo: {this.state.pat_tipo}</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="anamnese" className={`tab-pane fade ${this.state.active === "anamnese" ? 'in active' : ''}`}>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Queixa</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_queixa}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_queixa: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Alergias</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_alergias}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_alergias: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Medicamentos</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_medicamentos}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_medicamentos: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Problemas respiratórios</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_problemas_respiratorios}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_problemas_respiratorios: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Problemas gástricos</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_problemas_gastricos}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_problemas_gastricos: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Problemas musculares</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_problemas_musculares}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_problemas_musculares: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="exame_fisico" className={`tab-pane fade ${this.state.active === "exame_fisico" ? 'in active' : ''}`}>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Altura(m)</label>
                                                <input type="text" required value={this.state.con_altura} onChange={e => this.onChangeIMC(e.target.value, this.state.con_peso)} className="form-control" id="con_altura" name="con_altura" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Peso (kg)</label>
                                                <input type="text" required value={this.state.con_peso} onChange={e => this.onChangeIMC(this.state.con_altura, e.target.value)} className="form-control" id="con_peso" name="con_peso" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">IMC</label>
                                                <input type="text" required value={this.state.con_imc} onChange={e => this.onChangeIMC(this.state.con_altura, this.state.con_peso)} className="form-control" id="con_imc" name="con_imc" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Frequência cardíaca</label>
                                                <input type="text" required value={this.state.con_freq_cardio} onChange={e => this.setState({ con_freq_cardio: e.target.value })} className="form-control" id="con_freq_cardio" name="con_freq_cardio" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Pressão arterial</label>
                                                <input type="text" required value={this.state.con_arterial} onChange={e => this.setState({ con_arterial: e.target.value })} className="form-control" id="con_arterial" name="con_arterial" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Frequência respiratória</label>
                                                <input type="text" required value={this.state.con_freq_resp} onChange={e => this.setState({ con_freq_resp: e.target.value })} className="form-control" id="con_freq_resp" name="con_freq_resp" />
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Temperatura corporal</label>
                                                <input type="text" required value={this.state.con_temp_corp} onChange={e => this.setState({ con_temp_corp: e.target.value })} className="form-control" id="con_temp_corp" name="con_temp_corp" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <div className="input-group">
                                                <label htmlFor="age_type_con">Observações</label>
                                                <CKEditor
                                                    editor={ClassicEditor}
                                                    data={this.state.con_observacoes}
                                                    onChange={
                                                        (event, editor) => {
                                                            const data = editor.getData();
                                                            this.setState({ con_observacoes: data })
                                                        }
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="diagnostico" className={`tab-pane fade ${this.state.active === "diagnostico" ? 'in active' : ''}`}>
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <label htmlFor="age_type_con">Diagnóstico</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={this.state.con_diagnostico}
                                                onChange={
                                                    (event, editor) => {
                                                        const data = editor.getData();
                                                        this.setState({ con_diagnostico: data })
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div id="evolucao" className={`tab-pane fade ${this.state.active === "evolucao" ? 'in active' : ''}`}>
                                    <div className="col-md-12">
                                        <div className="input-group">
                                            <label htmlFor="age_type_con">Evolução</label>
                                            <CKEditor
                                                editor={ClassicEditor}
                                                data={this.state.con_evolucao}
                                                onChange={
                                                    (event, editor) => {
                                                        const data = editor.getData();
                                                        this.setState({ con_evolucao: data })
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* <div id="exames" className={`tab-pane fade ${this.state.active === "exames" ? 'in active' : ''}`}>
                                    <div className="input-group">
                                        <label className="fileName"htmlFor="age_type_con">Anexar arquivos</label>
                                        <input className="fileBody" type="file" name="" id="" onChange={e => console.log(e.target.value)} multiple/>
                                    </div>
                                </div>
                                <div id="conclusao" className={`tab-pane fade ${this.state.active === "conclusao" ? 'in active' : ''}`}>
                                    
                                </div> */}
                            </div>
                        </div>
                        <div className="top-15px">
                            <Buttons handleClose={this.handleClose} />
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default withRouter(RecordsForm)