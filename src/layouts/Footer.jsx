import React from "react";
import {
  Container,
  Grid,
  Header,
  Icon,
  List,
  Segment,
} from "semantic-ui-react";
export default function Footer() {
  return (
    <div className={"Footer"}>
      <Segment
        color="violet"
        inverted
        vertical
        style={{
          padding: "5em 0em",
          position: "static",
          bottom: 0,
          width: "100%",
        }}
      >
        <Container>
          <Grid divided inverted stackable>
            <Grid.Row>
              <Grid.Column width={3}>
                <List link inverted>
                  <List.Item as="a">About us</List.Item>
                  <List.Item as="a">Contact</List.Item>
                  <List.Item as="a">Cookie</List.Item>
                  <List.Item as="a">Privacy policy</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={13}>
                <div className="descriptionPosition">
                  <Header as="h2">
                    <Container>
                      <Icon name="users" color="olive" size="big" />
                    </Container>
                    <Header.Content>
                      <font color="#f5f5f5">
                        Human Resources Management System
                      </font>
                    </Header.Content>
                  </Header>
                  <Container>
                    © 2021 Human Resources Management System - All rights
                    reserved.
                  </Container>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}
