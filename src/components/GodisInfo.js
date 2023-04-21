import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import GodisService from "../services/GodisService";

const GodisInfo = () => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialGodisState = {
    id: null,
    name: "",
    type: "",
    rating: 0.0,
    attributes: []
  };

  const [selectedGodis, setSelectedGodis] = useState(initialGodisState);
  const [message, setMessage] = useState("");

  const getGodis = id => {
    GodisService.getById(id)
      .then(response => {
        setSelectedGodis(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (id)
      getGodis(id);
  }, [id]);

  const inputHandler = event => {
    const { name, value } = event.target;
    if (name === 'attributes') {
        // Split the input value to create array of attributes
        const attributes = value.split(',');
        setSelectedGodis({ ...selectedGodis, [name]: attributes });
    } else {
        setSelectedGodis({ ...selectedGodis, [name]: value });
    }
    };

    const updateGodis = () => {
        // GodisService.update(id)
        GodisService.update(selectedGodis.id, selectedGodis)
          .then(() => {
            setMessage(selectedGodis.name + " updated successfully");
          })
          .catch(error => {
            console.log(error);
            setMessage("Update godis error")
          });
    };
 

    const deleteGodis = () => {
        GodisService.deleteById(id)
          .then(() => {
            navigate("/");
          })
          .catch(error => {
            console.log(error);
            setMessage("delete godis error")
          });
      };


    return (
        <div>
        {selectedGodis ? (
          <div className="edit-form">
            <h4 style={{margin: "20px 15px 20px 20px",textAlign: "center"}}>Update Godis</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={selectedGodis.name}
                  
                  onChange={inputHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="type"
                  name="type"
                  value={selectedGodis.type}
                  onChange={inputHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating (0 - 10)</label>
                <input
                  type="text"
                  min = "0"
                  max = "10"
                  className="form-control"
                  id="rating"
                  name="rating"
                  value={selectedGodis.rating}
                  onChange={inputHandler}
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Attributes</label>
                <input
                  type="text"
                  className="form-control"
                  id="Attributes"
                  required
                  value={Array.isArray(selectedGodis.attributes) ? selectedGodis.attributes.join(",") : ""} //saves individuals values to array 
                  onChange={inputHandler}
                  name="attributes"
                />
              </div>
            </form>
  
            <button className="m-3 btn btn-sm btn-info" onClick={updateGodis}>
              Update
            </button>

            <button className="m-3 btn btn-sm btn-danger" onClick={deleteGodis}>
              Delete
            </button>
  
            <p>{message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please select a candy</p>
          </div>
        )}
      </div>
    );
}

export default GodisInfo;