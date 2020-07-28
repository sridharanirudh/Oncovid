import React from 'react'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

class HomeComponent extends React.Component {
	render() {
		return <div>
			<div className="banner-heading">
				<h1 className="ppt-blue">
					Cancer Survivorship plan
				</h1>
				<h3>
					
				</h3>
				<h4>
					
				</h4>
				<h4>
					Create a Survivorship plan or manage your Calendar.
				</h4>
				<h4>
					
				</h4>
			</div>
			<div className="home-buttons">
				<div className="row justify-content-md-center">
					<div className="col-md-auto">
						<Link to="/questionnare">
							<Button>
								View Calendar
							</Button>
						</Link>
					</div>
					<div className="col-md-auto">
						<Link to="/SurvivorshipPlanForm">
							<Button>
								Create a Plan
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	}
}

export default HomeComponent
