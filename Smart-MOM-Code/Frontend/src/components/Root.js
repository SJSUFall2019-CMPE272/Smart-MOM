import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import Dashboard from './Dashboard/dashboard';

class Root extends Component {
    render(){
        return(
            <div>
                
                
                <Route exact path="/" component={Welcome}/>
                <Route path="/dashboard" component={Dashboard}/>
             
            </div>
        )
    }
}
//Export The Main Component
export default Root;