import React, { useState } from "react";
import GodisService from "../services/GodisService";

const AddGodis = () => {
    //initialize default values
  const initialState = {
      id: null,
      name: "", 
      type: "",
      rating: 0.0, 
      attributes: [],

  }
  //state variables
  const [godis, setGodis] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);


  const inputHandler = event => {
    const { name, value } = event.target;
    if (name === 'attributes') {
        // Split the input value to create array of attributes
        const attributes = value.split(',');
        setGodis({ ...godis, [name]: attributes });
    } else {
        setGodis({ ...godis, [name]: value });
    }
};
  //save form data and create obj with state vals
  const saveGodis = () => {
    var data = {
      name: godis.name,
      type: godis.type,
      rating: godis.rating,
      attributes: godis.attributes
    };
  
  //calls create api to make new godis obj with form data
  GodisService.create(data)
      //update form state wih response data
      .then(response => {
        setGodis({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          rating: response.data.rating,
          attributes: response.data.atrributes
          
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    //reset form state and submission value
  const newGodis = () => {
    setGodis(initialState);
    setSubmitted(false);
  };

  
    return (
        <div className="submit-form">
            {/* conditional rendering based on submit state */}
          {submitted ? (
            <div>
              <h4>New godis created</h4>
              {/* calls newGodis function after successful creation */}
              <button className="btn btn-success" onClick={newGodis}>
                Add another
              </button>
            </div>
          ) : (
            //if not submitted
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={godis.name}
                  onChange={inputHandler}
                  name="name"
                />
              </div>
  
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input
                  type="text"
                  className="form-control"
                  id="Type"
                  required
                  value={godis.type}
                  onChange={inputHandler}
                  name="type"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <input
                  type="number"
                  className="form-control"
                  id="Rating"
                  required
                  value={godis.rating}
                  onChange={inputHandler}
                  name="rating"
                />
              </div>

              <div className="form-group">
                <label htmlFor="type">Attributes</label>
                <input
                  type="text"
                  className="form-control"
                  id="Attributes"
                  required
                  value={Array.isArray(godis.attributes) ? godis.attributes.join(",") : ""} //saves individuals values to array 
                  onChange={inputHandler}
                  name="attributes"
                />
              </div>
  
              <button onClick={saveGodis} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    };
  export default AddGodis;

