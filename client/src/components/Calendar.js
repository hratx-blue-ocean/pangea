import React, { Component } from 'react';
import '../main.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import CalEvent from './CalEvent';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { title: 'event 1', displayEventTime: true, allDay: false, start: '2020-06-21T12:30:00', end: '2020-06-21T13:30:00'},
        { title: 'event 2', start: '2020-06-21T16:30:00' }
      ],
      addEvent: false
    }

    this.handleDateClick = this.handleDateClick.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  handleDateClick(arg) {
    console.log(arg);
    this.setState({
      addEvent: true,
      selectedDate: arg.dateStr
    })
  }

  closeEventModal() {
    this.setState({addEvent: false})
  }

  addEvent(event) {
    this.setState(prevState => ({
      events: [...prevState.events, event],
      addEvent: false
    }))
  }


  render() {
    return (
      <>
        <FullCalendar 
          defaultView='dayGridMonth' 
          plugins={[ dayGridPlugin, interactionPlugin]} 
          selectable='true'
          dateClick={this.handleDateClick}
          events={this.state.events}
        />
        <CalEvent 
          show={this.state.addEvent} 
          close={this.closeEventModal} 
          date={this.state.selectedDate} 
          addEvent={this.addEvent}
        />
      </>
    )
  }
}

export default Calendar;
