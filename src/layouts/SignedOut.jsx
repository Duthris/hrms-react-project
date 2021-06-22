import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Button.Group size="large">
        <Button as={NavLink} to="/register" animated color="teal" size="large">
          <Button.Content size="large" visible>
            Register
          </Button.Content>
          <Button.Content size="large" hidden>
            <Icon name="signup" />
          </Button.Content>
        </Button>
        <div className="or" data-text="or"></div>
        <Button as={NavLink} to="/login" animated primary positive size="large">
          {" "}
          <Button.Content size="large" visible>
            Login
          </Button.Content>
          <Button.Content size="large" hidden>
            <Icon name="sign in alternate" />
          </Button.Content>
        </Button>
      </Button.Group>
    </div>
  );
}
