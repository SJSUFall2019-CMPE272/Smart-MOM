import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import Navbar from '../navbar'


class Dashboard extends Component {
    
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <Navbar />
                <div className="container">
                    <div className="card-deck">
                    <div className="card text-center border-primary">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <div className="input-group mb-3">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="inputGroupFile02"></input>
                                    <label className="custom-file-label" for="inputGroupFile02" aria-describedby="inputGroupFileAddon02">Choose file</label>
                                </div>
                                <div className="input-group-append">
                                    <span className="input-group-text" id="inputGroupFileAddon02">Upload</span>
                                </div>
                            </div>
                            <button type="button" className="btn-primary btn-lg">Large button</button>
                        </div>
                    </div>
                    
                    <div className="card text-center border-primary">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            
                            <button type="button" className="btn-primary btn-lg">Large button</button>
                        </div>
                    </div>
                </div>

                <br></br>
                <div className="jumbotron" style={{visibility: "visible"}}>
                    <h1 className="display-4">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classNames for typography and spacing to space content out within the larger container.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
                </div>
            </div>
        )
    }
}

export default Dashboard;