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

    updateGithub(githubLink, cvId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateGithub?cvId=${cvId}&githubLink=${githubLink}`)
    }

    deleteGithub(cvId){
        return axios.put("http://localhost:8080/api/candidatesCvs/deleteGithub?cvId="+cvId)
    }

    updateLinkedin(linkedinLink, cvId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateLinkedin?cvId=${cvId}&linkedinLink=${linkedinLink}`)
    }

    deleteLinkedin(cvId){
        return axios.put("http://localhost:8080/api/candidatesCvs/deleteLinkedin?cvId="+cvId)
    }

    updateCoverLetter(coverLetter, cvId){
        return axios.put(`http://localhost:8080/api/candidatesCvs/updateCoverLetter?coverLetter=${coverLetter}&cvId=${cvId}`)
    }

}
