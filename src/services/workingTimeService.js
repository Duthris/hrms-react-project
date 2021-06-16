import axios from "axios";

export default class WorkingTimeService{
    getAll(){
        return axios.get("http://localhost:8080/api/workingTimes/getAll")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/workingTimes/getById?id=",id)
    }

    add(data){
        return axios.post("http://localhost:8080/api/workingTimes/add",data)
    }
}