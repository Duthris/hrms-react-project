import axios from "axios";

export default class userService{
    getAll(){
        return axios.get("http://localhost:8080/api/users/getall")
    }

    login(user){
        return axios.post("http://localhost:8080/api/users/login", user)
    }
}