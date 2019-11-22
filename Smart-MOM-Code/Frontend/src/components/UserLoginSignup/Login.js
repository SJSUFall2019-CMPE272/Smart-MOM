import React, {Component} from 'react';
import './Login.scss'
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
class Login  extends Component{
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }
 
  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.setState({ region: val });
  }

  componentDidMount(){
       let script = document.createElement("script");

        script.src = require('./LoginDynamic');
        script.async = true;
    
        document.body.appendChild(script);
  }
    render(){

      const { country, region } = this.state;

        return (
            <div>
              <h1 class="tip">SMART-MOM Login</h1>
<div class="cont">
  <div class="form sign-in">
    <h2>Welcome back,</h2>
    <label>
      <span>Email</span>
      <input type="email" />
    </label>
    <label>
      <span>Password</span>
      <input type="password" />
    </label>
    <p class="forgot-pass">Forgot password?</p>
    <button type="button" class="submit">Sign In</button>
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
      <h2>Time to feel like home,</h2>
      <label>
        <span>Name</span>
        <input type="text" />
      </label>
      <label>
        <span>Email</span>
        <input type="email" />
      </label>
      <label>
        <span>Password</span>
        <input type="password" />
      </label>
      <label>
        <span>Country</span>
        <CountryDropdown
          value={country}
          id="select-css"
          onChange={(val) => this.selectCountry(val)} />
        <RegionDropdown
          country={country}
          value={region}
          id="select-css"
          onChange={(val) => this.selectRegion(val)} />
      
      </label>
      <button type="button" class="submit">Sign Up</button>
    </div>
  </div>
</div>


            </div>
          );
    }
}

export default Login;