import React, { Component } from "react";

import './styles.css';
import Navigation from '../../components/header/index'
import Footer from '../../components/footer/index'
import api from "../../services/api";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

class Home extends Component{
    constructor(props){
        super(props)

        this.state = {
            consulta: [],
            atendimento: [],
            eventos: [],
            consulta: "",
            atendimento: "",
            Table: ""
        }
    }
    
    tableBody = async () => {
        let res = await api.get('/graph');
        const response = Object.values(res.data[2])

        const linhas = response[0].map((linha, index) => {
            return (
                <tr key={index}>
                    <td>{linha.age_paciente}</td>
                    <td>{linha.age_data}</td>
                    <td>{linha.age_horario}</td>
                </tr>
            )
        })

        this.setState({
            Table: 
                <tbody>
                    {linhas}
                </tbody>
        })  
    }

    componentDidMount = async ()  => {
        this.tableBody()

        let res = await api.get('/graph');
        const con = Object.values(res.data[0])
        const ate = Object.values(res.data[1])

        console.log(con, ate)

        // Gráfico para tipos de consultas
        let chart = am4core.create("chartCon", am4charts.PieChart);
        chart.data = con;
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "label";
        chart.innerRadius = am4core.percent(40);
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        this.chart = chart

        // Gráfico para tipos de atendimento
        let chart2 = am4core.create("chartAte", am4charts.PieChart);
        chart2.data = ate
        let pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "value";
        pieSeries2.dataFields.category = "label";
        chart2.innerRadius = am4core.percent(40);
        pieSeries2.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries2.slices.template.strokeWidth = 2;
        pieSeries2.slices.template.strokeOpacity = 1;
        this.chart2 = chart2
    }

    componentWillUnmount(){
        if (this.chart) {
            this.chart.dispose();
        }
        if(this.chart2){
            this.chart2.dispose();
        }
    }

    render(){
        return(
            <div>
                <Navigation />
                <div className="container">
                    <div className="home-title">
                        <h3>Home</h3>
                    </div>
                    <div className="center margin-home">
                        <table className="table-home table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>Agendamentos da semana</th>
                                    <th>Dia</th>
                                    <th>Horário</th>
                                </tr>
                            </thead>
                            {this.state.Table}
                        </table>
                    </div>
                    <div className="div-master">
                        <div className="chart-right">
                            <h4 >% de consultas por tipo de consulta</h4>
                            <div id="chartCon"></div>
                        </div>
                        <div className="chart-left">
                            <h4>% de consultas por tipo de consulta</h4>
                            <div id="chartAte"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default Home