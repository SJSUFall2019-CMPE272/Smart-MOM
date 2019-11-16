import React, { Component } from 'react';
import './Welcome.css';
import { Redirect } from 'react-router';



class Welcome extends Component {


    reDirect = ''
    constructor() {

        super();

        this.state = {
            searchBox: "",
            reDirect: ""
        }

    }



    valueChangedHandler = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }



    search = () => {
        let reDirect = <Redirect to={{
            pathname: '/customer/search',
            state: {
                searchBox: this.state.searchBox
            }
        }}
        />

        this.setState({
            reDirect: reDirect
        })


    }





    componentWillMount() {


    }

    componentDidMount() {

    }


    render() {

        return (<div>
            <h1>Hello Smart MOM</h1>
        </div>)


    }




}

export default Welcome;

