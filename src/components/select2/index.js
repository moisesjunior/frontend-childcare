import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';
import api from "../../services/api";

const filterData = async (inputValue) => {
    const data = await api.get('/grupo/2')
    const response = data.data
    
    return response.filter(i =>
        i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

const promiseOptions = inputValue =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve(filterData(inputValue));
        }, 1000);
    });

export default class Select extends Component {
    constructor(props){
        super(props)
        this.state = {
            onChange: props.onChange,
            value: props.value
        }
    }

    render() {
        return (
            <AsyncSelect setValue={this.props.value} onChange={this.state.onChange} defaultOptions loadOptions={promiseOptions} />
        );
    }
}
