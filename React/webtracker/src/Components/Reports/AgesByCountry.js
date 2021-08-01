import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import { SelectPicker } from "rsuite";
import { chartColors } from "./Util/colors";

export class AgesByCountry extends Component{
    constructor(){
        super();
        this.state = {
            data: [],
            showData : {
                labels: [
                    "0-9",
                    "10-19",
                    "20-29",
                    "30-39",
                    "40-49",
                    "50-59",
                    "60-69",
                    "70-79",
                    "80-89",
                    "90-99",
                    "100-..."
                ],
                datasets: [
                    {
                        backgroundColor: chartColors,
                        borderColor: "white",
                        borderWidth: 1,
                        data: [20, 100, 200, 25, 77, 10, 40, 50, 100, 70, 0]
                    }
                ]
            },
            value: null,
            options: {
                legend: {
                    display: false
                },
                scales: {
                    y : {
                        beginAtZero: true
                    }
                }
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (value) => {
        this.setState({
            value
        });
    }

    getData = () => {
        const { value, data } = this.state;
        
        if(value != null){
            let aux = data.filter((el) => {
                return el[0] === value;
            });
            return aux[0][1];
        }
        return null;
    }

    convertData(){
        this.state.showData.labels = [];
        this.state.showData.datasets[0].data = [];
        var data = this.getData();
        if(data == null)
            return;
        for(let i=0; i < data.length; i++){
            this.state.showData.labels.push(data[i].age);
            this.state.showData.datasets[0].data.push(data[i].total);
        }
    }

    getSelectPicker = () => {
        const { data } = this.state;
        let selectPicker = [];
        if(data == null)
            return selectPicker;
        for(let i = 0; i < data.length; i++){
            selectPicker.push({
                label: data[i][0],
                value: data[i][0]
            });
        }
        return selectPicker;
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
        let response = await fetch('https://us-central1-core-silicon-306401.cloudfunctions.net/getAges', options)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        this.setState({
            data: response
        });
    }

    render(){
        this.convertData();
        const { showData, options } = this.state;
        const selectPicker = this.getSelectPicker();
        return(
            <>
                <SelectPicker
                    placeholder="Select Country"
                    size="lg"
                    data={selectPicker}
                    style={{ width: 250, marginBottom: 20 }}
                    searchable={true}
                    onChange={this.handleChange}
                />
                <Bar data={showData} options={options} />
            </>
        )
    }
}

export default AgesByCountry;