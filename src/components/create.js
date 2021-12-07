import React, { useState } from "react";
// This will require to npm install axios
import axios from "axios";

const Create = (props) => {
  const [person_name, setPerson_name] = useState("");
  const [person_position, setPerson_position] = useState("");
  const [person_level, setPerson_level] = useState("");

  // These methods will update the state properties.
  const onChangePersonName = (e) => {
    setPerson_name(e.target.value);
  };

  const onChangePersonPosition = (e) => {
    setPerson_position(e.target.value);
  };

  const onChangePersonLevel = (e) => {
    setPerson_level(e.target.value);
  };

  // This function will handle the submission.
  const onSubmit = (e) => {
    e.preventDefault();

    // When post request is sent to the create url, axios will add a new record(newperson) to the database.
    const newperson = {
      person_name: person_name,
      person_position: person_position,
      person_level: person_level,
    };

    axios
      .post("http://localhost:5000/record/add", newperson)
      .then((res) => console.log(res.data));

    // We will empty the state after posting the data to the database
    setPerson_name("");
    setPerson_position("");
    setPerson_level("");
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Create New Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name of the person: </label>
          <input
            type="text"
            className="form-control"
            value={person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Person's position: </label>
          <input
            type="text"
            className="form-control"
            value={person_position}
            onChange={onChangePersonPosition}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityLow"
              value="Intern"
              checked={person_level === "Intern"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Intern</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityMedium"
              value="Junior"
              checked={person_level === "Junior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Junior</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="priorityOptions"
              id="priorityHigh"
              value="Senior"
              checked={person_level === "Senior"}
              onChange={onChangePersonLevel}
            />
            <label className="form-check-label">Senior</label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};

export default Create;
