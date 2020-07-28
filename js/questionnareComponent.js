import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Loader from 'react-loader'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

class questionnareComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
    events: [
      {
        start: "07/28/2020",
        end: "07/28/2020",
        title: "Pathologist Dr. A ( Recommended )"
      },
      {
      	start: "07/02/2020",
      	end: "07/02/2020",
      	title: "Dentist Dr. B ( Necessary )"
      },
      {
        start: "07/07/2020",
        end: "07/07/2020",
        title: "Pathologist Dr. C ( Necessary )"
      },
      {
        start: "07/12/2020",
        end: "07/12/2020",
        title: "Oncologist Dr. D ( Necessary )"
      },
       {
        start: "07/25/2020",
        end: "07/25/2020",
        title: "Psychotherapist Dr. E ( Necessary )"
      },
       {
        start: "06/28/2020",
        end: "06/28/2020",
        title: "Physical Therapist Dr. F ( Recommended )"
      }     
    ]
  };
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
	}

	handleSubmit(event) {
		const formData = new FormData();
		// console.log(event.target.heartRate)
		const heartRate = findDOMNode(this.refs.heartRate);
		console.log(heartRate)
    	formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axios.post('/questionnare/form', formData, config)
	}

	handleUpload(event) {
		console.log(event.target.files)
		this.setState({file: event.target.files[0]})
	}

	showResult() {
		const { result } = this.state
		let variant, message
		if (result < 0.9) {
			variant = 'success'
			message = 'There is a low chance you have COVID-19'
		} else {
			variant = 'danger'
			message = 'There is a high chance you have COVID-19. Please contact a health care professional.'
		}
		return <div className="row justify-content-md-center file-input">
			<div className="banner-heading">
				<Alert variant={variant}>
					{message}
				</Alert>
			</div>
		</div>
	}


	render() {
		const { loading, file, result } = this.state
		return <div className="row justify-content-md-center file-input"> <Form noValidate onSubmit={this.handleSubmit}>
  <h2></h2>
  <div className="App">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: "100vh" }}
        />
  </div>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> </div>
	}
}

export default questionnareComponent
