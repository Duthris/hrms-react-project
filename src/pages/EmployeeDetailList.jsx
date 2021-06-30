import React, { useState } from 'react'
import { useEffect } from 'react'
import EmployeeService from "../services/employeeService"
import EmployeeInfo from "../pages/EmployeeInfo"
import { useSelector } from 'react-redux'

export default function EmployeeDetailList() {

    const [employee, setEmployee] = useState([])

    const {authItem} = useSelector(state => state.auth)

    useEffect(() => {
        const employeeService = new EmployeeService()
        employeeService.getById(authItem[0].user.id).then(result => setEmployee(result.data.data))
    }, [])

    return (
        <div>
            <div className="w-100 m-auto message-block">
                <EmployeeInfo employee={employee} />
            </div>            
        </div>
    )
}
