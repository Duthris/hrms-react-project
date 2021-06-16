import axios from "axios";

export default class CandidateJobExperienceService{
    getAll(){
        return axios.get("http://localhost:8080/api/candidatesJobExperiences/getAll")
    }


    getCandidateJobExperienceOrdered(id){
        return axios.get("http://localhost:8080/api/candidatesJobExperiences/getCandidateJobExperiencesByStartingDateDesc?id="+id)
    }
}