import React, { Component } from "react"
import Modal from '../modal/index'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";

import './styles.css'
import api from "../../services/api"

const Teste = props => {
    if (props.show) {
        return <Modal show={props.show} age_id={props.age_id} handleClose={props.handleClose} />
    } else {
        return null
    }
}

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            events: [],
            age_id: '',
        };
    }

    handleDateClick = () => {
        this.setState({
            show: true,
            age_id: ''
        })       
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    componentDidMount() {
        this.setEvents()
        this.event = setInterval(
            () => this.setEvents(),
            300000
        );
    }

    time = {
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
        textColor: 'black'
    }

    setEvents = async () => {
        const response = await api.get('/event')
        this.setState({
            events: response.data
        })
    } 

    eventClick = (info) => {
        this.setState({
            show: true,
            age_id: info.event.id
        })
    }

    render(){
        return(
            <div className="container-div">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    defaultView="timeGridWeek"
                    locale="pt-br"
                    slotDuration='00:10:00'
                    slotLabelInterval='00:30'
                    minTime="08:00:00"
                    maxTime="22:00:00"
                    eventTimeFormat={this.time}
                    header={{
                        left: 'prev,next,today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,listDay'
                    }}
                    allDaySlot={false}
                    showNonCurrentDates={false}
                    contentHeight="auto"
                    hiddenDays={[0]}
                    events={this.state.events}
                    selectable={true}
                    dateClick={this.handleDateClick}
                    dragRevertDuration={0}
                    eventLimit={true}
                    displayEventEnd={true}
                    eventClick={this.eventClick}
                />
                <Teste show={this.state.show} age_id={this.state.age_id} handleClose={this.handleClose}/>
            </div>
        )
    }
}

export default Calendar