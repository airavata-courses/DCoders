import React, { Component } from 'react'
import axios from 'axios'
import {Button, Col, Container, Form, Row} from "react-bootstrap";


class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userName: '',
			password: '',
		}
	}

	changeHandler = e => {
		this.setState({ [e.target.name]: e.target.value })
	}

	submitHandler = e => {
		e.preventDefault()
		axios
			.post('http://localhost:8081/login', this.state)
			.then(response => {
				console.log(response)
				
                if(response.data===true){
                    console.log(window.location.assign("http://localhost:3000/GetQuery"))
                }
				
                else{
						this.setState({
							message: "Login Failed. Redirecting to login page. "
						})
						setTimeout(function() {
						console.log(window.location.assign("http://localhost:3000"));}, 2000);
                }
			})
			.catch(error => {
				console.log(error)
			})
	}

	submitHandlerRegister = e => {
		e.preventDefault()
		axios
			.post('http://localhost:8081/register', this.state)
			.then(response => {
				console.log(response.data)
				
                if(response.data===true){
                	this.setState({
                		message: "Registration successful, please login to continue."
                	})
                	setTimeout(function(){
					console.log(window.location.assign("http://localhost:3000"));},2000);

                }
				else{
					this.setState({
						message: "Registration Failed. Redirecting to login page. "
					})
					setTimeout(function(){
					console.log(window.location.assign("http://localhost:3000"));}, 2000);
			}
			})
			.catch(error => {
				console.log(error)
			})
	}


	render() {
		const { userName, password } = this.state

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

				<h1 className="shadow-sm text-success mt-5 p-3 text-center rounded">Login Page</h1>
				<h5>Please login to continue, if youjust registered, you will be redirected to login page.</h5>
				<Row className="mt-7">
				<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
					<div>
						<Form onSubmit={this.submitHandler}>
							<div>
								<Form.Group controlId="user">
									<Form.Label>Enter Username:</Form.Label>
									<Form.Control
										type="text" 
										name="userName"
										value={userName}
										placeholder="Enter Username" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>
							<div>
								<Form.Group controlId="pass">
									<Form.Label>Enter Password:</Form.Label>
									<Form.Control
										type="password" 
										name="password"
										value={password}
										placeholder="Enter Password" 
										onChange={this.changeHandler}
									/>
								</Form.Group>
							</div>
							
							<Row className="mt-11">
								<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
									<Button variant="success btn-block" onclick="IsEmpty()" type="submit">Login</Button>
								</Col>
							</Row>
						</Form>
					</div>

					<div>
					<Row className="mt-1">
						<Form onSubmit={this.submitHandlerRegister}>
							<Col lg={5} md={6} sm={12} className="p-5 m-auto shadow-sm rounded-lg">
								<Button variant="success btn-block" type="submit">Register</Button>
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

export default Login