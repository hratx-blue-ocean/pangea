import React, { Component } from 'react';
import '../main.scss';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

import CalEvent from './CalEvent';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      events: props.events,
      addEvent: false
    }

    this.handleDateClick = this.handleDateClick.bind(this);
    this.closeEventModal = this.closeEventModal.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }

  handleDateClick(arg) {
    this.setState({
      addEvent: true,
      selectedDate: arg.dateStr
    })
  }

  closeEventModal() {
    this.setState({addEvent: false})
  }

  addEvent(event) {
    const newEvent = {
      userId: this.state.userId,
      event: event
    }

    axios.post('/api/createEvent', newEvent)
      .then(() => {
        this.setState(prevState => ({
          events: [...prevState.events, event],
          addEvent: false
        }))
      })
      .catch(err => console.error(err, 'Could not add event'));
  }


  render() {
    return (
      <>
        <div id='calendar'>
          <FullCalendar 
            defaultView='dayGridMonth' 
            plugins={[ dayGridPlugin, interactionPlugin]} 
            selectable='true'
            dateClick={this.handleDateClick}
            events={this.state.events}
          />
        </div>
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
