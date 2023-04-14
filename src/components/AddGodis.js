import React, { Component } from "react";
import GodisDataService from "../services/GodisService";

export default class AddGodis extends Component {
    //initialize default values
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onChangeAttributes = this.onChangeAttributes.bind(this);
    this.saveGodis = this.saveGodis.bind(this);
    this.newGodis = this.newGodis.bind(this);

    this.state = {
      id: null,
      name: "", 
      type: "",
      rating: 0.0, 
      attributes: [],

      submitted : false

    };
  }

  //event handlers
  onChangeName(event) {
    this.setState({
      name: event.target.value
    });
  }

  onChangeType(event) {
    this.setState({
      type: event.target.value
    });
  }

  onChangeRating = (event) => {
    const value = parseFloat(event.target.value); 
    this.setState({ 
        rating: value });
  }

  onChangeAttributes(event) {
    const value = event.target.value;
    const attributesArray = value.split(","); //splits input values 
    this.setState({
      attributes: attributesArray
    });
  }

  //on submit
  saveGodis() {
    //create data object
    var data = {
      name: this.state.name,
      type: this.state.type,
      rating: this.state.rating,
      attributes: this.state.attributes
    };

    //pass data obj to create method in service class
    GodisDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          type: response.data.type,
          rating: response.data.rating,
          attributes: response.data.attributes,

          submitted: true

        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  //resets state so new godis can be added
  newGodis() {
    this.setState({
      id: null,
      name: "",
      type: "",
      rating: 0.0,
      attributes: [],

      submitted: false
        
    });
  }

  render() {
    return (
        <div className="submit-form">
            {/* conditional rendering based on submit state */}
          {this.state.submitted ? (
            <div>
              <h4>New godis created</h4>
              {/* calls newGodis function after successful creation */}
              <button className="btn btn-success" onClick={this.newGodis}>
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
                  value={this.state.name}
                  onChange={this.onChangeName}
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
                  value={this.state.type}
                  onChange={this.onChangeType}
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
                  value={this.state.rating}
                  onChange={this.onChangeRating}
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
                  value={this.state.attributes.join(",")} //saves individuals values to array 
                  onChange={this.onChangeAttributes}
                  name="attributes"
                />
              </div>
  
              <button onClick={this.saveGodis} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }

