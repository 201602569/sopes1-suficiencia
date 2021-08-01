import React, { Component } from "react";
import { Row, Col } from "rsuite";

export class Last5 extends Component{
    constructor(){
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        /*this.increment();
        this.timer = setInterval(
            () => this.increment(),
            5000
        )*/
    }

    async increment(){
        /*
        const options = {
            method: 'GET', headers: {
                'Content-Type' : 'application/json'
            }
        }
        let response = await fetch('https://us-central1-core-silicon-306401.cloudfunctions.net/Locations', options)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        this.setState({
            data: response
        });
        */
    }

    render(){
        return(
            <>
                LAST 5
            </>
        )
    }
}

export default Last5;