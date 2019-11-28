import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { rooturl } from '../../config';
import axios from 'axios';
import AudioAnalyser from "react-audio-analyser"
import Button from 'react-bootstrap-button-loader';
import {countryList} from '../UserLoginSignup/Countries'


import Navbar from '../navbar'
import '../navbar'


class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            username : localStorage.getItem('username'),
            name : "",
            address : "",
            contact : "",
            country : "",
            imagefile : ""
        }
        this.onChange = this.onChange.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.changeCountry = this.changeCountry.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        //console.log(this.state);
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.files[0]
        });
    }

    changeCountry = () => {
        console.log('Here in the country change')
        var x = document.getElementById("country").value;
        console.log('Here in the country change',x)
        this.setState({
            country : x
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

    componentWillMount(){

        var data = {
            username : this.state.username
        }
        console.log(data);
        axios.post(rooturl + '/getprofile', data)
        .then(response => {
            console.log("Response Status: " + response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    name : response.data.responseMessage.name,
                    address : response.data.responseMessage.address,
                    contact : response.data.responseMessage.contact,
                    imglink : rooturl + '/uploads/' + response.data.responseMessage.imglink,
                    country : response.data.responseMessage.country
                })
                console.log(this.state);

            } else {
                console.log("Error Response");
            }
        })
        .catch(err => {
            console.log("Error has occurred : " + err);
        })
    }

    onSubmit(e){
        e.preventDefault();

        console.log("Updating Profile");
        const data = {
            name : this.state.name,
            contact : this.state.contact,
            address : this.state.address,
            username : this.state.username,
            imagefile : this.state.imagefile,
            country : this.state.country
        }

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        let profileData = new FormData();
        profileData.append("name", data.name);
        profileData.append("contact", data.contact);
        profileData.append("address", data.address);
        profileData.append("username", data.username);
        profileData.append("country", data.country);
        profileData.append("imglink", this.state.imagefile);

        console.log(profileData);

        axios.post(rooturl + '/updateprofile', profileData)
        .then(response => {
            console.log("Response Status: " + response.status);
            if(response.status === 200){
                console.log(response.data)
                this.setState({
                    updateStatus : true
                })
                alert("Profile Updated Successfully");
            } else {
                console.log("Error Response");
                this.setState({
                    updateStatus : false
                })
            }
        })
        .catch(err => {
            console.log("Error has occurred : " + err);
            this.setState({
                updateStatus : true
            })
        })

    }

    render(){
        let showCountry = this.getCountries();

        return(
            <div>
                <Navbar />

                <div className="container">
                <br></br><br></br><br></br><br></br>

                    <div className="card-deck text-center">
                    
                        <div className="card text-center border-primary" style={{"width":"600px"}}>
                        <br></br>
                        <img src={this.state.imglink} style={{ height: 250, width: 200, alignSelf:"center" }} alt="Profile Picture"/>
                             
                            <div className="card-body text-center">
                                <h4 className="card-title">{this.state.name}</h4>
                                <p className="card-text">Welcome to your profile</p>
                                
                                <br></br><br></br>
                                <form className="form-horizontal text-center">

                                    <div className="input-group mb-3 w-50">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Username</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" name="username" onChange={this.changeHandler} value={this.state.username} required disabled/>
                                    </div>

                                    <div className="input-group mb-3 w-50" style={{ "text-align":"center" }}>
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Name</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" name = "name" onChange={this.changeHandler} value={this.state.name} required/>
                                    </div>

                                    <div className="input-group mb-3 w-50">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Contact</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Contact" aria-label="Username" aria-describedby="basic-addon1" name = "contact" onChange={this.changeHandler} value={this.state.contact}/>
                                    </div>

                                    <div className="input-group mb-3 w-50">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Address</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Address" aria-label="Username" aria-describedby="basic-addon1" name = "address" onChange={this.changeHandler} value={this.state.address}/>
                                    </div>

                                    <div className="input-group mb-3 w-50 text-center">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Country</span>
                                    </div>
                                        <select onChange={this.changeCountry} value={this.state.country} id="country" required>
                                            <option value="Select">Select</option>
                                            {showCountry}
                                        </select>
                                    </div>

                                    <div className="input-group mb-3 w-50 text-center">               
                                        <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" name="imagefile" accept="image/*" onChange = {this.onChange}/>
                                        <label className="custom-file-label align" for="inputGroupFile01">Profile Picture</label>
                                    </div>

                                    <br></br> <br></br>

                                    <div class="row text-center" >
                                        <div class="col-sm-12 text-center">
                                            <button type="submit" id="btnSearch" className="btn btn-primary btn-md center-block p-2" style={{"width": "100px"}} onClick={this.onSubmit} >Submit</button>
                                            <Link to="/dashboard"><button id="btnClear" className="btn btn-danger btn-md center-block p-2" style={{"width": "100px"}} >Cancel</button></Link>
                                        </div>
                                    </div>                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;