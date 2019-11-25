import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { rooturl } from '../../config';
import axios from 'axios';
import AudioAnalyser from "react-audio-analyser"
import SpeechRecognition from './SpeechRecognition'

import Navbar from '../navbar'
import './dashboard.css'


class Dashboard extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            imagefile : "",
            status: ""
        }
        this.storeTranscript = this.storeTranscript.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.storeRecordingTranscript = this.storeRecordingTranscript.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(this.state);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }

    controlAudio(status) {
        this.setState({
            status
        })
    }

    changeScheme(e) {
        this.setState({
            audioType: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.topic == "" || this.state.imagefile == ""){
            alert("Please fill out required fields");
        } else {
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
                //console.log(this.state.transcriptText);
                this.storeTranscript();
            }
        }
    }

    storeTranscript = () => {
        var data = {
            username : "maaz@maaz.com",
            text: this.state.transcriptText,
            topic: this.state.topic,
            length: this.state.length
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

    storeRecordingTranscript = () => {
        if(!localStorage.getItem('transcript')){
            alert("Please save the summary before proceeding");
        } else {
            var data = {
            username : "maaz@maaz.com",
            text: localStorage.getItem('transcript'),
            topic: this.state.topic,
            length: this.state.length
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
    }

    render(){
        const {status, audioSrc, audioType} = this.state;
        const audioProps = {
            audioType,
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
            status,
            width:"200px",
            audioSrc,
            timeslice: 1000, // timeslice（https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/start#Parameters）
            startCallback: (e) => {
                console.log("succ start", e)
            },
            pauseCallback: (e) => {
                console.log("succ pause", e)
            },
            stopCallback: (e) => {
                this.setState({
                    audioSrc: window.URL.createObjectURL(e)
                })
                console.log("succ stop", e)
            },
            onRecordCallback: (e) => {
                console.log("recording", e)
            },
            errorCallback: (err) => {
                console.log("error", err)
            }
        }
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

                                <form className="form-signin" onSubmit={this.onSubmit}>
                                    <div className="row">
                                        <div className="col">
                                        <input type="text" name="topic" onChange={this.changeHandler} className="form-control" placeholder="Topic Name" required></input>
                                        </div>
                                        <div className="col">
                                        <input type="number" name="length" onChange={this.changeHandler} className="form-control" placeholder="Lines of Summary" min="5"></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-primary">Upload File</button>
                                </form>

                            </div>
                            
                        </div>
                        
                        <div className="card text-center border-primary">
                            <div className="card-body">
                                <h5 className="card-title">Record a meeting</h5>
                                <p className="card-text">Record the meeting using our own recorder and get the minutes of meeting</p>
                                {/* <button type="button" className="btn btn-primary">Start Recorder</button>
                                <br></br><br></br>
                                <button type="button" className="btn btn-primary">Upload Meeting</button> */}
                                <SpeechRecognition></SpeechRecognition>
                                {/* <div id="startRecording">
                <AudioAnalyser {...audioProps}>
                    <div className="btn-box">
                        {status !== "recording" &&
                        <i className="iconfont icon-start" title="Start Recording"
                           onClick={() => this.controlAudio("recording")}></i>}
                        {status === "recording" &&
                        <i className="iconfont icon-pause" title="Pause Recording"
                           onClick={() => this.controlAudio("paused")}></i>}
                        <i className="iconfont icon-stop" title="Mark Recording Completed"
                           onClick={() => this.controlAudio("inactive")}></i>
                    </div>
                </AudioAnalyser>
                <p>Choose output type</p>
                <select name="" id="" onChange={(e) => this.changeScheme(e)} value={audioType}>
                    <option value="audio/webm">audio/webm（default）</option>
                    <option value="audio/wav">audio/wav</option>
                    <option value="audio/mp3">audio/mp3</option>
                </select>
            </div> */}          

                            <form className="form-signin" onSubmit={this.storeRecordingTranscript}>
                                    <div className="row">
                                        <div className="col">
                                        <input type="text" name="topic" onChange={this.changeHandler} className="form-control" placeholder="Topic Name" required></input>
                                        </div>
                                        <div className="col">
                                        <input type="number" name="length" onChange={this.changeHandler} className="form-control" placeholder="Lines of Summary" min="5"></input>
                                        </div>
                                    </div>
                                    <br></br>
                                    <button type="submit" className="btn btn-primary">Generate Summary</button>
                            </form>
                         
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