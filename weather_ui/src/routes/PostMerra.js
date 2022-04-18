import React, { useState, Component } from 'react'
import axios from 'axios'
import { Button, Col, Container, Form, Row } from "react-bootstrap";


class PostQuery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userName: '',
			year: '',
			month: '',
			day: '',
			radarInfo: '',
			encoded_image: '',
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		axios
			.post('http://localhost:8081/save/query', {
				userName: this.state.userName,
				queryDetails: {
					day: this.state.day,
					year: this.state.year,
					month: this.state.month,
					radarInfo: this.state.radarInfo
				}
			})
			.then(response => {
				console.log(response)

				if (response.data === true) {
					this.setState({
						message: "Query Saved Successfully. Click Get Plot fetch the plot."
					})
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	submitHandlerPlot = e => {
		console.log('PLOT***')
		e.preventDefault()
		this.setState({
			encoded_image: ''
		});

		axios
			.get('http://localhost:8081/plot', {
				params:
				{
					year: this.state.year,
					month: this.state.month,
					day: this.state.day,
					radarInfo: this.state.radarInfo
				}
			})
			.then(response => {
				console.log(response)
				const { encoded_image } = response.data.body;
				if (encoded_image) {
					this.setState({
						encoded_image: "data:image/png;base64, " + encoded_image
					})
				}
			})
			.catch(error => {
				console.log(error)
			})
	}

	submitHandlerLogout = e => {
		e.preventDefault()
		axios
			.get("http://localhost:8081/logout", this.state)
			.then(response => {
				console.log(response)

				if (response.data === true) {
					this.setState({
						message: "Logging out now."
					})
					setTimeout(function () {
						console.log(window.location.assign("http://localhost:3000"));
					}, 1000);

				}

			})
			.catch(error => {
				console.log(error)
			})
	}

	render() {
		const { userName, year, month, day, radarInfo, encoded_image } = this.state
		console.log(this.state)
		let error = '';

		if (this.state.message) {
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
							<h6>Please wait for sometime after clicking Get Plot button</h6>
							<Form onSubmit={this.submitHandler}>
								<div>
									<Form.Group controlId="u">
										<Form.Label>Enter Username:</Form.Label>
										<Form.Control
											type="text"
											name="userName"
											value={userName}
											placeholder="Enter User Name"
											onChange={this.changeHandler}
										/>
									</Form.Group>
								</div>

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
											<center><img src={this.state.encoded_image}></img></center>
										</div>
									</Col>
								</Form></Row>
						</div>

						<div>
							<Row className="mt-1">
								<Form onSubmit={this.submitHandlerLogout}>
									<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
										<Button variant="success btn-block" type="submit">Logout</Button>
									</Col>
								</Form>
							</Row>
						</div>

						{error}
					</Col>
				</Row>
			</Container >
		)
	}
}

export default PostQuery