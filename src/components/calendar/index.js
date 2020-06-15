import React, { Component } from "react"
import Event from '../modal/index'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction";
import ptLocales from '@fullcalendar/core/locales/pt-br'

import './styles.css'
import api from "../../services/api"

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            show: false,
            age_id: '',
        };
        this.setEvents()
    }

    handleDateClick = info => {
        const age_full_date = info.dateStr.split("T")
        const age_date = age_full_date[0]
        const age_start = age_full_date[1]
        this.setState({
            show: true,
            age_id: '',
            age_date: age_date,
            age_start: age_start
        })       
    }

    handleClose = () => {
        this.setState({ show: false })
    }

    componentDidMount() {
        setTimeout(() => {
            this.setEvents()
        }, 10000)
    }
    
    Events = show => {
        if (show) {
            return <Event show={this.props.show} age_id={this.state.age_id} age_date={this.state.age_date} age_start={this.state.age_start} handleClose={this.handleClose} />
        } else {
            return null
        }
    }

    componentWillUnmount(){
        
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
            <div className="container-div body-content">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    timeZone="none"
                    defaultView="dayGridMonth"
                    locale={ptLocales}
                    slotDuration='00:30:00'
                    slotLabelInterval='00:30'
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        omitZeroMinute: false
                    }}
                    buttonText={{
                        today: 'Atual',
                        month: 'Meses',
                        listWeek: 'Consultas agendadas (Semana)',
                        listDay: 'Consultas agendadas (Hoje)'
                    }}
                    minTime="07:00:00"
                    maxTime="23:00:00"
                    eventTimeFormat={this.time}
                    header={{
                        left: 'prev,next,today, Click',
                        center: 'title',
                        right: 'dayGridMonth,listWeek,listDay'
                    }}
                    allDaySlot={false}
                    showNonCurrentDates={false}
                    contentHeight="auto"
                    hiddenDays={[0]}
                    events={this.state.events}
                    selectable={true}
                    dateClick={this.handleDateClick}
                    dragRevertDuration={0}
                    eventLimit={false}
                    displayEventEnd={true}
                    eventClick={this.eventClick}
                    noEventsMessage="Nenhuma consulta agendada"
                />
                {this.Events(this.state.show)}
            </div>
        )
    }
}

export default Calendar