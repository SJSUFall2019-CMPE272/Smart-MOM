import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
    
};

const options = {
    autoStart: false,
    continuous:false
  }

const generateSummary = (transcript)=>{
    console.log('Here Summary',transcript)
    localStorage.setItem('transcript',transcript)
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
      <button onClick={resetTranscript}>Reset</button>
      <button type="button" onClick={startListening} className="btn btn-primary">Start Recorder</button>
      {/* <button type="button" onClick={startListening} className="btn btn-primary">Start Recorder</button> */}
      <br></br><br></br>
      <button type="button" onClick={stopListening} className="btn btn-danger">Stop Recorder</button>
      <br></br>
      <br/>
      <p><b><i>Real Time Generated Transcript</i></b></p>
      <span>{transcript}</span>
      <br/><br/>
      <button type="button" onClick={()=>generateSummary(finalTranscript)} className="btn btn-success">Generate Summary</button>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
Dictaphone.options = options;

export default SpeechRecognition(options)(Dictaphone);