import axios from "axios"

export default class EmployerService{
    getEmployers(){
        return axios.get("http://localhost:8080/api/employers/getall")
    }

    getById(id){
        return axios.get("http://localhost:8080/api/employers/getById?id="+id)
    }

    register(employer){
        return axios.post("http://localhost:8080/api/employers/register", employer)
    }

    update(employer){
        return axios.post("http://localhost:8080/api/employers/update", employer)
    }
}