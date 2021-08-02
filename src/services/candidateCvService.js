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

    getById(id){
        return axios.get("http://localhost:8080/api/candidatesCvs/getById?id="+id)
    }

    updateGithub(githubLink, candidateId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateGithub?candidateId=${candidateId}&githubLink=${githubLink}`)
    }

    deleteGithub(candidateId){
        return axios.put("http://localhost:8080/api/candidatesCvs/deleteGithub?candidateId="+candidateId)
    }

    updateLinkedin(linkedinLink, candidateId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateLinkedin?candidateId=${candidateId}&linkedinLink=${linkedinLink}`)
    }

    deleteLinkedin(candidateId){
        return axios.put("http://localhost:8080/api/candidatesCvs/deleteLinkedin?candidateId="+candidateId)
    }

    updateCoverLetter(coverLetter, candidateId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateCoverLetter?coverLetter=${coverLetter}&candidateId=${candidateId}`)
    }

    deleteCvAvatar(candidateId){
        return axios.post("http://localhost:8080/api/candidatesCvs/deleteCvAvatar?candidateId="+candidateId)
    }

}
