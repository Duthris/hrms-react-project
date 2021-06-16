import React, { useState } from "react";
import { Icon, Menu } from "semantic-ui-react";
import { Container } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const history = useHistory();

  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  return (
    <div>
      <Menu inverted fixed="top" size="large" color="violet">
        <Container>
          <Menu.Item name="user md">
            <Icon name="user md" size="large" />
            Human Resource Management System
          </Menu.Item>
          <Menu.Item as={NavLink} to="/" name="home">
            <Icon name="home" /> Home
          </Menu.Item>

          <Menu.Item position="right" as={NavLink} to="/jobAdvertisementPost" name="user plus">
            <Icon name="user plus" /> Add Job Advertisement
          </Menu.Item>

          <Menu.Item position="left" as={NavLink} to="/jobAdvertisementConfirm" name="clipboard check">
            <Icon name="clipboard check" /> Confirm Job Advertisement
          </Menu.Item>

          <Menu.Menu style={{ margin: '0.5em' }}>
            {isAuthenticated ? (
              <SignedIn signOut={handleSignOut} />
            ) : (
              <SignedOut signIn={handleSignIn} />
            )}
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
}
