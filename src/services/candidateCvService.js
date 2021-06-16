  import axios from "axios";

export default class CandidateCvService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesCvs/getAll")
    }

    getByCandidateId(id){
        return axios.get("http://localhost:8080/api/candidatesCvs/getByCandidateId?id="+id)
    }

    update(data){
        return axios.post("http://localhost:8080/api/candidatesCvs/update",data)
    }

    add(data){
        return axios.post("http://localhost:8080/api/candidatesCvs/add",data)
    }

    addCvAvatar(id,photo){
        return axios.post("http://localhost:8080/api/candidatesCvs/addCvAvatar?id="+id,photo)
    }

}
