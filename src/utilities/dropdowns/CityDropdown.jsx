import React, { useEffect, useState } from 'react'
import CityService from '../../services/cityService'
import { Form } from 'semantic-ui-react'

export default function CityDropDown({onChangeEvent, value}) {
    const [cities, setCities] = useState([])

    useEffect(() => {
        let cityService = new CityService()
        cityService.getAll().then(result => setCities(result.data.data))
    }, [])
    return (
        <div>
            <Form.Select
                placeholder='Choose a city'
                label="City"
                name="city"
                search
                clearable
                selection
                options={cities.map((city, index) => {
                    return { text: city.cityName, key: city.index, value: city.id }
                })}
                onChange={onChangeEvent}
                value = {value}
            />
        </div>
    )
}