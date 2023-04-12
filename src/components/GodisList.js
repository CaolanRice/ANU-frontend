import React, {useEffect, useState} from "react";
import axios from "../api/axiosConfig";

const GodisList = () => {
    const[godis, setGodis] = useState([]);

    useEffect(() => {
        axios.get('/godis')
            .then(response => {
                setGodis(response.data);
            })
            .catch(error => {
                console.error("Failed fetching godis", error);
            });
    }, []);



    return (
        <div>
          <h1>Current godis</h1>
          <ul>
            {godis.map(godis => (
              <li key={godis.id}>
                {/* join the elements in attributes list with "," if not null */}
                Name: {godis.name} - Type: {godis.type} - Rating: {godis.rating} - Attributes: {godis.attributes ? godis.attributes.join(",") : ""} 
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default GodisList;