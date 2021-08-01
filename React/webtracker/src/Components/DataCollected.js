import React, { Component } from 'react'
import {  Row, Col, Panel, PanelGroup } from "rsuite";
import MongoData from './DataCollected/MongoData';
import RedisData from './DataCollected/RedisData';

export class DataCollected extends Component {
    
    constructor() {
        super()
        this.state = {
          current: 0,
          active: "default",
        };
    }

  render() {
        return (
          <div style={{ marginTop: "10px" }}>
            <p>All the data is collected on NoSQL databases. MongoDB and Redis.</p>
            <h1>MongoDB</h1>
            <MongoData />
            <h1>Redis</h1>
            <RedisData />
          </div>
        );
    }
}

export default DataCollected
