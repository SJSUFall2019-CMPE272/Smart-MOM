import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome'

class Root extends Component {
    render(){
        return(
            <div>
                
                
                <Route path="/" component={Welcome}/>
             
            </div>
        )
    }
}
//Export The Main Component
export default Root;