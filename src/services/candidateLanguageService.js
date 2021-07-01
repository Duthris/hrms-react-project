import axios from "axios";

export default class CandidateLanguageService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesLanguages/getAll")
    }

    getByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidatesLanguages/getByCandidateCvId?id="+id)
    }

    addLanguageToCv(data,id){
        return axios.post("http://localhost:8080/api/candidatesLanguages/addLanguageToCv?candidateId="+id,data)
    }

    deleteFromCv(id){
        return axios.post("http://localhost:8080/api/candidatesLanguages/delete?languageId="+id)
    }

}