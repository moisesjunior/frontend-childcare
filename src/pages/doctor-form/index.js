import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/'
import Footer from '../../components/footer/'
import Buttons from '../../components/buttons'
import api from "../../services/api";
import InputMask from 'react-input-mask';
import axios from "axios";
import swal from '@sweetalert/with-react'
import Select from '../../components/select2'

class DoctorForm extends Component {
    constructor(props) {
        super(props);

        this.stateInicial = {
            usr_id: this.props.location.state.id,
            action: this.props.location.state.action,
            usr_email: "",
            usr_password: "",
            usr_password2: "",
            usr_name: "",
            usr_rg: "",
            usr_cpf: "",
            usr_tel: "",
            usr_gender: "",
            usr_birth: "",
            usr_cep: "",
            usr_street: "",
            usr_neighborhood: "",
            usr_number: "",
            usr_complement: "",
            usr_city: "",
            usr_state: "",
            usr_crm: "",
            usr_uf_crm: "",
            usr_espec: ""
        }

        this.state = this.stateInicial

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    loadValues = async () => {
        const response = await api.get('/doctor/' + this.state.usr_id)
        this.setState({
            usr_id: response.data[0].usr_id,
            usr_email: response.data[0].usr_email,
            usr_name: response.data[0].usr_name,
            usr_rg: response.data[0].usr_rg,
            usr_cpf: response.data[0].usr_cpf,
            usr_tel: response.data[0].usr_tel,
            usr_gender: response.data[0].usr_gender,
            usr_birth: response.data[0].usr_birth,
            usr_cep: response.data[0].usr_cep,
            usr_street: response.data[0].usr_street,
            usr_neighborhood: response.data[0].usr_neighborhood,
            usr_number: response.data[0].usr_number,
            usr_complement: response.data[0].usr_complement,
            usr_city: response.data[0].usr_city,
            usr_state: response.data[0].usr_state,
            usr_crm: response.data[0].usr_crm,
            usr_uf_crm: response.data[0].usr_uf_crm,
            usr_espec: response.data[0].usr_espec
        })
    }

    componentDidMount() {
        if (this.state.usr_id) {
            this.loadValues()
        }
    }

    onChangeCEP = async (cep) => {
        this.setState({ usr_cep: cep })
        let newCep = cep.replace(/-/gi, "")
        if (newCep.length > 7) {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            this.setState({
                usr_street: response.data.logradouro,
                usr_neighborhood: response.data.bairro,
                usr_city: response.data.localidade,
                usr_state: response.data.uf
            })
        } else {
            this.setState({
                usr_street: "",
                usr_neighborhood: "",
                usr_city: "",
                usr_state: ""
            })
        }
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async e => {
        e.preventDefault()
        if(this.state.error !== ''){
            swal("AVISO", "Verifique se as credenciais inseridas estão corretas!", "error");
        }
        try {
            if (this.state.usr_id) {
                const response = await api.put('/doctor/' + this.state.usr_id, this.state)
                swal("AVISO", response.data, "success", { closeOnClickOutside: false })
                    .then(() => {
                        window.location.href = '/medicos'
                    })
            } else {
                const response = await api.post('/doctor', this.state)
                swal("AVISO", response.data, "success", { closeOnClickOutside: false })
                    .then(() => {
                        window.location.href = '/medicos'
                    })
            }
        } catch (error) {
            this.setState({
                error: error.response.data
            })
            swal("AVISO", error.response.data, "error");
        }
    }

    handlePasswordLength = () => {
        let passValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

        if (this.state.usr_password !== '') {
            if (this.state.usr_password.match(passValid) === null) {
                this.setState({
                    error: "As senhas precisam ter entre 8 e 15 caracteres e conter no minímo uma letra minúscula, uma letra maiúscula, um número e um caracter especial"
                })
            } else if (this.state.usr_password2 !== this.state.usr_password) {
                this.setState({
                    error: "As senhas não coincidem, entrar com a mesma senha por favor!!"
                })
            } else {
                this.setState({
                    error: ""
                })
            }
        }
    }

    handleClose = () => {
        window.location = "/medicos"
    }

    adicionar = () => {
        if(this.state.action === "adicionar"){
            return (
                <div>
                    <div className="sub-title" >
                        <h3>DADOS DE ACESSO</h3>
                    </div >
                    <div className="form-row top-15px">
                        <div className="col-md-6">
                            <label htmlFor="usr_email">E-mail</label>
                            <input type="email" autoComplete="new-password" className="form-control" value={this.state.usr_email} onChange={this.handleChange} id="usr_email" name="usr_email" />
                        </div>
                    </div>
                    <div className="form-row top-15px">
                        <div className="col-md-3">
                            <label htmlFor="usr_password">Senha</label>
                            <input type="password" autoComplete="new-password" className="form-control" value={this.state.usr_password} onBlur={this.handlePasswordLength} onChange={e => this.setState({usr_password: e.target.value})} id="usr_password" name="usr_password" />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="usr_password2">Confirmar senha</label>
                            <input type="password" autoComplete="new-password2" className="form-control" value={this.state.usr_password2} onBlur={this.handlePasswordLength} onChange={e => this.setState({ usr_password2: e.target.value })} id="usr_password2" name="usr_password2" />
                        </div>
                    </div>
                    <div className="form-row top-15px">
                        {this.state.error && <p className="required">{this.state.error.toString()}</p>}
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <Navigation />
                <h2 className="title">Formulário do médico</h2>
                <div className="container">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" className="form-control hidden" id="usr_id" name="usr_id" />   
                        {this.adicionar()}
                        <div className="sub-title top-15px">
                            <h3>DADOS GERAIS</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-8">
                                <label htmlFor="usr_name">Nome completo</label>
                                <input type="text" required value={this.state.usr_name} onChange={this.handleChange} className="form-control" id="usr_name" name="usr_name" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_rg">RG</label>
                                <InputMask
                                    mask="99.999.999-*"
                                    maskChar=""
                                    required
                                    type="text" value={this.state.usr_rg} onChange={this.handleChange} className="form-control" id="usr_rg" name="usr_rg"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_cpf">CPF</label>
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar=""
                                    required
                                    type="text" value={this.state.usr_cpf} onChange={this.handleChange} className="form-control" id="usr_cpf" name="usr_cpf"
                                />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="usr_tel">Telefone</label>
                                <InputMask
                                    mask="(99) 99999-9999"
                                    maskChar=""
                                    required
                                    value={this.state.usr_tel} onChange={this.handleChange} className="form-control" id="usr_tel" name="usr_tel"
                                />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_gender">Sexo</label>
                                <select required className="form-control" value={this.state.usr_gender} onChange={this.handleChange} name="usr_gender" id="usr_gender">
                                    <option value=""></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Feminino</option>
                                </select>
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_birth">Data de nascimento</label>
                                <input required type="date" value={this.state.usr_birth} onChange={this.handleChange} className="form-control" id="usr_birth" name="usr_birth" />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>ENDEREÇO</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="usr_cep">CEP</label>
                                <InputMask
                                    mask="99999-999"
                                    maskChar=""
                                    required type="text" value={this.state.usr_cep} onChange={e => this.onChangeCEP(e.target.value)} className="form-control" id="usr_cep" name="usr_cep"
                                />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="usr_street">Rua</label>
                                <input required type="text" disabled value={this.state.usr_street} onChange={this.handleChange} className="form-control" id="usr_street" name="usr_street" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="usr_neighborhood">Bairro</label>
                                <input required type="text" disabled value={this.state.usr_neighborhood} onChange={this.handleChange} className="form-control" id="usr_neighborhood" name="usr_neighborhood" />
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="usr_number">Número</label>
                                <input required type="text" value={this.state.usr_number} onChange={this.handleChange} className="form-control" id="usr_number" name="usr_number" />
                            </div>
                            <div className="col-md-1">
                                <label htmlFor="usr_complement">Complemento</label>
                                <input type="text" value={this.state.usr_complement} onChange={this.handleChange} className="form-control" id="usr_complement" name="usr_complement" />
                            </div>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-2">
                                <label htmlFor="usr_city">Cidade</label>
                                <input required type="text" disabled value={this.state.usr_city} onChange={this.handleChange} className="form-control" id="usr_city" name="usr_city" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_state">Estado</label>
                                <input required type="text" disabled value={this.state.usr_state} onChange={this.handleChange} className="form-control" id="usr_state" name="usr_state" />
                            </div>
                        </div>
                        <div className="sub-title top">
                            <h3>PROFISSIONAL</h3>
                        </div>
                        <div className="form-row top-15px">
                            <div className="col-md-3">
                                <label htmlFor="usr_crm">Número CRM</label>
                                <input type="text" value={this.state.usr_crm} onChange={this.handleChange} className="form-control" id="usr_crm" name="usr_crm" />
                            </div>
                            <div className="col-md-2">
                                <label htmlFor="usr_uf_crm">UF CRM</label>
                                <Select 
                                required 
                                className="form-control" 
                                value={this.state.usr_uf_crm} 
                                onChange={e => this.setState({ usr_uf_crm: e.value})} 
                                type="state" name="usr_uf_crm" id="usr_uf_crm">
                                </Select>
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="usr_espec">Especialidade</label>
                                <Select
                                    required
                                    className="form-control"
                                    value={this.state.usr_espec}
                                    onChange={e => this.setState({ usr_espec: e.value })} 
                                    type="speciality" name="usr_espec" id="usr_espec">
                                </Select>
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

export default DoctorForm