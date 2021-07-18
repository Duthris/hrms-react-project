import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Dropdown, Menu, Icon, Image } from "semantic-ui-react";
import { userLogout } from "../store/actions/authActions";
import UpdateEmployer from "../utilities/EditPages/UpdateEmployer";
import Popup from "reactjs-popup";

export default function SingedIn() {
  const { authItem } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogout = (user) => {
    dispatch(userLogout(user));
    history.push("/");
  };

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
            {authItem[0].user.userType === 1 && (
              <Dropdown.Item as={Link} to={"/candidateCvUpdate"}>
                <Icon name="edit" />
                Update CV
              </Dropdown.Item>
            )}

            {authItem[0].user.userType === 2 && (
              <Dropdown.Item>
                <Popup
                  trigger={
                    <p>
                      <i className="edit icon"></i>Update Company Infos
                    </p>
                  }
                  modal
                >
                  <UpdateEmployer />
                </Popup>
              </Dropdown.Item>
            )}

            {authItem[0].user.userType === 3 && (
                <Dropdown.Item as={Link} to={"/employeeUpdate"}>
                    <Icon name="edit" /> Update Profile
                </Dropdown.Item>
            )}

            <Dropdown.Item onClick={() => handleLogout(authItem[0].user)}>
              <Icon name="sign-out" /> Exit
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
