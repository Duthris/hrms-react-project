import axios from "axios";

export default class candidateTalentService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesTalents/getAll")
    }

    addToCv(id, data){
        return axios.post("http://localhost:8080/api/candidatesTalents/addTalentToCv",id,data)
    }

    getByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidatesTalents/getByCandidateCvId?id="+id)
    }
}