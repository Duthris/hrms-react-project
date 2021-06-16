import axios from "axios"

export default class JobAdvertisementService{
    getJobAdvertisements(){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAll")
    }

    getAllByCompanyId(id){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAllByCompanyId?id="+id)
    }

    getAllByComapnyName(companyName){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAllByCompanyName?companyName="+companyName)
    }

    getAllSorted(){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAllSorted")
    }

    getAllPassiveJobs(){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getAllPassiveJobs")
    }

    add(values){
        return axios.post("http://localhost:8080/api/jobAdvertisements/add", values)
    }

    activate(id,status){
        return axios.put("http://localhost:8080/api/jobAdvertisements/activate?activationStatus="+status+"&id="+id)
    }

    getById(id){
        return axios.get("http://localhost:8080/api/jobAdvertisements/getById?id="+id)
    }

    delete(jobAdvertisement){
        return axios.post("http://localhost:8080/api/jobAdvertisements/delete",jobAdvertisement)
    }
}