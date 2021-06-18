import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmployerService from "../services/employerService";
import { Header, Table, Icon, Card, Button } from "semantic-ui-react";
import JobAdvertisementService from "../services/jobAdvertisementService";
import { Link } from "react-router-dom";

export default function EmployerDetail() {
  let { id } = useParams();

  const [employer, setEmployer] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    let employerService = new EmployerService();
    let jobAdvertisementService = new JobAdvertisementService();
    employerService
      .getById(id)
      .then((result) => setEmployer(result.data.data));
      
    jobAdvertisementService
      .getAllByCompanyId(id)
      .then((result) => setJobs(result.data.data));
  },[id]);

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Employer</Table.HeaderCell>
            <Table.HeaderCell>Infos</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="building" />
                  Company Name
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.companyName}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="world" />
                  Website
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.webSite}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="mail" />
                  E-mail
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.email}</Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Header as="h4">
                <Header.Content>
                  <Icon name="phone" />
                  Phone Number
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>{employer.phoneNumber}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <Card fluid>
        <Card.Content header="Active Job Advertisements of the Company" />
        <Card.Content>
          <Table color={"violet"}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Job Position</Table.HeaderCell>
                <Table.HeaderCell>City</Table.HeaderCell>
                <Table.HeaderCell>Quota</Table.HeaderCell>
                <Table.HeaderCell>Working Method</Table.HeaderCell>
                <Table.HeaderCell>Working Time</Table.HeaderCell>
                <Table.HeaderCell>Deadline</Table.HeaderCell>
                <Table.HeaderCell>Details</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {jobs.map((job) => (
                <Table.Row key={job.id}>
                  <Table.Cell>{job.jobPosition?.positionName}</Table.Cell>
                  <Table.Cell>{job.city?.cityName}</Table.Cell>
                  <Table.Cell>{job.quota}</Table.Cell>
                  <Table.Cell>{job.workingMethod?.workingMethod}</Table.Cell>
                  <Table.Cell>{job.workingTime?.workingTime}</Table.Cell>
                  <Table.Cell>{(
                  (new Date(job.expirationDate).getTime() -
                  new Date(Date.now()).getTime()) /
                86400000)
                  .toString().split(".", 1)}{" "} days</Table.Cell>
                  <Table.Cell>
                    <Button color="violet" animated as={Link} to={`/jobAdvertisements/${job.id}`}>
                      <Button.Content visible>Detayları Gör</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card.Content>
        <Card.Content extra>
          <Icon name="list" />
           Total of {jobs?.length} Job Advertisements
        </Card.Content>
      </Card>
    </div>
  );
}