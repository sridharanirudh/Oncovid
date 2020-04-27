import React from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class XRayComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loading: false, file: null, result: null}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUpload = this.handleUpload.bind(this)
	}
	fileUpload(file) {
		const formData = new FormData();
    formData.append('file',file)
		const config = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}
		return axios.post('/api/upload_and_predict', formData, config)
	}
	handleSubmit(event) {
		const { file } = this.state
		event.preventDefault()
		this.fileUpload(file)
			.then(res => {
				console.log(res)
			})
			.catch(res => {
				console.log(res)
			})
	}
	handleUpload(event) {
		console.log(event.target.files)
		this.setState({file: event.target.files[0]})
	}
	render() {
		const { loading, file } = this.state
		console.log(file)
		if (loading) {
			return <div> LOADING </div>
		} else {
			return <div>
				<div className="banner-heading">
					<h1 className="ppt-orange">
						X-Ray Analysis
					</h1>
					<h3>
						Platform to improve workflow for patients & physicians augmented with recommendation systems.
					</h3>
				</div>
				<div className="row justify-content-md-center file-input">
						<div className="col-md-4">
							<Form onSubmit={this.handleSubmit}>
									<Form.File 
										id="file"
										label={file ? file.name : "Please select a file"}
										custom
										onChange={this.handleUpload}
									/>
									<Button variant="primary" type="submit">
										Submit
									</Button>
							</Form>
						</div>
				</div>
				<div className="row justify-content-md-center file-input">
				</div>
			</div>
		}
	}
}

export default XRayComponent
