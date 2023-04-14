import axios from "../api/axiosConfig";

//Service class for making http requests
class GodisDataService {
    getAll() {
      return axios.get("/godis");
    }

    findByName(name) {
        return axios.get(`/godis/name/${name}`);
      }
  
    getById(id) {
      return axios.get(`/godis/${id}`);
    }
  
    create(data) {
      return axios.post("/godis/add", data);
    }
  
    update(id, data) {
      return axios.put(`/godis/${id}`, data);
    }
  
    deleteById(id) {
      return axios.delete(`/godis/delete/${id}`);
    }
  
    deleteAll() {
      return axios.delete(`/godis`);
    }
  }
  
  export default new GodisDataService();