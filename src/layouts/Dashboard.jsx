import React from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router";
import JobAdvertisementList from "../pages/JobAdvertisementList";
import EmployeeList from "../pages/EmployeeList";
import EmployerList from "../pages/EmployerList";
import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/CandidateList";
import CandidateCvList from "../pages/CandidateCvList"
import CandidateCvDetailList from "../pages/CandidateCvDetailList";
import JobAdvertisementPost from "../pages/JobAdvertisementPost"
import JobAdvertisementConfirm from "../pages/JobAdvertisementConfirmation";
import JobAdvertisementDetails from "../pages/JobAdvertisementDetails";
import EmployerDetailList from "../pages/EmployerDetailList";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
import EmployeeDetailList from "../pages/EmployeeDetailList"
import CandidateCvDetail from "../pages/CandidateCvDetail"
import { useSelector } from "react-redux";

export default function Dashboard() {

  const {authItem} = useSelector(state => state.auth)

  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={3}>
            
          </Grid.Column>
          <Grid.Column width={13}>
            <Route exact path="/" component={Home} />
            <Route exact path="/jobAdvertisements" component={JobAdvertisementList} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route exact path="/employers" component={EmployerList} />
            <Route exact path="/employers/:id" component={EmployerDetailList} />
            <Route exact path="/jobPositions" component={JobPositionList} />
            <Route exact path="/candidates" component={CandidateList} />
            <Route exact path="/candidateCvs" component={CandidateCvList} />
            <Route exact path="/candidateCvs/:id" component={CandidateCvDetailList} />
            {authItem[0].loggedIn && authItem[0].user.userType===2 && 
            <Route exact path="/jobAdvertisementPost" component={JobAdvertisementPost} /> }

            {authItem[0].loggedIn && authItem[0].user.userType===3 && 
            <Route exact path="/jobAdvertisementConfirm" component={JobAdvertisementConfirm} /> }

            <Route exact path="/jobAdvertisements/:id" component={JobAdvertisementDetails} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {authItem[0].loggedIn && authItem[0].user.userType===3 && 
            <Route exact path="/employeeUpdate" component={EmployeeDetailList} /> }

            {authItem[0].loggedIn && authItem[0].user.userType===1 && 
            <Route exact path="/candidateCvUpdate" component={CandidateCvDetail} /> }

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
