import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandidateCvService from "../services/candidateCvService";
import { Card, Image, Table, Header, Button, Icon, Segment } from "semantic-ui-react";

export default function CandidateCvDetailList() {
  let { id } = useParams();

  const [cv, setCv] = useState({});

  useEffect(() => {
    let candidateCvService = new CandidateCvService();
    candidateCvService
      .getById(id)
      .then((result) => setCv(result.data.data));
  }, [id]);

  console.log(cv)

  return (
    <div>
      <Card.Group>
        <Card color="violet" fluid>
        <Image centered src={cv.avatarLink} bordered rounded size="small"/>
          <Card.Content>
            <Card.Header>
              {cv.candidate?.firstName + " " + cv.candidate?.lastName}
            </Card.Header>
            <Card.Meta>
              <strong>{cv.description}</strong>
            </Card.Meta>
            <Card.Description>
              <Table celled color={"violet"}>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Candidate</Table.HeaderCell>
                    <Table.HeaderCell>Infos</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>First Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.firstName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Last Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.lastName}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>Birth Year</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.birthYear}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>E-mail</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.candidate?.email}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.githubLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Segment basic>
                            <Button secondary>
                              <Icon name="github" /> Github
                            </Button>
                            </Segment>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                    <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedinLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Segment basic>
                            <Button color="linkedin">
                              <Icon name="linkedin" /> Linked.in
                            </Button>
                            </Segment>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card color="violet" fluid>
        <Card.Content header="Cover Letter" />
        <Card.Content> <div dangerouslySetInnerHTML={{ __html: cv.coverLetter}} /></Card.Content>
      </Card>

      <Card color="violet" fluid>
        <Card.Content header="Schools" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>School Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Starting Date</Table.HeaderCell>
              <Table.HeaderCell>Graduation Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{new Date(school.startingDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{school.graduationDate == null ? "Continue" : 
                new Date(school.graduationDate).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      
      <Card color="violet" fluid>
        <Card.Content header="Job Experiences" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>Job Position</Table.HeaderCell>
              <Table.HeaderCell>Starting Date</Table.HeaderCell>
              <Table.HeaderCell>Quited Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.jobExperiences?.map((jobExperience) => (
              <Table.Row key={jobExperience.id}>
                <Table.Cell>{jobExperience.companyName}</Table.Cell>
                <Table.Cell>{jobExperience.jobPosition?.positionName}</Table.Cell>
                <Table.Cell>{new Date(jobExperience.startingDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>{jobExperience.endDate === null ? "Continue" : 
                new Date(jobExperience.endDate).toLocaleDateString()}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
