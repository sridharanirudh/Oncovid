import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class HomeComponent extends React.Component {
	render() {
		return <div>
			<div className="banner-heading">
				<h1 className="ppt-orange">
					COVID-Net
				</h1>
				<h3>
					Platform to improve workflow for patients & physicians augmented with recommendation systems.
				</h3>
			</div>
			<div className="home-buttons">
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<Link to="/self-diagnose">
							<Button>
								Self Diagnose for COVID-19 Symptoms
							</Button>
						</Link>
					</div>
					<div className="col-md-auto">
						<Link to="/xray">
							<Button>
								X-Ray
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	}
}

export default HomeComponent
