import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { rooturl } from '../../config';
import axios from 'axios';
import AudioAnalyser from "react-audio-analyser"
import Button from 'react-bootstrap-button-loader';
import {countryList} from '../UserLoginSignup/Countries'


import Navbar from '../navbar'
import '../navbar'

class Summary extends Component {
    constructor(props){
        super(props);
        this.state = {
            username : localStorage.getItem('username')
        }
        this.showSummary = this.showSummary.bind(this);
    }

    componentWillMount(){

        var data = {
            username : this.state.username
        }
        console.log(data);
        axios.post(rooturl + '/pastsummary', data)
        .then(response => {
            console.log("Response Status: " + response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    allSummary : response.data.responseMessage,
                    allSummaryReceived : true
                })
                console.log(this.state);

            } else {
                console.log("Error Response");
            }
        })
        .catch(err => {
            console.log("Error has occurred : " + err);
        })
    }

    showSummary = (e) => {
        var topicName = e.target.id;

        var currentSummary = this.state.allSummary.filter(summary => {
            return (
                summary.topic = topicName
            )
        })

        this.setState({
            showJumbotron : true,
            topic : currentSummary.topic,
            entities : currentSummary.entities,
            sentiment : currentSummary.sentiment,
            text : currentSummary.text
        })
    }

    render(){

        if(this.state.allSummaryReceived){
            var summaryTopic = this.state.allSummary.map(summary => {
                return (
                    <a href="#" onClick = {this.showSummary} id = {summary.topic} class="list-group-item list-group-item-action active">{summary.topic}</a>
                )
            })
        }

        if(this.state.showJumbotron){
            var jumbotronVisibility = {visibility: "visible"}

            var topicName = this.state.topic;
            var entities = this.state.entities.map(entity => {
                return (
                    <span className='badge badge-info'>{entity}{' '}</span>
                )
            });

            var sentiment = this.state.sentiment;
            
            var summary = this.state.text;

        } else {
            var jumbotronVisibility = {visibility: "hidden"}
        }

        return (
            <div>
                <Navbar />

                <div className="container">
                <br></br><br></br><br></br><br></br>

                
                <div className="row h-100">
                <div className="col">
                    <div class="list-group">
                        {summaryTopic}
                    </div>
                </div>
                <div className="col">
                    <div className="jumbotron" style={jumbotronVisibility}>
                        <h1 className="display-5 text-center">{topicName}</h1>
                        <p className="lead"><span className="btn btn-danger btn-sm">Entities:</span> { entities }</p>
                        <hr className="my-4"></hr>
                        <p><span className="btn btn-danger btn-sm">Sentiment:</span> <span className='badge badge-primary'>{sentiment}</span></p>
                        <hr className="my-4"></hr>
                        <p>
                            {summary}
                        </p>
                    </div>
                </div>
                </div>
                </div>  
                
            </div>
        )
    }
}

export default Summary;