import axios from "axios"

export default class CandidateService{
    getCandidates() {
        return axios.get("http://localhost:8080/api/candidates/getall")
    }

    register(candidate) {
        return axios.post("http://localhost:8080/api/candidates/register", candidate)
    }

    update(candidate) {
        return axios.post("http://localhost:8080/api/candidates/update", candidate)
    }
}
