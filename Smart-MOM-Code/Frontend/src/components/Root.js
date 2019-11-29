import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Welcome from './Welcome/Welcome';

import Login from './UserLoginSignup/Login';
import Signup from './UserLoginSignup/Signup';

import Dashboard from './Dashboard/dashboard';
import Profile from './Profile/profile';
import Summary from './Summary/summary';
import SideNav from './SideNavBar'


class Root extends Component {
    render(){
        return(
            <div>
                
                
                <Route exact path="/" component={Welcome}/>
                <Route path="/mom" component={SideNav}/>
                <Route path="/login" component={Login}/>
                <Route path="/Signup" component={Signup}/>
                <Route path="/mom/dashboard" component={Dashboard}/>
                <Route path="/mom/profile" component={Profile}/>
                <Route path="/mom/summary" component={Summary}/>
                

             
            </div>
        )
    }
}
//Export The Main Component
export default Root;