import React, { useEffect, useState } from 'react'
import JobPositionService from '../../services/jobPositionService'
import { Form } from 'semantic-ui-react'

export default function JobPositionDropdown({onChangeEvent, value}) {
    const [jobPositions, setJobPositions] = useState([])

    useEffect(() => {
        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))
    }, [])
    return (
        <div>
            <Form.Select
                placeholder='iş Pozisyonu seçiniz'
                label="iş Pozisyonu"
                name="jobPosition"
                search
                clearable
                selection
                options={jobPositions.map((jobPosition, index) => {
                    return { text: jobPosition.jobName, key: jobPosition.index, value: jobPosition.id }
                })}
                onChange={onChangeEvent}
                value = {value}
            />
        </div>
    )
}