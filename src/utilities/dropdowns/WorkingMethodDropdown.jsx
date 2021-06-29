import React, { useEffect, useState } from 'react'
import { Form } from 'semantic-ui-react'
import WorkingMethodService from '../../services/workingTimeService'
export default function WorkingMethodDropdown({onChangeEvent, value}) {
    const [workingMethod, setWorkingMethods] = useState([])

    useEffect(() => {
        let workingMethodService = new WorkingMethodService()
        workingMethodService.getAll().then(result => setWorkingMethods(result.data.data))
      }, [])
    return (
        <div>
            <Form.Select
                placeholder='Choose the Working Method'
                label="Working Method"
                name="workingMethod"
                search
                clearable
                options={workingMethod.map((workingMethod, index) => {
                    return { text: workingMethod.name, key: workingMethod.index, value: workingMethod.id }
                })}
                onChange={onChangeEvent}
                value= {value}
            />
        </div>
    )
}