import React  from "react";
import './Login.scss';
import {loginUser} from '../../Store/Actions/LoginAction';
import {connect} from 'react-redux';
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mapStateToProps = (state) => ({
		isUserLoggedIn : state.Login.isUserLoggedIn,
		currentUserDetails : state.Login.currentUserDetails,
		loginError: state.Login.loginErrorMessage
})

const mapDispatchToProps = (dispatch) => {
		return {
				userLogin : (user) => dispatch(loginUser(user))
		}
}

class LoginComponent extends React.Component{

				constructor(props){
						super(props);
						
						this.state = {
								username : '',
								password : '',
								usernameError : '',
								passwordError : ''
						}
				}

			notify(){
				toast.success('Login Successful', {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}

				handleChange(e){
					if (e !== null && e.target.name !== null && e.target.value !== null) {
								this.setState({
										[e.target.name] : e.target.value
								})
					}
				}

				validateUsername(){
						if(this.state.username.trim().length === 0){
								this.setState({
										usernameError : 'username is required'
								})
								return false;
						}else{
								return true;
						}
				}

				validatePassword(){
						if(this.state.password.trim().length === 0){
								this.setState({
										passwordError : 'password is required'
								})
								return false;
						}else{
								return true;
						}
				}

			 handleSubmit(e){
						e.preventDefault();
						let validUserName =   this.validateUsername();
						let validPassword = this.validatePassword();
						if(validUserName && validPassword){
								 this.props.userLogin({username: this.state.username, password : this.state.password});	
						}  
				}

			render(){
						let loginError = '';
						if(this.props.isUserLoggedIn){
							{this.notify()}
							return <Navigate replace to="/"></Navigate>
						} else if (this.props.loginError === 'No user found'){
										loginError  = "Sorry,there is no user with this username and password"
						} else if (this.props.loginError === 'Incorrect Password!'){
										loginError = "Sorry, password is incorrect!"
						}
						return(
								<div className="login-outer-container">
										<div className='left-container'>
												<div className="left-inner">
														<div className='logo-container'>
														</div>
												</div>
										</div>
										<div className="right-container">
												<div className='right-inner'>
														<form onSubmit={this.handleSubmit.bind(this)}>
																<h1>Login</h1>
																<p>Don't have an account yet?&nbsp;<a href="http://localhost:3000/SignUp">Sign Up!</a></p>
																<br/>
																<div className="username-container">
																		<label><strong>Username</strong></label>
																		<input type="text" name="username" className="form-input" placeholder="Enter your username..." onChange={this.handleChange.bind(this)}/>
																		{this.state.usernameError && <p>{this.state.usernameError}</p>}
																</div>
																<div className="password-container">
																		<label><strong>Password</strong></label>
																		<input type="password" name="password" className="form-input" placeholder="Enter your password..." onChange={this.handleChange.bind(this)}/>
																		{this.state.passwordError && <p>{this.state.passwordError}</p>}
																</div>
																<div className="button-container">
																		<h4><a href="http://localhost:3000/forgot-password">Forgot Password?</a></h4>
																		<button type="submit">Login</button>
																		{loginError && <p>{loginError}</p>}
																</div>
														</form>
												</div>
										</div>
								</div>  						
						)
				}	
}
const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default Login;