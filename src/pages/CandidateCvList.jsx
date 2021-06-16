import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header, Image, Table, Button, Icon } from "semantic-ui-react";
import CandidateCvService from "../services/candidateCvService";
import CandidateLanguageService from "../services/candidateLanguageService";

export default function CandidateCvList() {

  const [cvs, setCvs] = useState([]);
  
  useEffect(() => {
    let candidateCvService = new CandidateCvService();
    candidateCvService.getAll().then((result) => setCvs(result.data.data));
  }, []);

  return (
    <div>
      <Table celled color={"violet"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Candidate</Table.HeaderCell>
            <Table.HeaderCell>Talents</Table.HeaderCell>
            <Table.HeaderCell>Languages</Table.HeaderCell>
            <Table.HeaderCell>Github</Table.HeaderCell>
            <Table.HeaderCell>Linked.in</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {cvs.map((cv) => (
            <Table.Row key={cv.id}>
              <Table.Cell>
                <Header as="h4" image>
                <Image src={cv.avatarLink} rounded size="huge"/>
                  <Header.Content>
                    {cv.candidate.firstName + " " + cv.candidate.lastName}
                    <Header.Subheader>
                      {cv.candidate.birthYear}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
              {cv.talents.map((talent) => (
                  <p key={talent.talent?.id}>{talent.talent?.talentName}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                {cv.languages.map((lang) => (
                  <p key={lang.language?.id}>{lang.language?.languageName + " Level: " + lang.language?.languageLevel}</p>
                ))}
              </Table.Cell>

              <Table.Cell>
                <a href={cv.githubLink} target={"_blank"}>
                  <Button secondary>
                    <Icon name="github" /> Github
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <a href={cv.linkedinLink} target={"_blank"} rel="noopener noreferrer">
                  <Button color="linkedin">
                    <Icon name="linkedin" /> Linked.in
                  </Button>
                </a>
              </Table.Cell>

              <Table.Cell>
                <Button color="violet" animated as={Link} to={`/candidateCvs/${cv.candidate.id}`}>
                  <Button.Content visible>Show</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}