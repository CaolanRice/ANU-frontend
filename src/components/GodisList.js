import React, { useEffect, useState } from "react";
import GodisService from "../services/GodisService";

const GodisList = () => {
  const [godis, setGodis] = useState([]);
  const [selectedGodis, setSelectedGodis] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const[searchName, setSearchName] = useState("");
  const [selectedType, setSelectedType] = useState("");


    useEffect(() => {
      getGodis();
    }, []);
  
  const getGodis = () => {
    GodisService.getAll()
      .then(response => {
        setGodis(response.data)
      })
      .catch(error => {
        console.log
        console.log(error);
      });
  };

  const refreshList = () => {
    getGodis();
    setSelectedGodis(null);
    setSelectedIndex(-1);
  };

  const setActiveGodis = (godis, index) => {
      setSelectedGodis(godis);
      setSelectedIndex(index);
  };

  const removeAllGodis = () => {
    GodisService.deleteAll()
      .then(response => {
        refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const removeGodis = () => {
    GodisService.deleteById(selectedGodis.id)
      .then(response => {
        refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const findByName = name => {
    setSearchName(name);
    if (name === ""){
      GodisService.getAll()
        .then(response =>{
          setGodis(response.data)
        })
        .catch(error =>{
          console.log(error)
        });
    } else {  
    GodisService.findByName(name)
      .then(response => {
          setGodis(response.data)
      })
      .catch(error => {
        console.log(error);
      });
    }
  };

  const findByType = type => {
    setSelectedType(type);
    if (type === "") {
      refreshList()
    } else {
      setSelectedGodis(null);
      GodisService.findByType(type)
        .then(response => {
          setGodis(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

    return (
      //search bar
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              // call the findByName function and pass the current value of the input field as an argument
              onChange={event => findByName(event.target.value)}/> 
          </div>
        </div>

        {/* type filter dropdown menu */}
        <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="typeFilter">Filter by Type:</label>
          <select
            className="form-control"
            id="typeFilter"
            value={selectedType}
            onChange={event => findByType(event.target.value)}>
            <option value="">All Types</option>
            <option value="Chocolate">Chocolate</option>
            <option value="Sweets">Sweets</option>
          </select>
        </div>
      </div>

        {/* current list of godis */}
        <div className="col-md-6">
          <h4>Godis List</h4>
          <ul className="list-group">
          {Array.isArray(godis) && godis.map((godis, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === selectedIndex ? "active" : "")
                  }
                  onClick={() => setActiveGodis(godis, index)}
                  key={index}
                  >
                  {godis.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-primary"
            onClick={() => window.location.href = '/add'}>
            Add new
          </button>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllGodis}>
            Delete all
          </button>
        </div>
        
        {/* selected godis info panel */}
        <div className="col-md-6">
          {selectedGodis ? (
            <div>
              <h4>Godis Information</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {selectedGodis.name}
              </div>

              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {selectedGodis.type}
              </div>

              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {selectedGodis.rating}
              </div>

              <div>
                <label>
                  <strong>Attributes:</strong>
                </label>{" "}
                {Array.isArray(selectedGodis.attributes) ? selectedGodis.attributes.join(",") : ""}
              </div>

            <button
              className="m-3 btn btn-sm btn-info"
              onClick={() => window.location.href = "/godis/" + selectedGodis.id}>
              Edit godis
            </button>

            <button className="m-3 btn btn-sm btn-danger" onClick={removeGodis}>
              Delete
            </button>
              
            </div>
          ) : (
            <div>
              <br />
              <p>Select godis</p>
            </div>
          )}
        </div>
      </div>
    );
} 

export default GodisList;
