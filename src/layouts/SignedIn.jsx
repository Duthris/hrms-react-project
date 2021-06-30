import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Dropdown, Menu, Icon, Image } from 'semantic-ui-react'
import { userLogout } from "../store/actions/authActions"

export default function SingedIn() {

    const {authItem} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const history = useHistory();

    const handleLogout=(user)=>{
        dispatch(userLogout(user))
        history.push("/")
    }

    let dropItem="";
    if(authItem[0].user.userType===1){
        dropItem="Update the Cv";
    }else if(authItem[0].user.userType===2){
        dropItem="Update the Company Infos"
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
                        <Dropdown.Item><Icon name='cloud upload' /> {dropItem}</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleLogout(authItem[0].user)}><Icon name='sign-out' /> Çıkış yap</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
        </div>
    )
}