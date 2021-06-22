import React from "react";
import {
  Grid,
  Header,
  Segment,
  Message,
  Tab,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import CandidateRegister from "../pages/CandidateRegister";
import EmployerRegister from "../pages/EmployerRegister";

export default function Register() {
  const tabs = [
    {
      menuItem: "Candidate",
      render: () => <CandidateRegister />,
    },
    {
        menuItem: "Employer",
        render: () => <EmployerRegister />,
    },
  ];

  return (
    <>
      <Grid
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" color="violet" textAlign="center">
            Register
          </Header>
          <Segment color="violet" stacked>
            <Tab panes={tabs} menu={{ secondary: true }} />
          </Segment>
          <Message color="violet">
            <h4>
              You already has an account?{" "}
              <Link style={{ color: "#16AB39" }} to="/login">
                Login!
              </Link>
            </h4>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}