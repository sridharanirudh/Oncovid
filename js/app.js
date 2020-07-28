import React from 'react'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import HomeComponent from './homecomponent'
import SurvivorshipPlanFormComponent from './SurvivorshipPlanForm'
import questionnareComponent from './questionnareComponent'
import schedulerComponent from './scheduler'

class App extends React.Component {
	render() {
		return <div>
			<Switch>
					<Route exact path='/' component={HomeComponent} />
					<Route exact path='/SurvivorshipPlanForm' component={SurvivorshipPlanFormComponent} />
					<Route exact path='/scheduler' component={schedulerComponent} />

				</Switch>
		</div>
	}
}

export default withRouter(App)
