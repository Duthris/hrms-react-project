import axios from "axios"

export default class EmployeeService{
    getEmployees(){
        return axios.get("http://localhost:8080/api/employees/getall")
    }

    add(employee){
        return axios.post("http://localhost:8080/api/employees/add", employee)
    }

    update(employee){
        return axios.post("http://localhost:8080/api/employees/update", employee)
    }
}