import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.person_name}</td>
    <td>{props.record.person_position}</td>
    <td>{props.record.person_level}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
      <a
        href="/"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

const RecordList = (props) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/record/")
      .then((response) => {
        setRecords(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // This method will delete a record based on the method
  const deleteRecord = (id) => {
    axios.delete("http://localhost:5000/" + id).then((response) => {
      console.log(response.data);
    });

    setRecords(records.filter((el) => el._id !== id));
  };

  // This method will map out the users on the table
  const recordList = () => {
    return records.map((currentrecord) => {
      return (
        <Record
          record={currentrecord}
          deleteRecord={deleteRecord}
          key={currentrecord._id}
        />
      );
    });
  };

  return (
    <div>
      <h3>Record List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
};

export default RecordList;
