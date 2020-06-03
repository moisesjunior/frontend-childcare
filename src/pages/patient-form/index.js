import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Buttons from '../../components/buttons'
import api from "../../services/api";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import InputMask from 'react-input-mask';
import axios from "axios";
import swal from '@sweetalert/with-react'
import Select from '../../components/select2'

class PatientForm extends Component {
    constructor(props) {
        super(props);
    
        this.stateInicial = {
            pat_id: this.props.match.params.id,
            pat_name: "",
            pat_birth: "",
            pat_gender: "",
            pat_rg: "",
            pat_cpf: "",
            pat_birth_certificate: "",
            pat_cep: "",
            pat_street: "",
            pat_neighborhood: "",
            pat_number: "",
            pat_complement: "",
            pat_city: "",
            pat_state: "",
            pat_resp_name1: "",
            pat_resp_gender1: "",
            pat_resp_birth1: "",
            pat_resp_rg1: "",
            pat_resp_cpf1: "",
            pat_resp_tel1: "",
            pat_resp_email1: "",
            pat_resp_name2: "",
            pat_resp_gender2: "",
            pat_resp_birth2: "",
            pat_resp_rg2: "",
            pat_resp_cpf2: "",
            pat_resp_tel2: "",
            pat_resp_email2: "",
            pat_blood_type: "",
            pat_height: "",
            pat_weight: "",
            pat_imc: 0,
            pat_skin_color: "",
            pat_doc_usr_id: "",
            pat_medicines: "",
            pat_diseases: ""
        }
        
        this.state = this.stateInicial
    }

    loadValues = async () => {
        const response = await api.get('/patient/' + this.state.pat_id)
        this.setState({
            pat_id: response.data[0].pat_id,
            pat_name: response.data[0].pat_name,
            pat_birth: response.data[0].pat_birth,
            pat_gender: response.data[0].pat_gender,
            pat_rg: response.data[0].pat_rg,
            pat_cpf: response.data[0].pat_cpf,
            pat_birth_certificate: response.data[0].pat_birth_certificate,
            pat_cep: response.data[0].pat_cep,
            pat_street: response.data[0].pat_street,
            pat_neighborhood: response.data[0].pat_neighborhood,
            pat_number: response.data[0].pat_number,
            pat_complement: response.data[0].pat_complement,
            pat_city: response.data[0].pat_city,
            pat_state: response.data[0].pat_state,
            pat_resp_name1: response.data[0].pat_resp_name1,
            pat_resp_gender1: response.data[0].pat_resp_gender1,
            pat_resp_birth1: response.data[0].pat_resp_birth1,
            pat_resp_rg1: response.data[0].pat_resp_rg1,
            pat_resp_cpf1: response.data[0].pat_resp_cpf1,
            pat_resp_tel1: response.data[0].pat_resp_tel1,
            pat_resp_email1: response.data[0].pat_resp_email1,
            pat_resp_name2: response.data[0].pat_resp_name2,
            pat_resp_gender2: response.data[0].pat_resp_gender2,
            pat_resp_birth2: response.data[0].pat_resp_birth2,
            pat_resp_rg2: response.data[0].pat_resp_rg2,
            pat_resp_cpf2: response.data[0].pat_resp_cpf2,
            pat_resp_tel2: response.data[0].pat_resp_tel2,
            pat_resp_email2: response.data[0].pat_resp_email2,
            pat_blood_type: response.data[0].pat_blood_type,
            pat_height: response.data[0].pat_height,
            pat_weight: response.data[0].pat_weight,
            pat_imc: response.data[0].pat_imc,
            pat_skin_color: response.data[0].pat_skin_color,
            pat_doc_usr_id: response.data[0].pat_doc_usr_id,
            pat_medicines: response.data[0].pat_medicines,
            pat_diseases: response.data[0].pat_diseases
        })
    }

    componentDidMount() {
        if (this.state.pat_id) {
            this.loadValues()
        }
    }

    onChangeCEP = async (cep) => {
        this.setState({pat_cep: cep})
        let newCep = cep.replace(/-/gi, "")
        if (newCep.length > 7){
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            this.setState({ 
                pat_street: response.data.logradouro,
                pat_neighborhood: response.data.bairro,
                pat_city: response.data.localidade,
                pat_state: response.data.uf
            })
        } else {
            this.setState({
                pat_street: "",
                pat_neighborhood: "",
                pat_city: "",
                pat_state: ""
            })
        }
    }

    onChangeIMC = (altura, peso) => {
        this.setState({ pat_height: altura, pat_weight: peso })
        const imc = peso / (altura * altura)
        if(peso > 0 && altura > 0){
            this.setState({pat_imc: imc.toFixed(2)})
        }         
    }

    handleClose = () => {
        window.location = "/pacientes"
    }

    handleSubmit = async e => {
        e.preventDefault()
        try {
            if (this.state.pat_id) {
                const response = await api.put('/patient/' + this.state.pat_id, this.state)
                swal("AVISO", response.data, "success", { closeOnClickOutside: false })
                    .then(() => {
                        window.location.href = '/pacientes'
                    })
            } else {
                const response = await api.post('/patient', this.state)
                swal("AVISO", response.data, "success")
                    .then(() => {
                        window.location.href = '/pacientes'
                    })
            }
        } catch (error) {
            this.setState({
                error: error.response.data
            })
            swal("AVISO", error.response.data, "error");
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <h2 className="title">Formulário do paciente</h2>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control hidden" id="pat_id" name="pat_id" />
                        <div className="sub-title">
                            <h3>DADOS GERAIS</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-8">
                                <label htmlFor="pat_name">Nome completo</label>
                                <input type="text" required value={this.state.pat_name} onChange={e => this.setState({ pat_name: e.target.value })} className="form-control" id="pat_name" name="pat_name" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_gender">Sexo</label>
                                <select required className="form-control" value={this.state.pat_gender} onChange={e => this.setState({ pat_gender: e.target.value })} name="pat_gender" id="pat_gender">
                                    <option value=""></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_birth">Data de nascimento</label>
                                <input required type="date" value={this.state.pat_birth} onChange={e => this.setState({ pat_birth: e.target.value })} className="form-control" id="pat_birth" name="pat_birth" />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-4">
                                <label htmlFor="pat_birth_certificate">Certidão de nascimento</label>
                                <InputMask
                                    mask="999999 99 99 9999 9 99999 999 9999999-99"
                                    maskChar=""
                                    required type="text" value={this.state.pat_birth_certificate} onChange={e => this.setState({ pat_birth_certificate: e.target.value })} className="form-control" id="pat_birth_certificate" name="pat_birth_certificate"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_rg">RG</label>
                                <InputMask
                                    mask="99.999.999-*"
                                    maskChar=""
                                    type="text" value={this.state.pat_rg} onChange={e => this.setState({ pat_rg: e.target.value })} className="form-control" id="pat_rg" name="pat_rg"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_cpf">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=""
                                    type="text" value={this.state.pat_cpf} onChange={e => this.setState({ pat_cpf: e.target.value })} className="form-control" id="pat_cpf" name="pat_cpf"
                                />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>ENDEREÇO</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="pat_cep">CEP</label>
                                <InputMask 
                                    mask="99999-999"
                                    maskChar=""
                                    required type="text" value={this.state.pat_cep} onChange={e => this.onChangeCEP(e.target.value)} className="form-control" id="pat_cep" name="pat_cep"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="pat_street">Rua</label>
                                <input required type="text" disabled value={this.state.pat_street} onChange={e => this.setState({ pat_street: e.target.value })} className="form-control" id="pat_street" name="pat_street" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="pat_neighborhood">Bairro</label>
                                <input required type="text" disabled value={this.state.pat_neighborhood} onChange={e => this.setState({ pat_neighborhood: e.target.value })} className="form-control" id="pat_neighborhood" name="pat_neighborhood" />
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="pat_number">Número</label>
                                <input required type="text" value={this.state.pat_number} onChange={e => this.setState({ pat_number: e.target.value })} className="form-control" id="pat_number" name="pat_number" />
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="pat_complement">Complemento</label>
                                <input type="text" value={this.state.pat_complement} onChange={e => this.setState({ pat_complement: e.target.value })} className="form-control" id="pat_complement" name="pat_complement" />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="pat_city">Cidade</label>
                                <input required type="text" disabled value={this.state.pat_city} onChange={e => this.setState({ pat_city: e.target.value })} className="form-control" id="pat_city" name="pat_city" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_state">Estado</label>
                                <input required type="text" disabled value={this.state.pat_state} onChange={e => this.setState({ pat_state: e.target.value })} className="form-control" id="pat_state" name="pat_state" />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>DADOS MÉDICOS</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="pat_blood_type">Tipo sanguíneo</label>
                                <select required className="form-control" value={this.state.pat_blood_type} onChange={e => this.setState({ pat_blood_type: e.target.value })} name="pat_blood_type" id="pat_blood_type">
                                    <option value=""></option>
                                    <option value="1">A+</option>
                                    <option value="2">A-</option>
                                    <option value="3">AB+</option>
                                    <option value="4">AB-</option>
                                    <option value="5">B+</option>
                                    <option value="6">B-</option>
                                    <option value="7">O+</option>
                                    <option value="8">O-</option>
                                </select>
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="pat_height">Altura</label>
                                <InputMask
                                    mask="9.99"
                                    maskChar=""
                                    required type="text" className="form-control" value={this.state.pat_height} onChange={e => this.onChangeIMC(e.target.value, this.state.pat_weight)} id="pat_height" name="pat_height"
                                />
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="pat_weight">Peso</label>
                                <input required type="text" className="form-control" value={this.state.pat_weight} onChange={e => this.onChangeIMC(this.state.pat_height, e.target.value)} id="pat_weight" name="pat_weight" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_imc">IMC</label>
                                <input required type="text" className="form-control" disabled value={this.state.pat_imc} onChange={e => this.onChangeIMC(this.state.pat_height, this.state.pat_weight)} id="pat_imc" name="pat_imc" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_skin_color">Cor da pele</label>
                                <select required className="form-control" value={this.state.pat_skin_color} onChange={e => this.setState({ pat_skin_color: e.target.value })} name="pat_skin_color" id="pat_skin_color">
                                    <option value=""></option>
                                    <option value="1">Branco</option>
                                    <option value="2">Pardo</option>
                                    <option value="3">Preto</option>
                                    <option value="4">Indígena</option>
                                    <option value="5">Amarelo</option>
                                </select>
                            </div>
                            <div className="col-md-4">
                                <label htmlFor="pat_doc_usr_id">Médico responsável</label>
                                <Select required className="form-control" value={this.state.pat_doc_usr_id} onChange={e => this.setState({ pat_doc_usr_id: e.value })} name="pat_doc_usr_id" id="pat_doc_usr_id" />
                            </div>
                        </div>
                        <div className="form-row top">
                            <div className="col-md-6">
                                <label htmlFor="pat_medicines">Medicamentos usados frequentemente</label>
                                <CKEditor
                                    required
                                    editor={ClassicEditor}
                                    data={this.state.pat_medicines}
                                    onChange={
                                        (event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ pat_medicines: data })
                                        }
                                    }
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="pat_diseases">Doenças/Alergias</label>
                                <CKEditor
                                    required
                                    editor={ClassicEditor}
                                    data={this.state.pat_diseases}
                                    onChange={
                                        (event, editor) => {
                                            const data = editor.getData();
                                            this.setState({ pat_diseases: data })
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>RESPONSÁVEL PRINCIPAL</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-8">
                                <label htmlFor="pat_resp_name1">Nome completo</label>
                                <input required type="text" value={this.state.pat_resp_name1} onChange={e => this.setState({ pat_resp_name1: e.target.value })} className="form-control" id="pat_resp_name1" name="pat_resp_name1" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_gender1">Sexo</label>
                                <select required className="form-control" value={this.state.pat_resp_gender1} onChange={e => this.setState({ pat_resp_gender1: e.target.value })} name="pat_resp_gender1" id="pat_resp_gender1">
                                    <option value=""></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_birth1">Data de nascimento</label>
                                <input required type="date" value={this.state.pat_resp_birth1} onChange={e => this.setState({ pat_resp_birth1: e.target.value })} className="form-control" id="pat_resp_birth1" name="pat_resp_birth1" />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_rg1">RG</label>
                                <InputMask
                                    mask="99.999.999-*"
                                    maskChar=""
                                    required type="text" value={this.state.pat_resp_rg1} onChange={e => this.setState({ pat_resp_rg1: e.target.value })} className="form-control" id="pat_resp_rg1" name="pat_resp_rg1"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_cpf1">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=""
                                    required type="text" value={this.state.pat_resp_cpf1} onChange={e => this.setState({ pat_resp_cpf1: e.target.value })} className="form-control" id="pat_resp_cpf1" name="pat_resp_cpf1"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_tel1">Telefone</label>
                                <InputMask 
                                    mask="(99) 99999-9999"
                                    maskChar=""
                                    required
                                    value={this.state.pat_resp_tel1} onChange={e => this.setState({ pat_resp_tel1: e.target.value })} className="form-control" id="pat_resp_tel1" name="pat_resp_tel1"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="pat_resp_email1">Email</label>
                                <input required type="email" value={this.state.pat_resp_email1} onChange={e => this.setState({ pat_resp_email1: e.target.value })} className="form-control" id="pat_resp_email1" name="pat_resp_email1" />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>OUTRO RESPONSÁVEL</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-8">
                                <label htmlFor="pat_resp_name2">Nome completo</label>
                                <input type="text" value={this.state.pat_resp_name2} onChange={e => this.setState({ pat_resp_name2: e.target.value })} className="form-control" id="pat_resp_name2" name="pat_resp_name2" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_gender2">Sexo</label>
                                <select className="form-control" value={this.state.pat_resp_gender2} onChange={e => this.setState({ pat_resp_gender2: e.target.value })} name="pat_resp_gender2" id="pat_resp_gender2">
                                    <option value=""></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_birth2">Data de nascimento</label>
                                <input type="date" value={this.state.pat_resp_birth2 || ''} onChange={e => this.setState({ pat_resp_birth2: e.target.value })} className="form-control" id="pat_resp_birth2" name="pat_resp_birth2" />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_rg2">RG</label>
                                <InputMask
                                    mask="99.999.999-*"
                                    maskChar=""
                                    type="text" value={this.state.pat_resp_rg2} onChange={e => this.setState({ pat_resp_rg2: e.target.value })} className="form-control" id="pat_resp_rg2" name="pat_resp_rg2"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_cpf2">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=""
                                    type="text" value={this.state.pat_resp_cpf2} onChange={e => this.setState({ pat_resp_cpf2: e.target.value })} className="form-control" id="pat_resp_cpf2" name="pat_resp_cpf2"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="pat_resp_tel2">Telefone</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    maskChar=""
                                    value={this.state.pat_resp_tel2} onChange={e => this.setState({ pat_resp_tel2: e.target.value })} className="form-control" id="pat_resp_tel2" name="pat_resp_tel2"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="pat_resp_email2">Email</label>
                                <input type="email" className="form-control" value={this.state.pat_resp_email2} onChange={e => this.setState({ pat_resp_email2: e.target.value })} id="pat_resp_email2" name="pat_resp_email2" />
                            </div>
                        </div>
                        <div className="top">
                            <Buttons handleClose={this.handleClose} className="top-15px" />
                        </div>
                    </form>
                </div>
                <Footer />
            </div>
        )
    }
}

export default PatientForm