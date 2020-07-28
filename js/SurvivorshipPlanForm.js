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

class SurvivorshipPlanFormComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
    events: [
      {
        start: moment().toDate(),
        end: moment()
          .add(1, "days")
          .toDate(),
        title: "Some title"
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
		return <div className="row justify-content-md-center file-input"> <Form noValidate onSubmit={this.handleSubmit}>
  <h2>Add to Survivorship plan</h2>
  <Form.Group controlId="exampleForm.ControlInput1">
    <Form.Label>Patient ID</Form.Label>
    <Form.Control ref="heartRate" type="textarea" rows="2" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect2">
    <Form.Label>Specialist Referral</Form.Label>
    <Form.Control as="select" multiple>
      <option>Radiologist</option>
      <option>Physician</option>
      <option>Dentist</option>
      <option>Oncologist</option>
      <option>Pathologist</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlSelect1">
    <Form.Label>Necessary or Recommended</Form.Label>
    <Form.Control as="select">
      <option>Necessary</option>
      <option>Recommended</option>
    </Form.Control>
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Reason for Visit</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Label>Enter Dates:</Form.Label>
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> </div>
}
}

export default SurvivorshipPlanFormComponent
