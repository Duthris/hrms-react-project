import React, { useEffect, useState } from 'react'
import { Label, Dropdown, Segment, Checkbox, Button } from 'semantic-ui-react'
import CityService from '../../services/cityService';
import JobPositionService from '../../services/jobPositionService'
import WorkingMethodService from '../../services/workingMethodService';
import WorkingTimeService from '../../services/workingTimeService';
import "../../App.css";

export default function JobAdvertisementFilter({ clickEvent }) {

    const [cities, setCities] = useState([])
    const [jobPositions, setJobPositions] = useState([])
    const [workingMethods, setWorkingMethods] = useState([])
    const [workingTimes, setWorkingTimes] = useState([])

    useEffect(() => {
        let cityService = new CityService()
        cityService.getAll().then(result => setCities(result.data.data))

        let jobPositionService = new JobPositionService()
        jobPositionService.getJobPositions().then(result => setJobPositions(result.data.data))

        let workingMethodService = new WorkingMethodService()
        workingMethodService.getAll().then(result => setWorkingMethods(result.data.data))

        let workingTimeService = new WorkingTimeService()
        workingTimeService.getAll().then(result => setWorkingTimes(result.data.data))
    }, [])

    const [cityIndexs, setCityIndexs] = useState([])
    const handleChangeCity = (e, { value }) => {
        setCityIndexs(value)
    }

    const [jobPositionsIndexes, setJobPositionsIndexes] = useState([])
    const handleChangeJobPosition = (e, { value, checked }) => {
        if (checked)
        jobPositionsIndexes.push(value)
        else {
            let index = jobPositionsIndexes.indexOf(value)
            if (index > -1) {
                jobPositionsIndexes.splice(index, 1)
            }
        }
    }

    const [workingMethodsIndexes, setWorkingMethodsIndexes] = useState([])
    const handleChangeWorkStyle = (e, { value, checked }) => {
        if (checked)
            workingMethodsIndexes.push(value)
        else {
            let index = workingMethodsIndexes.indexOf(value)
            if (index > -1) {
                workingMethodsIndexes.splice(index, 1)
            }
        }
    }

    const [workingTimeIndexes, setWorkingTimeIndexes] = useState([])
    const handleChangeWorkTimeStyle = (e, { value, checked }) => {

        if (checked)
            workingTimeIndexes.push(value)
        else {
            let index = workingTimeIndexes.indexOf(value)
            if (index > -1) {
                workingTimeIndexes.splice(index, 1)
            }
        }
    }

    return (
        <div>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">City</Label>
                <Dropdown
                    placeholder='Choose a City'
                    selection
                    search
                    multiple
                    clearable
                    options={cities.map((city, index) => {
                        return { text: city.cityName, key: city.index, value: city.id }
                    })}
                    onChange={handleChangeCity}
                    value={cityIndexs}
                />
            </Segment>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">Job Position</Label>
                {
                    jobPositions.map(jobPosition => (
                        <Checkbox
                        key={jobPosition.id}
                            label={jobPosition.positionName}
                            className="mt-4 d-block"
                            onChange={handleChangeJobPosition}
                            value={jobPosition.id}
                        />
                    ))
                }
            </Segment>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">Working Method</Label>
                {
                    workingMethods.map(workingMethod => (
                        <Checkbox
                        key={workingMethod.id}
                            label={workingMethod.workingMethod}
                            className="mt-4 d-block"
                            onChange={handleChangeWorkStyle}
                            value={workingMethod.id}
                        />
                    ))
                }
            </Segment>
            <Segment color="violet" raised>
                <Label color="violet" attached="top" size="large">Working Time</Label>
                {
                    workingTimes.map(workingTime => (
                        <Checkbox
                        key={workingTime.id}
                            label={workingTime.workingTime}
                            className="mt-4 d-block"
                            onChange={handleChangeWorkTimeStyle}
                            value={workingTime.id}
                        />
                    ))
                }
            </Segment>
            <Button
                type="button"
                fluid
                color="olive"
                onClick={() => clickEvent({ cityId: cityIndexs, jobPositionId: jobPositionsIndexes, workingMethodId: workingMethodsIndexes, workingTimeId: workingTimeIndexes })}
            >
                Filter
            </Button>            
        </div>
    )
}