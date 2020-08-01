import React from 'react'
import { Calendar, Views, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'

const localizer = momentLocalizer(moment)

const events = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(2015, 3, 0),
    end: new Date(2015, 3, 1),
  },
  {
    title: 'Long Event',
    start: new Date(2015, 3, 7),
    end: new Date(2020, 7, 31),
  },
]

class CalendarComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			events: []
		}
		this.onSelectEvent = this.onSelectEvent.bind(this)
	}
	componentDidMount() {
		this.fetchAppointments()
	}
	fetchAppointments() {
		axios.get('/get_appointments')
			.then(res => {
				let e = []
				console.log(res.data)
				res.data.forEach((appointment) => {
					let [_id, title, start, zone] = appointment
					e.push({
						_id: _id,
						title: title,
						start: new Date(start),
						end: new Date(new Date(start).valueOf() + 30 * 60 * 1000),
						allDay: false
					})
				})
				this.setState({events: e})
			})
			.catch(res => {
				console.log('error', res)
			})
	}
	onSelectEvent(e) {
		console.log(e)
	}
	render() {
		const { events } = this.state
		console.log(events)
		return <div>
			<Calendar
				events={events}
				step={15}
				timeslots={8}
				localizer={localizer}
				defaultView={Views.WEEK}
				defaultDate={new Date()}
				onSelectEvent={this.onSelectEvent}
				style={{ height: 500 }}
			/>
		</div>
	}
}

export default CalendarComponent
