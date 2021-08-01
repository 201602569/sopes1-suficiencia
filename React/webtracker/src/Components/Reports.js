import React, { Component } from 'react';
import { Panel, PanelGroup, Row, Col } from "rsuite";
import Locations from './Reports/Locations';
import Top10Countries from './Reports/Top10Countries';
import PieLocations from "./Reports/PieLocation";
import Last5 from './Reports/Last5';
import AgesByCountry from './Reports/AgesByCountry';
import MapChart from "./Reports/Map";

export class Reports extends Component{
    constructor(){
        super();
        this.state = {
            current: 0,
            active: "Top10Countries"
        };
    }

    handleStepChange = (idx, activeKey) => {
        this.setState({ current: idx, active: activeKey })
    }

    setPage = () => {
        const { current } = this.state;
        if (current === 0) return <Top10Countries />
        else if(current === 1) return <Locations />
        else if(current === 2) return <PieLocations />
        else if(current === 3) return <Last5 />
        else if(current === 4) return <AgesByCountry />
        else return <div>Working on it!</div>
    }

    isActualPage = (compare) => {
        const { active } = this.state;
        if(active === compare) return this.setPage();
        return <></>;
    }

    render(){
        return(
            <div style={{ marginTop: "10px" }}>
                <Row>
                    <Col xs={24} md={12}>
                        <PanelGroup accordion bordered>
                            <Panel 
                                eventKey={1}
                                header="Top 10 Countries"
                                onEnter={() => this.handleStepChange(0, "Top10Countries")}
                            >
                                {this.isActualPage("Top10Countries")}
                            </Panel>
                            <Panel 
                                eventKey={2}
                                header="People by Country"
                                onEnter={() => this.handleStepChange(1, "PeopleByCountry")}
                            >
                                {this.isActualPage("PeopleByCountry")}
                            </Panel>
                            <Panel 
                                eventKey={3}
                                header="People by Country PIE"
                                onEnter={() => this.handleStepChange(2, "PeopleByCountryPIE")}
                            >
                                {this.isActualPage("PeopleByCountryPIE")}
                            </Panel>
                            <Panel 
                                eventKey={4}
                                header="Last 5 Vaccinated by Country"
                                onEnter={() => this.handleStepChange(3, "Last5Vaccinated")}
                            >
                                {this.isActualPage("Last5Vaccinated")}
                            </Panel>
                            <Panel 
                                eventKey={5}
                                header="Ages by Country"
                                onEnter={() => this.handleStepChange(4, "AgesByCountry")}
                            >
                                {this.isActualPage("AgesByCountry")}
                            </Panel>
                        </PanelGroup>
                    </Col>
                    <Col xs={24} md={12}>
                        <MapChart />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Reports;