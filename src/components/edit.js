import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

function Edit({ props }) {
  const [person_name, setPerson_name] = useState("");
  const [person_position, setPerson_position] = useState("");
  const [person_level, setPerson_level] = useState("");
  const [records, setRecords] = useState([]);
  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/record/" + id)
      .then((response) => {
        setPerson_name(response.data.person_name);
        setPerson_position(response.data.person_position);
        setPerson_level(response.data.person_level);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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
    const newEditedperson = {
      person_name: person_name,
      person_position: person_position,
      person_level: person_level,
    };
    console.log(newEditedperson);

    // This will send a post request to update the data in the database.
    axios
      .post("http://localhost:5000/update/" + id, newEditedperson)
      .then((res) => console.log(res.data));

    navigate("/");
  };

  // This following section will display the update-form that takes the input from the user to update the data.
  return (
    <div>
      <h3 align="center">Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Person's Name: </label>
          <input
            type="text"
            className="form-control"
            value={person_name}
            onChange={onChangePersonName}
          />
        </div>
        <div className="form-group">
          <label>Position: </label>
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
        <br />

        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Edit;
