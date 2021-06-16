import React from "react";
import { Button } from "semantic-ui-react";

export default function SignedOut({ signIn }) {
  return (
    <div>
      <Button.Group size="medium">
        <Button primary positive size="medium" onClick={signIn}>
          {" "}
          Sign In
        </Button>
        <div className="or" data-text="or"></div>
        <Button color="teal" size="medium">
          Sign Up
        </Button>
      </Button.Group>
    </div>
  );
}
