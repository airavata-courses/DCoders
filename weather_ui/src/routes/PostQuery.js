import React, {useState, Component } from 'react'
import axios from 'axios'
import {Button, Col, Container, Form, Row} from "react-bootstrap";


class PostQuery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userName: '',
			year: '',
			month: '',
			day:'',
			radarInfo:'',
			encoded_image: '',
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		axios
			.post('http://localhost:8081/save/query', this.state)
			.then(response => {
				console.log(response)
				
                if(response.data===true){   
						this.setState({
							message: "Query Saved Successfully. Please enter details to fetch the plot."
						})
                }
			})
			.catch(error => {
				console.log(error)
			})
	}

	submitHandlerPlot = e => {
		e.preventDefault()
		axios
			.get('http://localhost:8081/plot', this.state)
			.then(response => {
				this.setState({
					encoded_image:"data:image/png;base64, " + response.data.encoded_image
				})
			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { userName, year, month, day, radarInfo, encoded_image} = this.state
		//console.log(this.state)
		let error = '';

		if (this.state.message){
			error = (
				<div className='alert-alert-danger' role='alert'>
					{this.state.message}
				</div>
			)
		}

		return (
			<Container>

				<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Query Page</h1>
				<Row className="mt-7">
				<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
					<div>
						
						<Form onSubmit={this.submitHandler}>
							<div>
								<Form.Group controlId="y">
									<Form.Label>Enter Year:</Form.Label>
									<Form.Control
										type="text" 
										name="year"
										value={year}
										placeholder="Enter Year" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>
							<div>
								<Form.Group controlId="m">
									<Form.Label>Enter Month:</Form.Label>
									<Form.Control
										type="text" 
										name="month"
										value={month}
										placeholder="Enter Month" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>

							<div>
								<Form.Group controlId="d">
									<Form.Label>Enter Day:</Form.Label>
									<Form.Control
										type="text" 
										name="day"
										value={day}
										placeholder="Enter day" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>

							<div>
								<Form.Group controlId="r">
									<Form.Label>Enter Radar Info:</Form.Label>
									<Form.Control
										type="text" 
										name="radarInfo"
										value={radarInfo}
										placeholder="Enter Radar Info" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>
							
							<Row className="mt-11">
								<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
									<Button variant="success btn-block" type="submit">Save Query</Button>
								</Col>
							</Row>
						</Form>
					</div>

					<div>
					<Row className="mt-1">
						<Form onSubmit={this.submitHandlerPlot}>
							<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
								<Button variant="success btn-block" type="submit">Get Plot</Button>
								<div>
									<img src={this.state.encoded_image}></img>
								</div>
							</Col>
						</Form></Row>
					</div>

			{error}
			</Col>
			</Row>
		</Container>
		)
	}
}

export default PostQuery