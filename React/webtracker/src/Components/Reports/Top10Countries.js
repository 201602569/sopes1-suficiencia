import React, { Component } from "react";
import { Table, Row, Col } from "rsuite";

const { Column, HeaderCell, Cell } = Table;

export class Top10Countries extends Component{
    constructor(){
        super();
        this.state = {
            data: []
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
        let response = await fetch('https://us-central1-core-silicon-306401.cloudfunctions.net/top10Locations', options)
            .then(response => response.json())
            .then(data => {
                return data;
            })
        this.setState({
            data: response
        });
    }

    render(){
        return(
            <Table
                height={400}
                data={this.state.data}
            >
                <Column width={"50%"} align={"center"} align="center">
                    <HeaderCell>Location</HeaderCell>
                    <Cell dataKey="location" />
                </Column>
                <Column width={"50%"} align={"center"} align="center">
                    <HeaderCell>Total</HeaderCell>
                    <Cell dataKey="total" />
                </Column>
            </Table>
        )
    }
}

export default Top10Countries;