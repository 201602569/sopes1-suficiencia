import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { Row, Col } from "rsuite";
import { chartColors } from "./Util/colors";

export class PieLocations extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            showData: {
                labels: [
                    "Country 1",
                    "Country 2"
                ],
                datasets: [
                    {
                        data: [20, 50],
                        backgroundColor: chartColors,
                        borderColor: "#10141c",
                    }
                ]
            },
            options: {
                legend: {
                    display: false,
                    position: "right"
                }
            }
        }
    }

    componentDidMount(){
        this.increment();
        this.timer = setInterval(
            () => this.increment(),
            5000
        )
    }

    async increment(){
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
    }

    convertData = () => {
        this.state.showData.labels = [];
        this.state.showData.datasets[0].data = [];
        var data = this.state.data;
        for(var i=0; i < data.length; i++){
            this.state.showData.labels.push(data[i].location);
            this.state.showData.datasets[0].data.push(data[i].total);
        }
    }

    render(){
        this.convertData();
        const data = this.state.showData;
        const { options } = this.state;
        return(
            <Doughnut options={options} data={data} />
        )
    }
}

export default PieLocations;