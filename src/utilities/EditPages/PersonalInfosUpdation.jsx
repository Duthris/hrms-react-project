import React from 'react'
import CandidateService from '../../services/candidateService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import CandidateCvService from '../../services/candidateCvService';
import { Button, Form, Table, Header, Card, Image } from "semantic-ui-react";
import swal from "sweetalert";
import { useEffect } from 'react';
import { useState } from 'react';

export default function UpdatePersonalInfos() {

  const [cv, setCv] = useState({});

  useEffect(() => {
    let candidateCvService = new CandidateCvService();
    candidateCvService
      .getByCandidateId(authItem[0].user.id)
      .then((result) => setCv(result.data.data));
  }, []);

    let candidateService = new CandidateService();
    const updatePersonalInfosSchema = Yup.object().shape({
        firstName: Yup.string().min(1,"First name cannot be less than 1 character to edit!").nullable(),
        lastName: Yup.string().min(1,"Last name cannot be less than 1 character to edit!").nullable(),
        birthyear: Yup.string().min(4, "Birth Year must be 4 character to edit!").nullable(),
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            firstName: null,
            lastName: null,
            birthYear: null,
            id: null,
        },
        validationSchema: updatePersonalInfosSchema,
        onSubmit:(values) =>{
          values.id = authItem[0].user.id;
            candidateService.update(values).then((result) =>{
                if (result.data.success === true) {
                    swal({
                      title: "Succeed!",
                      text: "Your Personal Infos are updated!",
                      icon: "success",
                      button: "Ok",
                    }).then(function () {
                      history.push("/x");
                      history.push("/candidateCvUpdate");
                    });
                  } else {
                    swal({
                      title: "Updation is unsuccessful!",
                      text: result.data.message,
                      icon: "error",
                      button: "Ok",
                    });
                  }
            })
        }
    })

    return (
        <div>
          <Card color="violet" fluid>
          <Card.Content header="Personal Infos" />
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

                  </Table.Body>
                  </Table>
                  </Card.Description>
                  </Card>

            <Form size="large" onSubmit={formik.handleSubmit}>
                <label><b>First Name</b></label>
                <Form.Input
                    fluid
                    placeholder="First Name"
                    type="text"
                    value={formik.values.firstName}
                    name="firstName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )
              }

                <label><b>Last Name</b></label>
                <Form.Input
                    fluid
                    placeholder="Last Name"
                    type="text"
                    value={formik.values.lastName}
                    name="lastName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )
              }

                <label label><b>Birth Year</b></label>
                <Form.Input
                    fluid
                    placeholder="Birth Year"
                    type="text"
                    value={formik.values.birthYear}
                    name="birthYear"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.birthYear && formik.touched.birthYear && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.birthYear}
                  </div>
                )
              } 

              <Button color="violet" size="large" type="submit">Update</Button>
            </Form>
        </div>
    )
}