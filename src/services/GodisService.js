import axios from "../api/axiosConfig";

//Service class for making http requests

    const getAll = () => {
      return axios.get("/godis");
    }

    const findByName =(name) => {
        return axios.get(`/godis/name/${name}`);
      }
  
    const getById = (id) => {
      return axios.get(`/godis/${id}`);
    }
  
    const create = (data) => {
      return axios.post("/godis/add", data);
    }
  
    const update = (id, data) => {
      return axios.put(`/godis/${id}`, data);
    }
  
    const deleteById =(id) => {
      return axios.delete(`/godis/delete/${id}`);
    }
  
    const deleteAll = () => {
      return axios.delete(`/godis/delete/all`);
    }

    const GodisService = {
      getAll,
      findByName,
      getById,
      create,
      update,
      deleteById,
      deleteAll
    };
  
  export default GodisService;