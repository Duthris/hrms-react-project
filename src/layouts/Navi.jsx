import React, { useState } from "react";
import { Icon, Menu, Dropdown, Container, Grid } from "semantic-ui-react";
import SignedIn from "./SignedIn";
import SignedOut from "./SignedOut";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

export default function Navi() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const {authItem} = useSelector(state => state.auth)

  const history = useHistory();

  function handleSignOut() {
    setIsAuthenticated(false);
    history.push("/");
  }

  function handleSignIn() {
    setIsAuthenticated(true);
  }

  const options = [
    { key: 1, text: "Employers", icon: "user", as: NavLink, to: "/employers" },
    { key: 2, text: "Job Advertisements", icon: "bullhorn", as: NavLink, to: "/jobAdvertisements" },
    { key: 3, text: "Job Positions", icon: "list alternate outline", as: NavLink, to: "/jobPositions"},
  ];

  const options2 = [
    { key: 1, text: "Candidates", icon: "user", as: NavLink, to: "/candidates"},
    { key: 2, text: "Candidate Resumes", icon: "file alternate", as: NavLink, to: "/candidateCvs"},
  ]

  const options3 = [
    { key: 1, text: "Confirm Job Advertisement", icon: "clipboard check", as: NavLink, to: "/jobAdvertisementConfirm"},
  ]

  const options4 = [
    { key: 1, text: "Personels", icon: "user circle", as: NavLink, to: "/employees"},
  ]

  return (
    <div>
      <Grid stackable>
      <Menu stackable inverted fixed="top" size="large" color="violet">
          <Menu.Item name="user md" >
            <Icon name="user md" size="large" />
            Human Resource Management System
          </Menu.Item>

          <Menu.Item style={{margin:"0.5em"}} as={NavLink} to="/" name="home">
            <Icon name="home" /> Home
          </Menu.Item>
          <Container>
          <Dropdown trigger={<span><Icon name='building'/> Companies</span>}  
          style={{ marginLeft: "20em", marginRight: "1em" }} item direction="left" options={options} />

          <Dropdown trigger={<span><Icon name='user'/> Employees</span>}
          style={{ margin: "0.5em", marginleft: "1em"}} item direction="left" options={options4} /> 

          <Dropdown trigger={<span><Icon name='user'/> Candidates</span>}  
          style={{ margin: "0.5em", marginLeft: "0.1em"}} item direction="left" options={options2} />
            </Container>

        {authItem[0].loggedIn && authItem[0].user.userType===2 && <Menu.Item
            position="right"
            as={NavLink}
            to="/jobAdvertisementPost"
            name="user plus"
            style={{ margin: "0.5em" }}
          >
            <Icon name="user plus" /> Add Job Advertisement
          </Menu.Item> }
          
          <Menu.Menu style={{ margin: "0.5em" }}>
          {authItem[0].loggedIn?<SignedIn/>:<SignedOut/>}
          </Menu.Menu>

          {authItem[0].loggedIn && authItem[0].user.userType===3 &&
          <Dropdown trigger={<span><Icon name='key'/> Admin</span>}  style={{ margin: "0.5em" }} item direction="left" options={options3} />}

      </Menu>
      </Grid>
    </div>
  );
}
