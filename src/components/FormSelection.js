import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { useHistory } from "react-router-dom";

function FormSelection(props) {
  const retrievedForms = props.dbForms;
  let history = useHistory();

  const handleChange = (e) => {
    props.onMakeSelection(e.target.value);
  };

  const handleSubmit = () => {
    if (props.id !== "-1") {
      history.push("/form");
    }
  };

  return (
    <div className="container-form-selection">
      {retrievedForms && retrievedForms.length === 0 ? (
        <div className="d-flex justify-content-center text-center text-light">
          <div className="row">
            <div className="col-12 mb-2">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
            <div className="col-12">
              <strong className="">Loading...</strong>
            </div>
          </div>
        </div>
      ) : (
        <form className="card bg-light bg-gradient">
          <div className="card-body">
            <h5 className="card-title mb-3">Please select a form</h5>
            <select
              value={props.id}
              className="form-select mb-3"
              onChange={handleChange}
            >
              <option value="-1">-- select a form --</option>
              {retrievedForms.map((form) => {
                return (
                  <option key={form._id} value={form._id}>
                    {form.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="card-footer text-end">
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={handleSubmit}
            >
              Confirm
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormSelection;
