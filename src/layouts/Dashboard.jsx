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
import EmployeeInfosUpdation from "../pages/EmployeeInfosUpdation";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <Grid>
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
            <Route exact path="/jobAdvertisementPost" component={JobAdvertisementPost} />
            <Route exact path="/jobAdvertisementConfirm" component={JobAdvertisementConfirm} />
            <Route exact path="/jobAdvertisements/:id" component={JobAdvertisementDetails} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/employeeUpdate" component={EmployeeInfosUpdation} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
