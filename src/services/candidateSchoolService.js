import axios from "axios";

export default class candidateSchoolService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesSchools/getAll")
    }

    getByCandidateCvId(id){
        return axios.get("http://localhost:8080/api/candidatesSchools/getByCandidateCvId?id="+id)
    }

    getCandidateSchoolsOrdered(id){
        return axios.get("http://localhost:8080/api/candidatesSchools/getCandidateSchoolsByGraduationDateDesc?id="+id)
    }

    update(data){
        return axios.post("http://localhost:8080/api/candidatesSchools/update",data)
    }
    
    add(data){
        return axios.post("http://localhost:8080/api/candidatesSchools/add",data)
    }

}