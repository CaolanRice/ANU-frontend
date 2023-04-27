import React, { useState } from "react";
import axios from "axios";

//initialize error and success state variables
const DeleteGodis = ({ godisId }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
 

  const handleDelete = () => {
    axios
        //godisId prop passed as param to this component to make up the delete url
      .delete(`http://localhost:8080/api/v1/godis/delete/${godisId}`)
      .then((response) => {
        console.log(response);
        setSuccess(true);
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setSuccess(false);
        setError("Failed to delete godis");
      });
  };

  //conditional rendering based on success and error states
  return (
    <div>
      {success ? (
        <p>Godis deleted!</p>
      ) : (
        <>
          <button onClick={handleDelete}>Delete Godis</button>
          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default DeleteGodis;