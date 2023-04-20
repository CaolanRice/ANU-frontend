import React, { useEffect, useState } from "react";
import GodisService from "../services/GodisService";
import { Link } from "react-router-dom";

const GodisList = () => {
  //initailize 
  const [godis, setGodis] = useState([]);
  const [selectedGodis, setSelectedGodis] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const[searchName, setSearchName] = useState("");

    useEffect(() => {
      getGodis();
    }, []);
  
  const onChangeSearchName = (event) => {
    const searchName = event.target.value;
    setSearchName(searchName);
  }

  const getGodis = () => {
    GodisService.getAll()
      .then(response => {
        setGodis(response.data)
        console.log(response.data);
      })
      .catch(error => {
        console.log
        console.log(error);
      });
  }

  const refreshList = () => {
    getGodis();
    setSelectedGodis(null);
    setSelectedIndex(-1);

  }

  const setActiveGodis = (godis, index) => {
      setSelectedGodis(godis);
      console.log(godis);
      console.log(godis.id);
      setSelectedIndex(index);
  }

  const removeAllGodis = () => {
    GodisService.deleteAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  }
  // console.log(id);
  // console.log(selectedGodis.id);

  const findByName = () => {
    GodisService.findByName(searchName)
      .then(response => {
          setGodis(response.data)
          console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={onChangeSearchName}/>
              
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByName}>
                Search
              </button>
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <h4>Godis List</h4>
          <ul className="list-group">
            {godis &&
              godis.map((godis, index) => (
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
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllGodis}>
            Delete all
          </button>
        </div>

        <div className="col-md-6">
          {selectedGodis ? (
            <div>
              <h4>Godis</h4>
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
                {selectedGodis.attributes}
              </div>

              <Link to={"/godis/" + selectedGodis.id}
                className="badge badge-warning" >
                Edit godis
              </Link>
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
