import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { rooturl } from '../../config';
import axios from 'axios';

import Navbar from '../navbar'


class Dashboard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            imagefile : ""
        }
        this.storeTranscript = this.storeTranscript.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        var file = this.state.imagefile
        console.log(file);
        
        var reader = new FileReader();
        var text;
        reader.readAsText(file)
        reader.onload = function() {
            //console.log(reader.result);
            text = reader.result;
            assignState(text);
            
        }

        var assignState = (text) => {
            this.setState({
                transcriptText : text
            })
            console.log(this.state.transcriptText);
            this.storeTranscript();
        }
        
    }

    storeTranscript = () => {
        

        var data = {
            username : "maaz@maaz.com",
            text: this.state.transcriptText 
        }

        axios.post(rooturl + "/createsummary", data)
        .then(response => {
            console.log("Response Status: " + response.status);

            if(response.status === 200){
                this.setState({
                    transcriptStored: true
                })
                console.log(response.data.responseMessage)
            } else {
                this.setState({
                    transcriptStored: false
                })
                console.log("Transcript store unsuccessful");
            }
        })
    }

    render(){
        return (
            <div>
                <Navbar />
                <br></br><br></br>
                <div className="container">
                
                <br></br>
                    <div className="card-deck">
                        <div className="card text-center border-primary">
                            <div className="card-body">
                                <h5 className="card-title">Upload Transcript</h5>
                                <p className="card-text">Give us transcript, we will give you minutes of meeting</p>
                                <p className="card-text">Upload a text file</p>
                                <div className="input-group mb-3">
                                    <input type="file" id="file" name="imagefile" accept=".txt" onChange = {this.onChange}></input>
                                </div> 
                                <br></br>
                                
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Upload File</button>
                                
                                </div>
                            
                        </div>
                        
                        <div className="card text-center border-primary">
                            <div className="card-body">
                                <h5 className="card-title">Record a meeting</h5>
                                <p className="card-text">Record the meeting using our own recorder and get the minutes of meeting</p>
                                <button type="button" className="btn btn-primary">Start Recorder</button>
                                <br></br><br></br>
                                <button type="button" className="btn btn-primary">Upload Meeting</button>
                            </div>
                        </div>
                        
                    </div>
                        
                    <br></br>
                    <div className="jumbotron" style={{visibility: "visible"}}>
                        <h1 className="display-4">Hello, world!</h1>
                        <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                        <hr className="my-4"></hr>
                        <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
                        <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                    </div>
                </div>
            </div> 
        )
    }
}

export default Dashboard;