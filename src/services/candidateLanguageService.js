import axios from "axios";

export default class CandidateLanguageService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesLanguages/getAll")
    }

    getByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidatesLanguages/getByCandidateCvId?id="+id)
    }

    addLanguageToCv(id,data){
        return axios.post("http://localhost:8080/api/candidatesLanguages/addLanguageToCv",id,data)
    }


}