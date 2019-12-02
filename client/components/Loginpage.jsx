import React, { Component } from "react";

const Login = ({ verification }) => {
	return (
		<div id="login">
			Login
			<form onSubmit={verification}>
				User:
				<input type="text" name="username" id="user"></input>
				Password:
				<input type="text" name="password" id="password"></input>
				<button name=" button" id="button" type="submit">
					Login
				</button>
			</form>
		</div>
	);
};
export default Login;
