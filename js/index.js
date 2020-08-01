import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Calendar from './calendar'

ReactDOM.render(
	<BrowserRouter>
		<Calendar />
	</BrowserRouter>,
	document.getElementById('calendar')
)
