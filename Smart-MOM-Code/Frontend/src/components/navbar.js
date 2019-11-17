import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'


class Navbar extends Component {
    render(){
        console.log("Hello there");
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
	                <ul className="navbar-nav mr-auto">
		                <li className="nav-item active">
			                <a className="nav-link" href="#">Profile</a>
		                </li>
		                <li className="nav-item active">
			                <a className="nav-link" href="#">Summaries</a>
		                </li>
	                </ul>
                </div>
                <div className="mx-auto order-0">
	                <a className="navbar-brand mx-auto" href="#">Home</a>
	                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
		                <span className="navbar-toggler-icon"></span>
	                </button>
                </div>
                <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
	                <ul className="navbar-nav ml-auto">
		                <li className="nav-item">
			                <a className="nav-link active" href="#">Hello User</a>
		                </li>
		                <li className="nav-item">
			                <a className="nav-link active" href="#">Logout</a>
		                </li>
	                </ul>
                </div>
                <br></br>
            </nav>

        )
    }
}

export default Navbar