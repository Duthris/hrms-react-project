import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";

export default function SignedOut() {
  return (
    <div>
      <Button.Group size="medium">
        <Button as={NavLink} to="/register" animated color="teal" size="medium">
          <Button.Content size="large" visible>
            Register
          </Button.Content>
          <Button.Content size="large" hidden>
            <Icon name="signup" />
          </Button.Content>
        </Button>
        <div className="or" data-text="or"></div>
        <Button as={NavLink} to="/login" animated primary positive size="medium">
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
