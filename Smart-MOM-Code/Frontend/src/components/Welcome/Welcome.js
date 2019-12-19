import React, { Component } from 'react';
import './Welcome.css';
import { Redirect } from 'react-router';

import './lib/bootstrap/css/bootstrap.min.css';
import './lib/font-awesome/css/font-awesome.min.css';
import './css/style.css';
import CountUp from 'react-countup';
import { VectorMap } from "react-jvectormap";
import axios from 'axios'



let uc = 0;
let tc = 0;

class Welcome extends Component {


    reDirect = ''
    constructor() {

        super();

        this.state = {
            searchBox: "",
            reDirect: "",
            mapData:{},
            metricData:{}
        }

    }

   
    handleClick = (e, countryCode) => {
      console.log(countryCode);
    };

    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    scriptLoaded() {
        window.A.sort();
      }

    componentWillMount = ()=>{
        const data = {}
        axios.get('http://3.17.152.109:3010/getWelcomeData')
       .then(response => {
           console.log("Status Code in 200 : ",response.data.welocomeData);
         console.log('here 1')
             let mapd = {}
               response.data.welocomeData.responseMessage.forEach(element => {
                console.log('here 1',element)
                let keyy = element._id;                 
                mapd[keyy] = element.count;
                 console.log('Map element',mapd)
               });
               let metricData = {}
               metricData.usersCount =  response.data.welocomeData.usersCount;
               metricData.tCount =  response.data.welocomeData.tcount
               metricData.duration = response.data.welocomeData.duration[0].count
               console.log('Metric Data element',metricData)
               this.setState({
                 mapData:mapd,
                 metricData:metricData
               })
               
               
               this.setState({});
         
       }).catch(error => {
        
          console.log('User Login Failure!!')
          
           
       })
      }

    componentDidMount = ()=> {

    }




    render() {

      console.log('Map data to be rendered',this.state.metricData.tCount)
      uc = this.state.metricData.usersCount;
      tc = this.state.metricData.tCount
      let duration = this.state.metricData.duration

        return (<div>

 {/* Headers */}
 <header id="header" class="fixed-top ">
    <div class="container">

      <div id="logo" class="pull-left">
        <a href="index.html"><img src="img/logo-nav.png" alt="" title="" /></a>
      
        {/* <h1><a href="#hero">SMART MOM</a></h1> */}
      </div>

      <nav id="nav-menu-container " class="fixed-top ">
        <ul class="nav-menu navbar-fixed-top">
          <li><a href="#about">About Us</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#team">Team</a></li>
          <li><a href="#contact">Contact Us</a></li>
          <li><a href="/login"><i class="fa fa-sign-in"></i></a></li>
        </ul>
      </nav>
     
      {/* <nav class="nav social-nav pull-right d-none d-lg-inline">
        <a href="/login"><i class="fa fa-sign-in"></i></a>
      </nav> */}
    </div>
  </header>


     <section class="hero">
    <div class="container text-center">
      {/* <div class="row">
        <div class="col-md-12">
          <a class="hero-brand" href="index.html" title="Home"><img alt="Bell Logo" src={require('./img/logo.png')}/></a>
        </div>
      </div> */}

      <div class="col-md-12">
        <h1>
            Smart MOM
          </h1>

        <p class="tagline">
          This is a powerful tool that can summarize all your meetings and generate valuable insights from it.
        </p>
        <a class="btn btn-full" href="#about">Get Started Now</a>
      </div>
    </div>

  </section>
 
{/* About Section */}
  <section class="about" id="about">
    <div class="container text-center">
      <h2>
          About Smart MOM
        </h2>

      <p>
      This model will record the meetings either through a recorder or as an Alexa Skill and convert the audio to text. 
      The meeting conversation will be classified into a proper conversation. 
      This conversation will be passed through various NLP algorithms to create a summary and generate minutes of meeting automatically. 
      These minutes of meeting will be send over to all stakeholders especially the ones who couldn't attend the meeting.
      </p>

      <div class="row stats-row">
        <div class="stats-col text-center col-md-3 col-sm-6">
          <div class="circle">
            <span class="stats-no" data-toggle="counter-up">{uc}</span> Customers
          </div>
        </div>

        <div class="stats-col text-center col-md-3 col-sm-6">
          <div class="circle">
            <span class="stats-no" data-toggle="counter-up">{tc }</span> Meetings Recorded
          </div>
        </div>

        <div class="stats-col text-center col-md-3 col-sm-6">
          <div class="circle">
    <span class="stats-no" data-toggle="counter-up">37</span> Minutes of Meeting Recorded          </div>
        </div>
{/* 
        <div class="stats-col text-center col-md-3 col-sm-6">
          <div class="circle">
            <span class="stats-no" data-toggle="counter-up"><CountUp end={169}/></span> Hard Workers
          </div>
        </div> */}
      </div>
    </div>
  </section>

{/* Features */}

<section class="features" id="features">
    <div class="container">
      <h2 class="text-center">
          Features
        </h2>

      <div class="row">
        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-rocket"></span>
              </div>
            </div>

            <div>
              <h3>
                  Entity Recognition
                </h3>

              <p>
               Recognizes entities from the conversation
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-envelope"></span>
              </div>
            </div>

            <div>
              <h3>
                  Real Time Transcript 
                </h3>

              <p>
                Displays real time transcript on the dashboard screen as the converation starts
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-bell"></span>
              </div>
            </div>

            <div>
              <h3>
                  Sentiment Analysis
                </h3>

              <p>
                Sentiment Analysis of the meetings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="row">
        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-database"></span>
              </div>
            </div>

            <div>
              <h3>
                  Good Documentation
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-cutlery"></span>
              </div>
            </div>

            <div>
              <h3>
                  Excellent Features
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>

        <div class="feature-col col-lg-4 col-xs-12">
          <div class="card card-block text-center">
            <div>
              <div class="feature-icon">
                <span class="fa fa-dashboard"></span>
              </div>
            </div>

            <div>
              <h3>
                  Retina Ready
                </h3>

              <p>
                Eque feugiat contentiones ei has. Id summo mundi explicari his, nec in maiorum scriptorem.
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  </section>

{/* Buy this Product */}
{/* <section class="cta">
    <div class="container">
      <div class="row">
        <div class="col-lg-9 col-sm-12 text-lg-left text-center">
          <h2>
             Buy
            </h2>

          <p>
            Loved this product!. Buy Now:)
          </p>
        </div>

        <div class="col-lg-3 col-sm-12 text-lg-right text-center">
          <a class="btn btn-ghost" href="#">Buy This Product</a>
        </div>
      </div>
    </div>
  </section> */}
{/* Team  */}
{/* <section class="team" id="team">
    <div class="container">
      <h2 class="text-center">
          Meet our team
        </h2>

      <div class="row">
        <div class="col-sm-3 col-xs-6">
          <div class="card card-block">
            <a href="#"><img alt="" class="team-img" src={require('./img/team-1.jpg')}/>
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
            </nav>

            <p>
              Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
            </p>
          </div>
          </a>
        </div>
      </div>

      <div class="col-sm-3 col-xs-6">
        <div class="card card-block">
          <a href="#"><img alt="" class="team-img" src={require('./img/team-2.jpg')}/>
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
          </nav>

          <p>
            Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
          </p>
        </div>
        </a>
      </div>
    </div>

    <div class="col-sm-3 col-xs-6">
      <div class="card card-block">
        <a href="#"><img alt="" class="team-img" src={require('./img/team-3.jpg')}/>
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
        </nav>

        <p>
          Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
        </p>
      </div>
      </a>
    </div>
    </div>

    <div class="col-sm-3 col-xs-6">
      <div class="card card-block">
        <a href="#"><img alt="" class="team-img" src={require('./img/team-4.jpg')}/>
              <div class="card-title-wrap">
                <span class="card-title">Sergio Fez</span> <span class="card-text">Art Director</span>
              </div>

              <div class="team-over">
                <h4 class="hidden-md-down">
                  Connect with me
                </h4>

                <nav class="social-nav">
                  <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
        </nav>

        <p>
          Lorem ipsum dolor sit amet, eu sed suas eruditi honestatis.
        </p>
      </div>
      </a>
    </div>
    </div>
    </div>
    </div>
  </section> */}
  <h3 align="center">Our users across the World!!</h3>
  <VectorMap
        map={"world_mill"}
        backgroundColor="transparent" //change it to ocean blue: #0077be
        zoomOnScroll={false}
        containerStyle={{
          width: "100%",
          height: "520px"
        }}
        onRegionClick={this.handleClick} //gets the country code
        containerClassName="map"
        regionStyle={{
          initial: {
            fill: "#e4e4e4",
            "fill-opacity": 0.9,
            stroke: "none",
            "stroke-width": 0,
            "stroke-opacity": 0
          },
          hover: {
            "fill-opacity": 0.8,
            cursor: "pointer"
          },
          selected: {
            fill: "#2938bc" //color for the clicked country
          },
          selectedHover: {}
        }}
        regionsSelectable={true}
        series={{
          regions: [
            {
              values: this.state.mapData, //this is your data
              scale: ["#146804", "#ff0000"], //your color game's here
              normalizeFunction: "polynomial"
            }
          ]
        }}
      />
        </div>)


    }




}

export default Welcome;

