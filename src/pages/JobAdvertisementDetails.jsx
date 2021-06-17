import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import JobAdvertisementService from "../services/jobAdvertisementService";
import { Header, Icon, Table, Button, Grid, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function JobAdvertisementDetails() {
  let { id } = useParams();

  const [job, setJob] = useState({});

  useEffect(() => {
    let jobAdvertisementService = new JobAdvertisementService();
    jobAdvertisementService.getById(id).then((result) => setJob(result.data.data));
  }, [id]);

  return (
    <div>
      <Card fluid color={"violet"}>
        <Card.Content header="Description" />
        <Card.Content>{job.description}</Card.Content>
      </Card>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={6}>
            <Table celled color={"violet"} stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Employer</Table.HeaderCell>
                  <Table.HeaderCell>Infos</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="building" />
                        Company Name
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{job.employer?.companyName}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="mail" />
                        Email
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{job.employer?.email}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="phone" />
                        Phone Number
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{job.employer?.phoneNumber}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="world" />
                        Website
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>{job.employer?.webSite}</Table.Cell>
                </Table.Row>

                <Table.Row textAlign={"left"}>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        <Icon name="list ul" />
                        Details
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      animated
                      color="violet"
                      as={Link}
                      to={`/employers/${job.employer?.id}`}
                    >
                      <Button.Content visible>Detaylara Git</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
          <Grid.Column width={10}>
            <Table celled fixed singleLine color={"violet"}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Job Advertisement Details</Table.HeaderCell>
                  <Table.HeaderCell>Infos</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Job Position</Table.Cell>
                  <Table.Cell>{job.jobPosition?.positionName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>City</Table.Cell>
                  <Table.Cell>{job.city?.cityName}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Working Method</Table.Cell>
                  <Table.Cell>{job.workingMethod?.workingMethod}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Working Time</Table.Cell>
                  <Table.Cell>{job.workingTime?.workingTime}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Minimum Salary</Table.Cell>
                  <Table.Cell>{job.minSalary} ₺</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Maximum Salary</Table.Cell>
                  <Table.Cell>{job.maxSalary} ₺</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Quota</Table.Cell>
                  <Table.Cell>{job.quota}</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.Cell>Deadline</Table.Cell>
                  <Table.Cell>{(
                  (new Date(job.expirationDate).getTime() -
                  new Date(Date.now()).getTime()) /
                86400000 - 1)
                  .toString().split(".", 1)}{" "} days</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
