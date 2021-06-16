import axios from "axios";

export default class WorkingMethodService{
    getAll(){
        return axios.get("http://localhost:8080/api/workingMethods/getAll")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/workingMethods/getById?id=",id)
    }

    add(data){
        return axios.post("http://localhost:8080/api/workingMethods/add",data)
    }
}