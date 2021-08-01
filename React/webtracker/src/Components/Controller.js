import React, { Component } from "react";
import {
  Steps,
  Container,
  Header,
  Footer,
  Content,
  Divider,

} from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";
import Index from "./Index";
import DataCollected from "./DataCollected";
import Reports from "./Reports";

export class Controller extends Component {
  constructor() {
    super();
    this.state = {
      current: 0,
    };
  }

  handleStepChange = (idx) => {
    this.setState({ current: idx });
  };

  setPage() {
    const { current } = this.state;
    if (current === 0) return <Index />;
    else if(current === 1) return <DataCollected />;
    else return <Reports />;
  }

  render() {
    const actualContent = this.setPage();
    return (
      <>
        <div style={{ padding: "5%" }}>
          <Container style={{ minHeight: "100vh" }}>
            <Header>
              <Steps current={this.state.current}>
                <Steps.Item
                  onClick={() => this.handleStepChange(0)}
                  title="Index"
                  description="About Live Tracker"
                />
                <Steps.Item
                  onClick={() => this.handleStepChange(1)}
                  title="COVID-19"
                  description="Visualize collected data"
                />
                <Steps.Item
                  onClick={() => this.handleStepChange(2)}
                  title="REPORTS"
                  description="View the data in an organized format"
                />
              </Steps>
            </Header>
            <Content style={{marginTop:40}}>{actualContent}</Content>
          </Container>
        </div>
        <Divider />
        <Footer className="container-footer">
            <p className='title-footer' style={{ fontSize: 20 }}>
              <b>Live Tracker</b>
            </p>
            <p className='copyright' style={{ fontSize: 15 }}>&copy; 2021. All rights reserved</p>
        </Footer>
      </>
    );
  }
}

export default Controller;
