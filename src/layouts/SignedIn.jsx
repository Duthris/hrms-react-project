import React from "react";
import { Dropdown, Menu, Image } from "semantic-ui-react";

export default function SignedIn({signOut}) {
  return (
    <div>
        <Menu.Item>
          <Image
            avatar
            spaced="right"
            src="https://avatars.githubusercontent.com/u/71668283?v=4"
          />
          <Dropdown pointing="top left" text="Duthris" style={{margin: '0.5em' }}>
            <Dropdown.Menu>
              <Dropdown.Item text="Profile" icon="info" />
              <Dropdown.Item onClick={signOut} text="Exit" icon="sign-out" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
    </div>
  );
}
