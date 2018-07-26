import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import './navbar.css'
let redirectNav = null, selectedNav, navbarTag = null;

class SideNavBar extends Component {

    constructor(props){
        super(props);
        this.state = {
            imagefile : "",
            status: "",
            loading:false
        }

        }

     
	handleLogout = () => {
        localStorage.clear();
	}

        render(){
            navbarTag = <SideNav className="sidenav navbar-custom"
            onSelect={(selected) => {
                console.log('here in the navhandler',selected)
                if (selected == 'profile') {
                    console.log('here in the navhandler 222222')
                    redirectNav = <Redirect to='/mom/profile' />   
                }
                if (selected == 'summaries') {
                    console.log('here in the navhandler 222222')
                    redirectNav = <Redirect to='/mom/summary' />   
                } 
                if (selected == 'logout') {
                    console.log('here in the navhandler 222222')
                    this.handleLogout() 
                }

                if (selected == 'home') {
                    redirectNav = <Redirect to='/mom/dashboard' /> 
                }
                this.setState({});
            }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="profile">
                    <NavIcon>
                        <i className="fa fa-fw fa-id-card" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                         Profile
                    </NavText>
                </NavItem>
                <NavItem eventKey="summaries">
                    <NavIcon>
                        <i className="fa fa-book" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                         Summaries
                    </NavText>
                </NavItem>
                <NavItem eventKey="logout">
                        <NavIcon>
                            <i className="fa fa-fw fa-power-off" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Logout
                </NavText>
                    </NavItem>
            </SideNav.Nav>
        </SideNav>;
            if (!localStorage.getItem("username")) {
                localStorage.clear();
                redirectNav = <Redirect to="/" />;
            }	
            return(<div>
                {navbarTag}
                </div>)
        }
}





export default SideNavBar