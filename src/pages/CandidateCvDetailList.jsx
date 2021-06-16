import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandidateCvService from "../services/candidateCvService";
import { Card, Image, Table, Header, Button, Icon } from "semantic-ui-react";

export default function CandidateCvDetailList() {
  let { id } = useParams();

  const [cv, setCv] = useState({});

  useEffect(() => {
    let candidateCvService = new CandidateCvService();
    candidateCvService
      .getByCandidateId(id)
      .then((result) => setCv(result.data.data));
  }, [id]);

  console.log(cv)

  return (
    <div>
      <Card.Group>
        <Card color="violet" fluid>
          <Card.Content>
          <Image  circular avatar rounded size="large" floated="left"/>

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
                            <Button secondary>
                              <Icon name="github" /> Github
                            </Button>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.github}</Table.Cell>
                  </Table.Row>

                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          <a
                            href={cv.linkedinLink}
                            target={"_blank"}
                            rel="noopener noreferrer"
                          >
                            <Button color="linkedin">
                              <Icon name="linkedin" /> Linked.in
                            </Button>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>{cv.linkedinLink}</Table.Cell>
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
        <Card.Content description={cv.description} />
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
                <Table.Cell>{school.startingDate}</Table.Cell>
                <Table.Cell>{school.graduationDate}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card color="violet" fluid>
        <Card.Content header="Languages" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language Name</Table.HeaderCell>
              <Table.HeaderCell>Level 1-5</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.languages?.map((language) => (
              <Table.Row key={language.id}>
                <Table.Cell>{language.languageName}</Table.Cell>
                <Table.Cell>{language.languageLevel}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>

      <Card color="violet" fluid>
        <Card.Content header="Talents" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Talent Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cv.talents?.map((talent) => (
              <Table.Row key={talent.id}>
                <Table.Cell>{talent.name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
