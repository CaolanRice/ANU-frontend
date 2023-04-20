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
    console.log(id)
    GodisService.getById(id)
      .then(response => {
        setSelectedGodis(response.data);
        console.log(response.data); 
        // console.log(id) //correct objectId
        // console.log(response.data.id) //returns undefined
        // console.log(selectedGodis.id) //returns null
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
          .then(response => {
            console.log(response.data);
            setMessage("Updated successfully");
          })
          .catch(error => {
            // console.log(selectedGodis.id); //returns undefined
            // console.log(id) //returns correct objectId
            console.log(error);
            setMessage("Update godis error")
          });
    };
 

    const deleteGodis = () => {
        GodisService.deleteById(id)
          .then(response => {
            console.log(response.data);
            navigate("/");
          })
          .catch(error => {
            console.log(selectedGodis.id);
            console.log(error);
            setMessage("delete godis error")
          });
      };

      // console.log(selectedGodis) 
      // console.log(selectedGodis.id)

    return (
        <div>
        {selectedGodis ? (
          <div className="edit-form">
            <h4>Godis</h4>
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
                <label htmlFor="rating">Rating</label>
                <input
                  type="text"
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
  
            <button className="badge badge-danger mr-2" onClick={deleteGodis}>
              Delete
            </button>
  
            <button
              type="submit"
              className="badge badge-success"
              onClick={updateGodis}
            >
              Update
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