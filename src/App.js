import './App.css';
import api from "./api/axiosConfig"
import { useState, useEffect } from 'react';

function App() {

  //destructed array from useState hook
  const [godis, setGodis] = useState();

  //get request returns array of godis data
  const getGodis = async () =>{

  try{

    const response = await api.get("/api/v1/godis");
    console.log(response.data);
    setGodis(response.data);

  } catch(err){
    console.log(err);
  }

  }

  //logs results returned from call from endpoint

  //getGodis func executed on app load
  useEffect(() => {
    getGodis();
  },[])

  return (
    <div className="App">
  
    </div>
  );
}

export default App;
