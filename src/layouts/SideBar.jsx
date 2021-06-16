import React from "react";
import { NavLink } from "react-router-dom";
import { Icon, Menu } from "semantic-ui-react";

export default function SideBar() {
  return (
    <div>
      <Menu inverted icon="labeled" vertical color="violet">
        <Menu.Item as={NavLink} to="/jobAdvertisements" name="bullhorn">
          <Icon name="bullhorn" />
          Job Advertisement
        </Menu.Item>

        <Menu.Item as={NavLink} to="/jobPositions" name="list alternate outline">
          <Icon name="list alternate outline" />
          Job Position
        </Menu.Item>

        <Menu.Item as={NavLink} to="/candidates" name="user">
          <Icon name="user" />
          Candidate
        </Menu.Item>

        <Menu.Item as={NavLink} to="/employers" name="user">
          <Icon name="user" />
          Employer
        </Menu.Item>

        <Menu.Item as={NavLink} to="/employees" name="user">
          <Icon name="user" />
          Employee
        </Menu.Item>

        <Menu.Item as={NavLink} to="/candidateCvs" name="newspaper outline" >
          <Icon name="newspaper outline"/>
          Candidate Cvs
        </Menu.Item>
      </Menu>
    </div>
  );
}
