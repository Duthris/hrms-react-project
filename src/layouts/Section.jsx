import React from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import JobPositionList from "../pages/JobPositionList";
import CandidateList from "../pages/CandidateList";
import EmployeeList from "../pages/EmployeeList";
import EmployerList from "../pages/EmployerList";
import JobAdvertisementList from "../pages/JobAdvertisementList";

export default function Section() {
  return (
    <div>
      <Grid>
          
        <Grid.Row>
          <GridColumn size={15}>
            <JobAdvertisementList />
          </GridColumn>
        </Grid.Row>

        <Grid.Row>
          <GridColumn size={15}>
            <JobPositionList />
          </GridColumn>
        </Grid.Row>

        <Grid.Row>
          <GridColumn size={15}>
            <CandidateList />
          </GridColumn>
        </Grid.Row>

        <Grid.Row>
          <GridColumn size={15}>
            <EmployerList />
          </GridColumn>
        </Grid.Row>

        <Grid.Row>
          <GridColumn size={15}>
            <EmployeeList/>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </div>
  );
}
