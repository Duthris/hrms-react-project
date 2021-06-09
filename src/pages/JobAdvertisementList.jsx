import React, { useState, useEffect } from "react";
import { Table, Button, Header, Icon } from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdvertisementList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService
      .getJobAdvertisements()
      .then((result) => setJobs(result.data.data));
  }, []);

  return (
    <div>
      <Header as="h2">
        <Icon name="bullhorn" />
        <Header.Content>Job Advertisements</Header.Content>
      </Header>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Quota</Table.HeaderCell>
            <Table.HeaderCell>Starting Date</Table.HeaderCell>
            <Table.HeaderCell>Expiration Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Detail</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.employer.companyName}</Table.Cell>
              <Table.Cell>{job.jobPosition.positionName}</Table.Cell>
              <Table.Cell>{job.city.cityName}</Table.Cell>
              <Table.Cell>{job.minSalary}</Table.Cell>
              <Table.Cell>{job.maxSalary}</Table.Cell>
              <Table.Cell>{job.quota}</Table.Cell>
              <Table.Cell>{job.createdDate}</Table.Cell>
              <Table.Cell>{job.expirationDate}</Table.Cell>
              <Table.Cell>{job.activationStatus.toString()}</Table.Cell>
              <Table.Cell>
                <Button color="violet">Show</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
