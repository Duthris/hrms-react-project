import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Form,
  Button,
  Input,
  Grid,
  Icon,
  Card,
  Header,
  Table,
  Segment,
  Image,
} from "semantic-ui-react";
import { useEffect } from "react";
import CandidateCvService from "../services/candidateService";
import swal from "sweetalert";
import * as Yup from "yup";
import PersonalInfosUpdation from "../utilities/EditPages/PersonalInfosUpdation";
import Popup from "reactjs-popup";
import GithubUpdation from "../utilities/EditPages/GithubUpdation";
import LinkedinUpdation from "../utilities/EditPages/LinkedinUpdation";
import CoverLetterUpdation from "../utilities/EditPages/CoverLetterUpdation";
import UpdateSchools from "../utilities/EditPages/UpdateSchools";
import { useHistory } from "react-router-dom";
import "reactjs-popup/dist/index.css";

export default function CandidateCvInfo({ cv }) {
  const history = useHistory();

  let candidateCvService = new CandidateCvService();

  const deleteGithub = (cvId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your Github Address!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        candidateCvService.deleteGithub(cvId).then(
          swal("Succeed! Github address has been deleted!", {
            icon: "success",
          }).then(function () {
            history.push("/x");
            history.push("/candidateCvUpdate");
          })
        );
      } else {
        swal(
          "Cancelled",
          "Don't worry the your Github address is still there :)",
          "error"
        );
      }
    });
  };

  const deleteLinkedin = (cvId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your Linked.in Address!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        candidateCvService.deleteLinkedin(cvId).then(
          swal("Succeed! Linked.in address has been deleted!", {
            icon: "success",
          }).then(function () {
            history.push("/x");
            history.push("/candidateCvUpdate");
          })
        );
      } else {
        swal(
          "Cancelled",
          "Don't worry the your Linked.in address is still there :)",
          "error"
        );
      }
    });
  };

  return (
    <div>
      <Card.Group stackable>
        <Card color="violet" fluid>
          <Image centered src={cv.avatarLink} bordered rounded size="small" />
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
                    <Table.Cell width="6">
                      <Header as="h4" image>
                        <Header.Content>First Name</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell width="7">{cv.candidate?.firstName}</Table.Cell>
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
                              <Popup
                            trigger={
                              <button
                                style={{ marginLeft: "1em" }}
                                className="btn btn-success px-3"
                              >
                                {" "}
                                Edit Github
                              </button>
                            }
                            modal
                          >
                            <GithubUpdation />
                          </Popup>

                          <Button
                            style={{ marginLeft: "1em" }}
                            size="small"
                            negative
                            onClick={(e) => deleteGithub(cv.id)}
                          >
                            <Icon name="trash alternate" /> Delete
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
                              <Popup
                            trigger={
                              <button
                                style={{ marginLeft: "1em" }}
                                className="btn btn-success px-3"
                              >
                                {" "}
                                Edit Linked.in
                              </button>
                            }
                            modal
                          >
                            <LinkedinUpdation />
                          </Popup>

                          <Button
                            style={{ marginLeft: "1em"}}
                            size="small"
                            negative
                            onClick={(e) => deleteLinkedin(cv.id)}
                          >
                            <Icon name="trash alternate" /> Delete
                          </Button>
                            </Segment>
                          </a>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
              <Popup
                    trigger={
                      <button
                        style={{ marginLeft: "-1em", marginTop: "1em" }}
                        className="btn btn-success px-3"
                      >
                        {" "}
                        Edit Personal Infos
                      </button>
                    }
                    modal
                  >
                    <PersonalInfosUpdation />
                  </Popup>
            </Card.Description>
          </Card.Content>
          <Card.Content extra></Card.Content>
        </Card>
      </Card.Group>
      <Card color="violet" fluid>
        <Card.Content header="Cover Letter" />
        <Card.Content> <div dangerouslySetInnerHTML={{ __html: cv.coverLetter}} /></Card.Content>
        <Card.Content> <Popup
                    trigger={
                      <button
                        style={{ marginLeft: "-0.5em" }}
                        className="btn btn-success px-3"
                      >
                        {" "}
                        Edit Cover Letter
                      </button>
                    }
                    modal
                  >
                    <CoverLetterUpdation />
                  </Popup></Card.Content>
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
                <Table.Cell>
                  {new Date(school.startingDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  {school.graduationDate == null
                    ? "Continue"
                    : new Date(school.graduationDate).toLocaleDateString()}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <Card.Content>   <Popup
                            trigger={
                              <button
                                style={{ marginLeft: "1em" }}
                                className="btn btn-success px-3"
                              >
                                {" "}
                                Edit Schools
                              </button>
                            }
                            modal
                          >
                            <UpdateSchools />
                          </Popup></Card.Content>
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
                <Table.Cell>
                  {jobExperience.jobPosition?.positionName}
                </Table.Cell>
                <Table.Cell>
                  {new Date(jobExperience.startingDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  {jobExperience.endDate === null
                    ? "Continue"
                    : new Date(jobExperience.endDate).toLocaleDateString()}
                </Table.Cell>
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
              <Table.Row key={language.language?.id}>
                <Table.Cell>{language.language?.languageName}</Table.Cell>
                <Table.Cell>{language.language?.languageLevel}</Table.Cell>
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
              <Table.Row key={talent.talent?.id}>
                <Table.Cell>{talent.talent?.talentName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
