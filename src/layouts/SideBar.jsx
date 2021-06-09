import React from "react";
import { Icon, Menu } from "semantic-ui-react";

export default function SideBar() {
  return (
    <div>
      <Menu inverted icon="labeled" vertical color="violet">
        <Menu.Item name="bullhorn">
          <Icon name="bullhorn" />
          Job Advertisement
        </Menu.Item>

        <Menu.Item name="list alternate outline">
          <Icon name="list alternate outline" />
          Job Position
        </Menu.Item>

        <Menu.Item name="user">
          <Icon name="user" />
          Candidate
        </Menu.Item>

        <Menu.Item name="user">
          <Icon name="user" />
          Employer
        </Menu.Item>

        <Menu.Item name="user">
          <Icon name="user" />
          Employee
        </Menu.Item>
      </Menu>
    </div>
  );
}
