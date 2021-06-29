import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import WorkingTimeService from '../../services/workingTimeService'

export default function WorkingMethodDropdown({onChangeEvent, value}) {
    const [workingTime, setWorkingTime] = useState([])

    useEffect(() => {
        let workingTimeService = new WorkingTimeService()
        workingTimeService.getAll().then(result => setWorkingTime(result.data.data))
      }, [])

    return (
        <div>
            <Form.Select
                placeholder='Choose the Working Time'
                label="Working Time"
                name="workingTime"
                search
                clearable
                options={workingTime.map((workingTime, index) => {
                    return { text: workingTime.name, key: workingTime.index, value: workingTime.id }
                })}
                onChange={onChangeEvent}
                value= {value}
            />
        </div>
    )
}