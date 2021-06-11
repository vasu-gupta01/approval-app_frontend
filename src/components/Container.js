import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import api from "../utils/api";
// import axios from "axios";

import FormSelection from "./FormSelection";
import Form from "./Form";

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedFormID: "-1", dbForms: [] };

    this.handleFormSelect = this.handleFormSelect.bind(this);
    // this.getForms = this.getForms.bind(this);
  }

  componentDidMount() {
    api.getForms().then((res) => {
      if (res.data) {
        this.setState({ dbForms: res.data });
      }
    });
    // this.getForms();
  }

  // getForms = () => {
  //   axios.get("/api/forms").then((res) => {
  //     if (res.data) {
  //       this.setState({
  //         dbForms: res.data,
  //       });
  //     }
  //   });
  // };

  handleFormSelect(id) {
    this.setState({ selectedFormID: id });
  }

  render() {
    const id = this.state.selectedFormID;
    const dbForms = this.state.dbForms;

    return (
      <BrowserRouter>
        <div className="App-Container container d-flex align-items-center justify-content-center">
          <Switch>
            <Route
              path="/"
              component={() => (
                <FormSelection
                  id={id}
                  dbForms={dbForms}
                  onMakeSelection={this.handleFormSelect}
                />
              )}
              exact
            />
            <Route
              path="/form"
              component={() => <Form id={id} dbForms={dbForms} />}
              exact
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Container;
