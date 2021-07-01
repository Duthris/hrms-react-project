import axios from "axios";

export default class CandidateJobExperienceService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesJobExperiences/getAll")
    }


    getCandidateJobExperienceOrdered(id){
        return axios.get("http://localhost:8080/api/candidatesJobExperiences/getCandidateJobExperiencesByStartingDateDesc?id="+id)
    }

    getByCvId(id){
        return axios.get("http://localhost:8080/api/candidatesJobExperiences/getByCvId?id="+id)
    }

    add(jobExperience){
        return axios.post("http://localhost:8080/api/candidatesJobExperiences/add", jobExperience)
    }

    delete(id){
        return axios.post("http://localhost:8080/api/candidatesJobExperiences/delete?id="+id)
    }
}