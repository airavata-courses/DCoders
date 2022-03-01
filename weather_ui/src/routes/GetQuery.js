import React, { Component } from 'react'
import axios from 'axios'
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {Link} from 'react-router-dom'

class GetQuery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userName: '',
			list:[]
		}
	}
	
	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		axios
			.get('http://localhost:8081/get/query', {params: this.state})
			.then(response => {
				this.setState({
					list:response.data
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { userName,list } = this.state		
		let tb_data = list.map((item)=>{
			return(
				<tr key={item.queryDetails.radarInfo}>
					<td>{item.queryDetails.year}</td>
					<td>{item.queryDetails.month}</td>
					<td>{item.queryDetails.day}</td>
					<td>{item.queryDetails.radarInfo}</td>
				</tr>
			)
		})

		return (
			<div>
				<div>
					<Container>
						<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Get Query Details</h1>
						<Row className="mt-7">
						<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
							<div>
								<Form onSubmit={this.submitHandler}>
									<div>
										<Form.Group controlId="user">
											<Form.Label>Enter Username to get your all previous query details:</Form.Label>
											<Form.Control
												type="text" 
												name="userName"
												value={userName}
												placeholder="Enter Username" 
												onChange={this.changeHandler}
											/>
										</Form.Group>
									</div>
									
									<Row className="mt-11">
										<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
											<Button variant="success btn-block" type="submit">Get Query details for User.</Button>
										</Col>
									</Row>
								</Form>
							</div>
							<div><Link to="/PostQuery">Click here to enter a new query.</Link></div>
					</Col>
					</Row>
				</Container>
			</div>
			
			<div className='container'>
				<table className='table table-striped'>
					<thead>
						<tr>
							<th>Year</th>
							<th>Month</th>
							<th>Day</th>
							<th>RadarInfo</th>
						</tr>
					</thead>
					<tbody>
						{tb_data}
					</tbody>
				</table>
			</div>
		</div>
		)		
	}
}

export default GetQuery