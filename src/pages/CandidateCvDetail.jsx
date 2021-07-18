import React, { useState } from 'react'
import { useEffect } from 'react'
import CandidateCvService from "../services/candidateCvService"
import CandidateCvInfo from "../pages/CandidateCvInfo"
import PersonalInfosUpdation from "../utilities/EditPages/PersonalInfosUpdation"
import { useSelector } from 'react-redux'

export default function CandidateCvDetail() {

    const [cv, setCv] = useState([])

    const {authItem} = useSelector(state => state.auth)

    useEffect(() => {
        const candidateCvService = new CandidateCvService()
        candidateCvService.getById(authItem[0].user.id).then(result => setCv(result.data.data))
    }, [])

    return (
        <div>
            <div className="w-100 m-auto message-block">
                <CandidateCvInfo cv={cv} />
            
            </div>            
        </div>
    )
}
