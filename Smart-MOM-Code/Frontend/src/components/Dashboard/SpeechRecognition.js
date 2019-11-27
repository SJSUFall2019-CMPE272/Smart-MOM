import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
    
};

let endtime = 0;

let mStartTime = 0;
const options = {
    autoStart: false
  }

const generateSummary = (transcript)=>{
    console.log('Here Summary',transcript)
    localStorage.setItem('transcript',transcript)
}

const startTimer = ()=>{
   mStartTime = new Date()
   console.log('Here in the start timer',mStartTime)
}

const endTimer = ()=>{
  endtime = new Date()
  console.log('Here in the end timer',endtime)

  var timeDiff = endtime - mStartTime; //in ms
  // strip the ms
  timeDiff /= 1000;

  // get seconds 
  var seconds = Math.round(timeDiff);
  var minutes = seconds/60;
  console.log(seconds + " seconds");
localStorage.setItem('meetingDuration',seconds);
}

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  startListening,
  stopListening,
  abortListening,
  finalTranscript
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      
      <button type="button" onClick={(event) => { startListening(); startTimer()}} className="btn btn-primary">Start Recorder</button>
      {/* <button type="button" onClick={startListening} className="btn btn-primary">Start Recorder</button> */}
      <br></br><br></br>
      <button type="button" onClick={(event) => { stopListening(); endTimer()}} className="btn btn-danger">Stop Recorder</button>
      <br></br>
      <br/>
      <p><b><i>Real Time Generated Transcript</i></b></p>
      <span>{transcript}</span>
      <br/><br/>
      <button onClick={resetTranscript} className="btn btn-primary">Reset</button>
      <br/><br/>
      <button type="button" onClick={()=>generateSummary(finalTranscript)} className="btn btn-success">Save Transcript</button>
      <br/><br/>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
Dictaphone.options = options;

export default SpeechRecognition(options)(Dictaphone);