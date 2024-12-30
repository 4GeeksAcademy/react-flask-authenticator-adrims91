import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-between">
				<div>
					<Link className="btn btn-primary" to="/">Home</Link>
				</div>
				<div>
					<Link className="m-1 btn btn-primary" to="/login">Login</Link>
					<Link className="m-1 btn btn-primary" to="/register">Register</Link>
				</div>
			</div>
		</nav>
	);
};
