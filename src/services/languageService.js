import axios from "axios";

export default class LanguageService{
    getAll(){
        return axios.get("http://localhost:8080/api/languages/getAll")
    }

    add(language){
        return axios.post("http://localhost:8080/api/languages/add", language)
    }
}