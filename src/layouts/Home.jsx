import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  Container,
  Button,
  Icon,
  Item,
  Menu,
} from "semantic-ui-react";
import '../App.css'

export default function Footer() {

    const {authItem} = useSelector(state => state.auth)

    return (
      <div>
        <Container style={{ marginTop: "5em" }}>
          <Item.Group>
            <Item>
                <div className="home-logo">
              <Item.Image
                style={{ marginTop: "5em" }}
                size="big"
                src="https://www.collegehippo.com/blog/wp-content/uploads/2020/09/human-resource-management-transparent-png-download-for-free-human-resource-management-png-920_582.jpg"
              />
              </div>

            <div className="home-text">
              <Item.Content style={{ marginTop: "2em" }}>
                <Item.Header style={{ marginTop: "10em" }}>
                  <h1 className="text-color">{"Human Resource Management System"}</h1>
                </Item.Header>
                <Item.Meta style={{ marginTop: "1em" }}></Item.Meta>
                <Item.Description style={{ marginTop: "1em" }}>
                  {
                   <h3 className="description-color">{"“The journey of a thousand miles begins with one step.”"}</h3> 
                  }
                </Item.Description>

                {!authItem[0].loggedIn && 
                <Item.Extra style={{ marginTop: "1em" }}>
                  {
                    <h4>"Would you like to take this step with us?"</h4>
                  }
                </Item.Extra>}

                {!authItem[0].loggedIn && 
                <Menu.Item style={{ marginTop: "1em" }}>
                  <Button.Group size="medium">
                    <Button
                      as={NavLink}
                      to="/register"
                      animated
                      color="teal"
                      size="large"
                    >
                      <Button.Content size="large" visible>
                        Register
                      </Button.Content>
                      <Button.Content size="large" hidden>
                        <Icon name="signup" />
                      </Button.Content>
                    </Button>
                    <div className="or" data-text="or"></div>
                    <Button
                      as={NavLink}
                      to="/login"
                      animated
                      primary
                      positive
                      size="large"
                    >
                      {" "}
                      <Button.Content size="large" visible>
                        Login
                      </Button.Content>
                      <Button.Content size="large" hidden>
                        <Icon name="sign in alternate" />
                      </Button.Content>
                    </Button>
                  </Button.Group>
                </Menu.Item>}
              </Item.Content>
              </div>
            </Item>
          </Item.Group>
        </Container>
      </div>
    );
  }