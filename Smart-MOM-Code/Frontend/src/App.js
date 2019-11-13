import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
        </div>
      </BrowserRouter>
    );
  }
}
//Export the App component so that it can be used in index.js


export default App;
