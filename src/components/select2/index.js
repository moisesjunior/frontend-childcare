import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
import api from "../../services/api";
import { stateOptions, medicalOptions} from '../../services/data'


export default class Select extends Component {
    constructor(props){
        super(props)
        this.state = {
            onChange: props.onChange,
            selectedValue: props.value,
            name: props.name,
            type: props.type,
            options: []
        }
    }
    
    componentDidMount = async () => {
        let data = ""
        switch (this.props.type) {
            case 'doctor':
                data = await api.get('/grupo/2')
                this.setState({ options: data.data })
                break
            case 'patient':
                data = await api.get('/patient/list')
                this.setState({ options: data.data })
                console.log(this.state)
                break
            case 'state':
                this.setState({ options: stateOptions })
                break
            case 'speciality':
                this.setState({ options: medicalOptions })
                break
            default:
                this.setState({ options: "" })
                break
        }
    }

    filterData = async (inputValue) => {
        return this.state.options.filter(i =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    selectedData = value => {
        const valor = this.state.options.find(k => value === k.value);
        
        return valor;
    };

    promiseOptions = inputValue =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(this.filterData(inputValue));
            }, 1000);
        });
    
    render() {
        return (
            <AsyncSelect cacheOptions value={this.selectedData(this.props.value)} onChange={this.state.onChange} defaultOptions loadOptions={this.promiseOptions} />
        );
    }
}
