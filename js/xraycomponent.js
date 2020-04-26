import React from 'react'
import axios from 'axios'

class XRayComponent extends React.Component {
	constructor(props) {
		super(props)
		this.state = {loading: false}
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
		console.log(event)
		this.setState({file: event.target.files[0]})
	}
	render() {
		const { loading } = this.state
		if (loading) {
			return <div> LOADING </div>
		} else {
			return <div>
				<form onSubmit={this.handleSubmit}>
					<input
						type="file"
						name="file"
						id="file"
						onChange={this.handleUpload}
						className="inputfile"
					/>
					<input type="submit" value="Submit" />
				</form>
				</div>
		}
	}
}

export default XRayComponent
