import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Switch, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


import './App.css';
import GodisList from './components/GodisList';
import DeleteGodis from './components/DeleteGodis';
import AddGodis from "./components/AddGodis";
import GodisInfo from "./components/GodisInfo";


function App() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <a href="/" className="navbar-brand">
            Home
          </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
                Godis List
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<GodisList/>} />
            <Route path="/add" element={<AddGodis/>} />
            <Route path="/delete/:id" element={<DeleteGodis/>} />
            <Route path="/godis/:id" element={<GodisInfo/>} />
          </Routes>
        </div>
      </div>
    );
  }


export default App;