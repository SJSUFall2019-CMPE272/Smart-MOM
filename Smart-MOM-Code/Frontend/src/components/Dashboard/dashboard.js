import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { rooturl } from '../../config';
import axios from 'axios';
import AudioAnalyser from "react-audio-analyser"
import SpeechRecognition from './SpeechRecognition'
import Button from 'react-bootstrap-button-loader';

import Navbar from '../navbar'
import './dashboard.css'
import '../navbar'

let entities = [
    'Linda',
    'Ann Maybe', 'Tom',
    'Ann', 'Mark Johnson', 'Susan', 'Mark'
];
let text = `He is our new salesperson with the company. I am a salesperson, too. We can be a team You help me, I'll hel.P you Boss: That sounds good to me, too. Mark: Its nice to meet you, Ann Maybe you can help to teach me about my new job. Susan: I think Mark has met everyone, oh, except for Ann.Ann: Hello, Mark. Im sure you and Mark will do even better next month: Boss: Thank you, Susan. Linda, will you please take notes of our meeting for us? First of all, I would like you all to meet Mr. Mark Johnson. Linda: Second, We talked about the new products we?Are going to selling Mark: She means the new products you and I will be selling. Linda: O.K. Third, we talked about the profits that we had last month.`;
const sentiment = 'Positive';
const topic = 'Salesperson'
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imagefile: "",
            status: "",
            loadingaudio: false,
            loadingupload: false
        }
        this.storeTranscript = this.storeTranscript.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.storeRecordingTranscript = this.storeRecordingTranscript.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
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
        if (this.state.topic == "" || this.state.imagefile == "") {
            alert("Please fill out required fields");
        } else {
            var file = this.state.imagefile
            console.log(file);

            var reader = new FileReader();
            var text;
            reader.readAsText(file)
            reader.onload = function () {
                //console.log(reader.result);
                text = reader.result;
                assignState(text);

            }

            var assignState = (text) => {
                this.setState({
                    transcriptText: text
                })
                //console.log(this.state.transcriptText);
                this.storeTranscript();
            }
        }
    }

    storeTranscript = () => {


        var data = {
            username: localStorage.getItem('username'),
            text: this.state.transcriptText,
            topic: this.state.topic,
            length: this.state.length
        }
        this.setState({
            loadingupload: true
        })
        axios.post(rooturl + "/createsummary", data)
            .then(response => {
                console.log("Response Status: " + response.status);

                if (response.status === 200) {
                    this.setState({
                        transcriptStored: true,
                        summary: response.data.responseMessage,
                        summaryReceived: true,
                        loadingupload: false
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

    storeRecordingTranscript = (e) => {
        e.preventDefault();
        console.log('Here in the store recording')
        if (!localStorage.getItem('transcript')) {
            alert("Please save the summary before proceeding");
        } else {
            var data = {
                username: localStorage.getItem('username'),
                text: localStorage.getItem('transcript'),
                topic: this.state.topic,
                length: this.state.length,
                duration: localStorage.getItem('meetingDuration')
            }
            this.setState({
                loadingaudio: true
            })
            // setTimeout(() => {
            //     this.setState({loading: false});
            //   }, 6000);
            axios.post(rooturl + "/createsummary", data)
                .then(response => {
                    console.log("Response Status: " + response.status);
                    this.setState({ loadingaudio: false });
                    if (response.status === 200) {
                        this.setState({
                            transcriptStored: true,
                            summary: {}
                        })

                    } else {
                        this.setState({
                            transcriptStored: false
                        })
                        console.log("Transcript store unsuccessful");
                    }
                })
        }
    }

    render() {
        const { status, audioSrc, audioType } = this.state;
        const audioProps = {
            audioType,
            // audioOptions: {sampleRate: 30000}, // 设置输出音频采样率
            status,
            width: "200px",
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

        if (this.state.summaryReceived) {
            // var jumbotronVisibility = { visibility: "visible" }

            // var topicName = this.state.topic;
            // var entities = this.state.summary.entities.map(entity => {
            //     return (
            //         <span className='badge badge-info'>{entity}{' '}</span>
            //     )
            // });

            //var sentiment = this.state.summary.sentiment;

            var summary = this.state.summary.text;
            //var bullets = this.state.summary.text.split(".");
            // var summary = bullets.map(line => {
            //     return (
            //     <li>{line}</li>
            //     )
            // })

        } else {
            var jumbotronVisibility = { visibility: "hidden" }
        }
        entities = entities.map(entity => {
            return (
                <span className='badge badge-info'>{entity}{' '}</span>
            )
        });
        return (

            <div>
                {/* <Navbar /> */}
                <br></br><br></br>
                <div className="container">
                    <h1 align="center">Hello, {localStorage.getItem("name")}</h1>
                    <br></br>
                    <div className="card-deck">
                        <div className="card text-center border-primary">
                            <div className="card-body">
                                <h5 className="card-title">Upload Transcript</h5>
                                <p className="card-text">Give us transcript, we will give you minutes of meeting</p>
                                <p className="card-text">Upload a text file</p>
                                <div className="input-group mb-3">
                                    <input type="file" id="file" name="imagefile" accept=".txt" onChange={this.onChange}></input>
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
                                    {/* <button type="submit" className="btn btn-primary" id="btnc">Upload File</button> */}
                                    <Button loading={this.state.loadingupload} type="submit" id="btnc1">Upload File</Button>
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
                                    <Button loading={this.state.loadingaudio} type="submit" id="btnc">Generate Summary</Button>
                                    {/* <button type="submit" className="btn btn-primary">Generate Summary</button> */}
                                </form>

                            </div>
                        </div>

                    </div>

                    <br></br>
                    <div className="jumbotron">
                        <h1 className="display-5 text-center">{topic}</h1>
                        <p className="lead"><span className="btn btn-danger btn-sm">Entities:</span> {entities}</p>
                        <hr className="my-4"></hr>
                        <p><span className="btn btn-danger btn-sm">Sentiment:</span> <span className='badge badge-primary'>{sentiment}</span></p>
                        <hr className="my-4"></hr>
                        <p>
                            {text}
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}

export default Dashboard;