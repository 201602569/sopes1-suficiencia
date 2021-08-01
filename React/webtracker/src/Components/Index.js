import React, { Component } from "react";
import { Col, Row, Container } from "rsuite";
import "rsuite/dist/styles/rsuite-dark.css";
import Typewriter from "typewriter-effect";

export class Index extends Component {
  render() {
    return (
      <>
        <Container>
          <Row>
            <Col md={24} sm={24}>
              <p className="main-title">
                <Typewriter
                  options={{
                    autoStart: true,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Get started")
                      .pauseFor(800)
                      .deleteAll()
                      .typeString("Explore")
                      .pauseFor(800)
                      .deleteAll()
                      .typeString("Visualize")
                      .pauseFor(800)
                      .deleteAll()
                      .typeString("All...")
                      .pauseFor(800)
                      .deleteAll()
                      .typeString("in one place ;)")
                      .pauseFor(2000)
                      .deleteAll()
                      .start();
                  }}
                />
              </p>
            </Col>
          </Row>
          <Row className="index-content">
            <p className="about">
              We engage ourselves to do our best to give you the best user
              experience.
            </p>

            <p className="experience">
              In this web tracker, you'll be able to see live results regarding
              of COVID-19 vacunnated people in the World as well as our server stats. Each
              report is given and elaborated on the easiest and most sutile way
              possible to get yourself confortable.
            </p>

            <p className="sub-title">We are Live Tracker.</p>
          </Row>
        </Container>
      </>
    );
  }
}

export default Index;
