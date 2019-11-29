import React, {Component} from 'react';
import './Login.scss'
import {countryList} from './Countries'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import axios from 'axios'
import {Redirect} from 'react-router';
import NotificationAlert from 'react-notification-alert';
import "react-notification-alert/dist/animate.css";
import '../navbar'

var options = {};
options = {
    place: 'tc',
    message: (
        <div>
            <div>
            <p align="center">Login to <b>SMART-MOM</b> Failed </p>
            </div>
        </div>
    ),
    type: "danger",
    icon: "now-ui-icons ui-1_bell-53",
    autoDismiss: 3
}

var optionsSignupFailure = {};
optionsSignupFailure={
  place: 'tc',
  message: (
      <div>
          <div>
             <p align="center">Email ID already registered!</p>
          </div>
      </div>
  ),
  type: "danger",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}

var optionsSignupSuccess = {};
optionsSignupSuccess={
  place: 'tc',
  message: (
      <div>
          <div>
          <p align="center">Sign up Successful!</p>
          </div>
      </div>
  ),
  type: "success",
  icon: "now-ui-icons ui-1_bell-53",
  autoDismiss: 3
}

class Login  extends Component{
  constructor (props) {
    super(props);
    this.state={
      name:" ",
      email:" ",
      password:" ",
      country:" ",
      emailsignin:" ",
      passwordsignin:" ",
      country:" ",
      loginStatus:false,
      showMessage:false,
    }

  }
  myFunc(){
    this.refs.notify.notificationAlert(options);
}
  valueChangedHandler = (event) => {
   // console.log('Event target', event.target)
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });

    console.log('State status', this.state)
  }
 
  signin=()=>{
console.log('here in signin');
let data =  {username:this.state.emailsignin,password:this.state.passwordsignin}
 //make a post request with the user data
 axios.post('http://18.144.4.190:3001/login',data)
 .then(response => {
     console.log("Status Code : ",response.data);
     if(response.status === 200){
         console.log('User Login success')
         localStorage.setItem('username', response.data.responseMessage.username);
         localStorage.setItem('name', response.data.responseMessage.name);
         this.setState({
           loginStatus:true
         })
     }
     else{
         
    console.log('User Login Failure!!')
    // this.setState({
    //  showMessage:true
    // })
    this.refs.notify.notificationAlert(options);
     }
 }).catch(error => {
  
    console.log('User Login Failure!!')
    //  this.setState({
    //   showMessage:true
    //  })
    this.refs.notify.notificationAlert(options);
     
 })
  }

  signup=()=>{
console.log('signup')
let data =  {username:this.state.email,email:this.state.email,password:this.state.password,name:this.state.name,country:this.state.country}
 //make a post request with the user data
 axios.post('http://18.144.4.190:3001/signup',data)
 .then(response => {
     console.log("Status Code : ",response.data);
     if(response.status === 200){
         console.log('User Signup success')
         this.refs.notifySignUpSuccess.notificationAlert(optionsSignupSuccess);
     }else{
      this.refs.notifySignUpFailure.notificationAlert(optionsSignupFailure);
     }
 }).catch(error => {
  console.log('User Signup Failure!!')  //notifySignUpSuccess
  this.refs.notifySignUpFailure.notificationAlert(optionsSignupFailure);
 })
  }


  componentDidMount(){
       let script = document.createElement("script");

        script.src = require('./LoginDynamic');
        script.async = true;
    
        document.body.appendChild(script);
  }

  changeCountry=()=>{
console.log('Here in the country changeee')
    var x = document.getElementById("country").value;
    console.log('Here in the country changeee',x)
    this.setState({
      country :x
    })
    console.log('State Value',this.state)
  }

  getCountries = ()=>{
    let country = countryList.map((count)=>{
    return <option value={count.code}>{count.name}</option>
    })
    //console.log('country list is -------------------->',country);
    return country;
  }
    render(){

     // const { country, region } = this.state;
      let showCountry = this.getCountries()
      let redirectVar = null;
        if(this.state.loginStatus){
            redirectVar = <Redirect to= "/dashboard"/>
        }
        console.log('Redirected',redirectVar); 
        return (
            <div>
              {redirectVar}
              <NotificationAlert ref="notify" />
              <NotificationAlert ref="notifySignUpFailure" />
              <NotificationAlert ref="notifySignUpSuccess" />
              {/* {this.state.showMessage==true?<div>
          <NotificationAlert ref="notify" />
        <button onClick={() => this.myFunc()}>Hey</button>
      </div>:<div></div>} */}
              <h1 class="tip">SMART-MOM Login</h1>
            
<div class="cont">
  <div class="form sign-in">
    {/* <h2 align="left">Welcome back,</h2> */}
    <label>
      <span>Email</span>
      <input type="email" name="emailsignin" onChange={this.valueChangedHandler} />
    </label>
    <br/>
    <label>
      <span>Password</span>
      <input type="password" name=
      "passwordsignin" onChange={this.valueChangedHandler} />
    </label>
    {/* <p class="forgot-pass">Forgot password?</p> */}
    <button type="button" class="submit" onClick={this.signin} id="btnc">Sign In</button>
    {/* <button type="button" class="fb-btn">Connect with <span>facebook</span></button> */}
  </div>
  <div class="sub-cont">
    <div class="img">
      <div class="img__text m--up">
        <h2>New here?</h2>
        <p style={{color: 'white'}}>Sign up and discover great amount of new opportunities!</p>
      </div>
      <div class="img__text m--in">
        <h2>One of us?</h2>
        <p style={{color: 'white'}}> If you already has an account, just sign in. We've missed you!</p>
      </div>
      <div class="img__btn">
        <span class="m--up">Sign Up</span>
        <span class="m--in">Sign In</span>
      </div>
    </div>
    <div class="form sign-up">
      
      <label>
        <span>Name</span>
        <input type="text"  name="name" onChange={this.valueChangedHandler}/>
      </label>
      <br/>
      <label>
        <span>Email</span>
        <input type="email" name="email" onChange={this.valueChangedHandler} />
      </label>
      <br/>
      <label>
        <span>Password</span>
        <input type="password" name="password" onChange={this.valueChangedHandler} />
      </label>
      <br/>
      <label>
        <span>Country</span>
        <br></br>
        <select onChange={this.changeCountry} id="country">
        <option value="Select">Select</option>
 {showCountry}
</select>
          
           </label>
      <button type="button" class="submit" onClick={this.signup} id="btnc" >Sign Up</button>
    </div>
  </div>
</div>


            </div>
          );
    }
}

export default Login;