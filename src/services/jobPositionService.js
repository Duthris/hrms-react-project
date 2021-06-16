import axios from "axios"

export default class JobPositionService{
    getJobPositions() {
        return axios.get("http://localhost:8080/api/jobpositions/getall")
    }

    add(data){
        return axios.post("http://localhost:8080/api/jobpositions/add",data)
    }
}
