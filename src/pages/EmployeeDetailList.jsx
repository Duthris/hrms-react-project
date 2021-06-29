import React, { useState } from 'react'
import { useEffect } from 'react'
import EmployeeService from "../services/employeeService"
import EmployeeInfo from "../pages/EmployeeInfo"

export default function EmployeeDetailList() {

    const [employee, setEmployee] = useState([])

    useEffect(() => {
        const employeeService = new EmployeeService()
        employeeService.getById(1).then(result => setEmployee(result.data.data))
    }, [])

    return (
        <div>
            <div className="w-100 m-auto message-block">
                <EmployeeInfo employee={employee} />
            </div>            
        </div>
    )
}
