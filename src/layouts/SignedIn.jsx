import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Menu, Icon, Image } from 'semantic-ui-react'
import { userLogout } from "../store/actions/authActions"
import UpdateEmployer from '../utilities/EditPages/UpdateEmployer'
import Popup from "reactjs-popup";

export default function SingedIn() {

    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        history.push("/")
    }

    return (
        <div>
            <Menu.Item>
            <Image
            avatar
            spaced="right"
            src="https://avatars.githubusercontent.com/u/71668283?v=4"
          />
                <Dropdown pointing="top right" text={authItem[0].user.name}>
                    <Dropdown.Menu>
                    {authItem[0].user.userType===1 &&<Dropdown.Item as={Link} to={`/cvs/${authItem[0].user.id}`}>
                        <Icon name='cloud upload' />Cv ni Güncelle</Dropdown.Item>}

                        {authItem[0].user.userType===2 &&<Dropdown.Item>
                            <Popup trigger={<p><i className="cloud upload icon"></i>Şirket bilgilerini güncelle</p>} modal><UpdateEmployer/></Popup></Dropdown.Item>}
                        <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}><Icon name='sign-out' /> Çıkış yap</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}