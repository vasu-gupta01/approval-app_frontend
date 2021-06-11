import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Redirect } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";
import config from "../config/config";
import UserService from "../services/user.service";
import logo from "../images/Beta-HealthcareLG-Trebuchet-MS-font.png";

import FormResult from "./FormResult";
import Checkbox from "./Checkbox";

class Form extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      formID: "",
      filled_by: "",
      department: "",
      formFields: [],
      formData: {},
      done: false,
      approvers: [],
      checkedApprovers: new Map(),
      approversValid: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendForm = this.sendForm.bind(this);
    // this.handleCheckedChange = this.handleCheckedChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.fieldsGenerator = this.fieldsGenerator.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    const dbForms = this.props.dbForms;

    let dataArray = {};
    var vname = "";
    var vformFields = [];
    var vfilledBy = "";
    const form_id = this.props.id;

    if (form_id && this._isMounted) {
      this.setState({ formID: form_id });
      UserService.getForm({ id: this.props.id }).then((res) => {
        vname = res.data.name;
        vformFields = res.data.fields;

        this.setState({
          name: vname,
          filled_by: vfilledBy,
          formFields: vformFields,
          formData: dataArray,
        });

        for (let i = 0; i < vformFields.length; i++) {
          dataArray[vformFields[i].name] = "";
          vformFields[i].value = "";
        }
      });
    }
    // for (let i = 0; i < dbForms.length; i++) {
    //   if (dbForms[i]._id === this.props.id) {
    //     form_id = dbForms[i]._id;
    //     vname = dbForms[i].name;
    //     vformFields = dbForms[i].fields;
    //     vfilledBy = dbForms[i].filled_by;
    //   }
    // }

    api.getApprovers().then((res) => {
      if (res.data && this._isMounted) {
        this.setState({ approvers: res.data });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fieldsGenerator(fields) {
    if (fields) {
      return fields.map((field) => {
        if (field.type) {
          switch (field.type.name) {
            case "select":
              return (
                <div key={"div_" + field._id} className="form-floating mb-3">
                  <select
                    className="form-select"
                    id="floatingSelect"
                    aria-label="Floating label"
                    onChange={(e) => this.handleDeptChange(e.target.value)}
                  >
                    <option selected value="">
                      -- department --
                    </option>
                    {field.type.options.map((option) => {
                      return (
                        <option key={"key_" + option} value={option}>
                          {option}
                        </option>
                      );
                    })}
                  </select>
                  <label
                    key={"label_" + field._id}
                    htmlFor="floatingSelect"
                    className="text-muted"
                  >
                    {field.name}
                  </label>
                </div>
              );
            default:
              return (
                <div key={"div_" + field._id} className="form-floating mb-3">
                  <input
                    key={field._id}
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder={field.name}
                    onChange={(e) =>
                      this.handleChange(e.target.value, field._id)
                    }
                  />
                  <label
                    key={"label_" + field._id}
                    htmlFor="floatingInput"
                    className="text-muted"
                  >
                    {field.name}
                  </label>
                </div>
              );
          }
        } else {
          return (
            <div key={"div_" + field._id} className="form-floating mb-3">
              <input
                key={field._id}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder={field.name}
                onChange={(e) => this.handleChange(e.target.value, field._id)}
              />
              <label
                key={"label_" + field._id}
                htmlFor="floatingInput"
                className="text-muted"
              >
                {field.name}
              </label>
            </div>
          );
        }
      });
    } else {
      return <div>No DATA</div>;
    }
  }

  sendForm = (e) => {
    e.preventDefault();
    //const date = new Date().getTime();
    const checked_approvers = this.state.checkedApprovers;

    let vapproval = [];

    for (let approver of checked_approvers.keys()) {
      if (checked_approvers.get(approver) === true) {
        vapproval.push(approver);
      }
    }

    const form = {
      filled_by: this.state.filled_by,
      form_id: this.state.formID,
      form_title: this.state.name,
      fields: this.state.formFields,
      approved: false,
      date_approved: null,
      approval: this.state.approvers,
      department: this.state.department,
    };

    let error = false;

    if (form.fields) {
      axios
        .post("/api/sendform", form)
        .then()
        .catch((err) => {
          error = true;
          console.log(err);
        });
    } else {
      console.log("input fields are required");
    }

    if (!error) {
      this.setState({ done: true });
    }
  };

  handleChange = (value, id) => {
    let data = this.state.formFields;

    for (let field of data) {
      if (field._id === id) {
        field.value = value;
      }
    }

    this.setState({ formFields: data });
  };

  handleNameChange = (value) => {
    this.setState({ filled_by: value });
  };

  handleDeptChange = (value) => {
    this.setState({ department: value });
  };

  handleValidation = (e) => {
    var forms = document.querySelectorAll(".needs-validation");

    Array.prototype.slice.call(forms).array.forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  };

  errorClass(error) {
    return error ? "is-invalid" : "";
  }

  // handleCheckedChange(e) {
  //   const item = e.target.value;
  //   const isChecked = e.target.checked;
  //   this.setState((prevState) => ({
  //     checkedApprovers: prevState.checkedApprovers.set(item, isChecked),
  //   }));
  // }

  validateForm() {}

  render() {
    if (this.props.id === "-1") {
      return <Redirect to="/" />;
    }

    const fields = this.state.formFields;
    const approvers = this.state.approvers;

    return (
      <div className="container-form">
        <form className="card bg-light bg-gradient" autoComplete="off">
          <div className="row card-body">
            <img src={logo} className="img-fluid" alt="logo"></img>
          </div>
          <div className="card-body">
            <h2 className="card-title mb-4 text-center">
              {this.state.name} form
            </h2>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Employee Name"
                onChange={(e) => {
                  this.handleNameChange(e.target.value);
                }}
              />
              <label className="text-muted" htmlFor="floatingInput">
                Employee Name
              </label>
            </div>
            {this.fieldsGenerator(fields)}
          </div>
          <div className="card-body">
            {/* {approvers.map((approver) => {
              return (
                <div className="form-check" key={"div_" + approver._id}>
                  <Checkbox
                    class_name={`form-check-input ${this.errorClass(
                      this.state.approversValid
                    )}`}
                    value={approver._id}
                    id={"id_" + approver._id}
                    key={"input_" + approver._id}
                    checked={this.state.checkedApprovers.get(approver._id)}
                    onChange={this.handleCheckedChange}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={"id_" + approver._id}
                    key={"label_" + approver._id}
                  >
                    {approver.firstname} {approver.lastname}
                  </label>
                  <div className="invalid-feedback">
                    You must select an approver.
                  </div>
                </div>
              );
            })} */}
          </div>
          <div className="card-footer text-end">
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={this.sendForm}
            >
              Submit
            </button>
          </div>
          <FormResult success={true} show={this.state.done} />
        </form>
      </div>
    );
  }
}

export default Form;
