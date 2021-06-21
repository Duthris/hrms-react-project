import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Button.Group size="large">
        <Button animated color="teal" size="large">
          <Button.Content size="large" visible>
            Sign Up
          </Button.Content>
          <Button.Content size="large" hidden>
            <Icon name="signup" />
          </Button.Content>
        </Button>
        <div className="or" data-text="or"></div>
        <Button animated primary positive size="large" onClick={signIn}>
          {" "}
          <Button.Content size="large" visible>
            Sign In
          </Button.Content>
          <Button.Content size="large" hidden>
            <Icon name="sign in alternate" />
          </Button.Content>
        </Button>
      </Button.Group>
    </div>
  );
}
