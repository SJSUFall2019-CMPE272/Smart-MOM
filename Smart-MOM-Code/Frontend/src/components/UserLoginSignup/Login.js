import React, {Component} from 'react';
import './Login.scss'

class Login  extends Component{


  componentDidMount(){
       let script = document.createElement("script");

        script.src = require('./LoginDynamic');
        script.async = true;
    
        document.body.appendChild(script);
  }
    render(){



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
      <button type="button" class="submit">Sign Up</button>
      <button type="button" class="fb-btn">Join with <span>facebook</span></button>
    </div>
  </div>
</div>


            </div>
          );
    }
}

export default Login;