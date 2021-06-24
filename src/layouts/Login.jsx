import { Grid, Header, Segment, Form, Button, Message } from "semantic-ui-react"
import { Link } from "react-router-dom"

export default function Login() {

  return (
    <>
      <Grid
        textAlign="center"
        verticalAlign="middle"
      >
        <Grid.Column style={{ marginRight: "8em", marginTop: "13em" ,maxWidth: 450 }}>
          <Header as="h1" color="violet" textAlign="center">
            Login
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail"
                type="email"
                required
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                required
              />

              <Button color="violet" fluid size="large">
                Login
              </Button>
            </Segment>
          </Form>
          <Message color="violet">
            <h4>Are you a candidate or employer? <Link style={{ color: "#009C95" }} to="/register">Register now!</Link></h4> 
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}