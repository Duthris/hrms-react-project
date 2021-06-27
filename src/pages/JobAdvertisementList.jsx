import React, { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { NavLink } from "react-router-dom";
import {
  Table,
  Button,
  Header,
  Icon,
  Pagination,
  Grid,
} from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";
import JobAdvertisementFilter from "../layouts/filters/JobAdvertisementFilter";
import JobAdvertisementFavoriteService from "../services/jobAdvertisementFavoriteService"

export default function JobAdvertisementList() {
  const [jobs, setJobs] = useState([]);

  const [activePage, setActivePage] = useState(1);
  const [filterOption, setFilterOption] = useState({});
  const [pageSize, setPageSize] = useState(2);
  const [totalPageSize, setTotalPageSize] = useState(0);

  const { addToast } = useToasts();

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getAllByFilteredAndPaged(activePage, pageSize, filterOption)
      .then((result) => {
        setJobs(result.data.data);
        setTotalPageSize(parseInt(result.data.message));
      });
  }, [filterOption, activePage]);

  const handleFilterClick = (filterOption) => {
    if (filterOption.cityId.length === 0) filterOption.cityId = null;
    if (filterOption.jobPositionId.length === 0)
      filterOption.jobPositionId = null;
    if (filterOption.workingMethodId.length === 0)
      filterOption.workingMethodId = null;
    if (filterOption.workingTimeId.length === 0)
      filterOption.workingTimeId = null;
    setFilterOption(filterOption);
    setActivePage(1);
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
  };

  let addToFavorite = (candidateId, jobAdvertisementId) => {
    let jobAdvertisementFavoriteService = new JobAdvertisementFavoriteService();
    jobAdvertisementFavoriteService.addToFavorite(candidateId, jobAdvertisementId).then((result) => {
      addToast(result.data.message, {
        appearance: result.data.success ? "success" : "error",
        autoDismiss: true,
        placement: 'bottom-right',
      });
    });
  };

  return (
    <div>
      <Grid style={{marginLeft: "-21rem", marginTop: "1rem"}}>
        <Grid.Column width={4}>
          <JobAdvertisementFilter clickEvent={handleFilterClick} />
          </Grid.Column>

      <Grid.Column width={12}>
      <Header  as="h2">
        <Icon name="bullhorn" />
        <Header.Content>Job Advertisements</Header.Content>
      </Header>

      <Table  color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Quota</Table.HeaderCell>
            <Table.HeaderCell>Working Time</Table.HeaderCell>
            <Table.HeaderCell>Working Method</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs?.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.employer.companyName}</Table.Cell>
              <Table.Cell>{job.jobPosition.positionName}</Table.Cell>
              <Table.Cell>{job.city.cityName}</Table.Cell>
              <Table.Cell>{job.minSalary} ₺</Table.Cell>
              <Table.Cell>{job.maxSalary} ₺</Table.Cell>
              <Table.Cell>{job.quota}</Table.Cell>
              <Table.Cell>{job.workingTime.workingTime}</Table.Cell>
              <Table.Cell>{job.workingMethod.workingMethod}</Table.Cell>
              <Table.Cell>
                {(
                  (new Date(job.expirationDate).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                days
              </Table.Cell>
              <Table.Cell>
                {job.activationStatus === true ? "Active" : "Passive"}
              </Table.Cell>
              <Table.Cell>
                <Button
                  animated
                  as={NavLink}
                  to={`/jobAdvertisements/${job.id}`}
                  color="violet"
                >
                  <Button.Content visible>Show</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
              <Table.Cell>
              <Button 
                onClick={() => addToFavorite(5, job.id)}
                 color="olive"
                 size="medium"
                 >
                  <Icon name="heart"/>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      <Pagination
        firstItem={null}
        lastItem={null}
        activePage={activePage}
        onPageChange={handlePaginationChange}
        totalPages={Math.ceil(totalPageSize / pageSize)}
      />
      </Grid.Column>
      </Grid>
    </div>
  );
}
