import React, { useState, useEffect } from "react";
import Axios from "axios";


export default function Team() {
  const [teamName, setTeamName] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [teamsList, setTeamsList] = useState([]);
  const [newTeamName, setNewTeamName] = useState("");
  
  //reading info
  useEffect(() => {
    Axios.get("https://backendtimeline.herokuapp.com/read").then((response) => {
      setTeamsList(response.data);
    });
  }, []);
  //sending the info
  const addNewTeam = () => {
    Axios.post("https://backendtimeline.herokuapp.com/insert", {
      teamName: teamName,
      teamDescription: teamDescription,
    });
  };
  //
  const updateTeam = (id) => {
    Axios.put("https://backendtimeline.herokuapp.com/update", {
      id: id,
      newTeamName: newTeamName,
    });
  };
  //
  const deleteTeam = (id) => {
    Axios.delete(`https://backendtimeline.herokuapp.com/delete/${id}`);
  };

  return(
    <div className="Team">
      <h1>Team CRUD APP</h1>

      <label>Team Name</label>
      <input
        type="text"
        onChange={(event) => {
          setTeamName(event.target.value);
        }}
      />
      <label>Team Description</label>
      <input
        type="text"
        onChange={(event) => {
          setTeamDescription(event.target.value);
        }}
      />
      <button onClick={addNewTeam}>Add New Team</button>

      <h1>Teams List</h1>
      {teamsList.map((val, key) => {
        return (
          <div key={key}>
            {" "}
            <h1>{val.teamName}</h1> <h1>{val.teamDescription}</h1>
            <input
              type="text"
              placeholder="New Team Name..."
              onChange={(event) => {
                setNewTeamName(event.target.value);
              }}
            />
            <button onClick={() => updateTeam(val._id)}>Update Team</button>
            <button onClick={() => deleteTeam(val._id)}>Delete Team</button>
          </div>
        );
      })}
    </div>
  ); 
}


