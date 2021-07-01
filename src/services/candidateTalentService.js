import axios from "axios";

export default class candidateTalentService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesTalents/getAll")
    }

    addTalentToCv(id, data){
        return axios.post("http://localhost:8080/api/candidatesTalents/addTalentToCv?candidateId="+id,data)
    }

    getByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidatesTalents/getByCandidateCvId?id="+id)
    }

    delete(id){
        return axios.post("http://localhost:8080/api/candidatesTalents/delete?talentId="+id)
    }
}