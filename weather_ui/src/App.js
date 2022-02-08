import React, { Component } from 'react'
import './App.css'
import Login from './routes/Login';
import GetQuery from './routes/GetQuery';
import PostQuery from './routes/PostQuery';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

class App extends Component {
	render() {
		return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/GetQuery" element={<GetQuery />} />
					<Route path="/PostQuery" element={<PostQuery />} />
				</Routes>
			</Router>
		</div>
		)
	}
}

export default App


