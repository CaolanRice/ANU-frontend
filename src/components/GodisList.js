import React, { Component, useEffect, useState } from "react";
import GodisDataService from "../services/GodisService";
import { Link } from "react-router-dom";

export default class GodisList extends Component {
  //initailize 
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.fetchGodis = this.fetchGodis.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveGodis = this.setActiveGodis.bind(this);
    this.removeAllGodis = this.removeAllGodis.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      godis: [],
      currentGodis: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  //fetch data after component renders
  componentDidMount() {
    this.fetchGodis();
  }

  
  onChangeSearchName(event) {
    const searchName = event.target.value;
    this.setState({
      searchName: searchName
    });
  }

  fetchGodis() {
    GodisDataService.getAll()
      .then(response => {
        this.setState({
          godis: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  refreshList() {
    this.fetchGodis();
    this.setState({
      currentGodis: null,
      currentIndex: -1
    });
  }

  setActiveGodis(godis, index) {
    this.setState({
      currentGodis: godis,
      currentIndex: index
    });
  }

  removeAllGodis() {
    GodisDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchName() {
    GodisDataService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          godis: response.data
        });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { searchName, godis, currentGodis, currentIndex } = this.state;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}/>
              
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchName}>
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
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveGodis(godis, index)}
                  key={index}
                  >
                  {godis.name}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllGodis}>
            Delete all
          </button>
        </div>

        <div className="col-md-6">
          {currentGodis ? (
            <div>
              <h4>Godis</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentGodis.name}
              </div>

              <div>
                <label>
                  <strong>Type:</strong>
                </label>{" "}
                {currentGodis.type}
              </div>

              <div>
                <label>
                  <strong>Rating:</strong>
                </label>{" "}
                {currentGodis.rating}
              </div>

              <div>
                <label>
                  <strong>Attributes:</strong>
                </label>{" "}
                {currentGodis.attributes}
              </div>

              <Link to={"/godis" + currentGodis.id}
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
}
