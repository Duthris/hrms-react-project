import axios from "axios"

export default class jobAdvertisementFavoriteService {
    getByCandidateId(candidateId){
        return axios.get("http://localhost:8080/api/favorites/getByCandidateId?candidateId=" + candidateId)
    }

    addToFavorite(candidateId, jobAdvertisementId){
        return axios.post(`http://localhost:8080/api/favorites/add?candidateId=${candidateId}&jobAdvertisementId=${jobAdvertisementId}`)
    }

    deleteFromFavorite(id){
        return axios.post("http://localhost:8080/api/favorites/delete?id="+id)
    }
}