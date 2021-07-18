import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CandidateJobExperienceService from "../../services/candidateJobExperienceService";
import {
  Card,
  Table,
  Button,
  Icon,
  Form,
  Grid,
  Dropdown,
} from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import JobPositionService from "../../services/jobPositionService";
import { useHistory } from "react-router-dom";
import swal from "sweetalert"
import { useSelector } from "react-redux";

export default function UpdateExperiance() {
  const [jobExperiences, setJobExperiences] = useState([]);

  const history = useHistory();

  const { authItem } = useSelector((state) => state.auth);

  let candidateJobExperienceService = new CandidateJobExperienceService();

  useEffect(() => {
    let candidateJobExperienceService = new CandidateJobExperienceService();
    candidateJobExperienceService.getByCvId(authItem[0].user.id).then((result) => {
      setJobExperiences(result.data.data);
    });
  }, []);

  let jobExperienceAddSchema = Yup.object().shape({});

  const formik = useFormik({
    initialValues: {
      companyName: "",
      positionName: "",
      startingDate: "",
      endDate: "",
      cvId: 1,
      isQuited: false,
    },
    validationSchema: jobExperienceAddSchema,
    onSubmit: (values) => {
      candidateJobExperienceService.add(values).then((result) => {
        if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "Job Experience is added to cv!",
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
      });
    },
  });

  const handleDeleteJobExperience = (jobExperienceId) => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover your Job Experience!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
                candidateJobExperienceService.delete(jobExperienceId).then(
                swal("Succeed! Job Experience has been deleted!", {
                  icon: "success",
                }).then(function () {
                  history.push("/x");
                  history.push("/candidateCvUpdate");
                })
              );
            } else {
              swal(
                "Cancelled",
                "Don't worry the your Job Experience is still there :)",
                "error"
              );
            }
          });
    };

  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let jobPositionService = new JobPositionService();

    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));
  }, []);

  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Card fluid color={"violet"}>
        <Card.Content header="Job Experiences" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Company Name</Table.HeaderCell>
              <Table.HeaderCell>Job Position</Table.HeaderCell>
              <Table.HeaderCell>Starting Date</Table.HeaderCell>
              <Table.HeaderCell>Quited Date</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {jobExperiences?.map((jobExperience) => (
              <Table.Row key={jobExperience.id}>
                <Table.Cell>{jobExperience.companyName}</Table.Cell>
                <Table.Cell>
                  {jobExperience.jobPosition.positionName}
                </Table.Cell>
                <Table.Cell>{jobExperience.startingDate}</Table.Cell>
                <Table.Cell>
                  {jobExperience.endDate ? (
                    jobExperience.endDate
                  ) : (
                    <p>Continue</p>
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    style={{ marginLeft: "1em" }}
                    size="small"
                    negative
                    onClick={() => handleDeleteJobExperience(jobExperience.id)}
                  >
                    <Icon name="trash alternate" /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
      <Card fluid color={"violet"}>
        <Card.Content header="Add Job Experience" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid>
              <Grid.Column width={8}>
                <div>
                  <label>
                    <b>Company Name</b>
                  </label>
                  <Form.Input
                    fluid
                    placeholder="Company Name"
                    type="text"
                    name="companyName"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.companyName && formik.touched.companyName && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.companyName}
                    </div>
                  )}
                </div>
                <label>
                  <b>Starting Date</b>
                </label>
                <Form.Input
                  fluid
                  type="date"
                  name="startingDate"
                  value={formik.values.startingDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.startingDate && formik.touched.startingDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.startingDate}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <div>
                  <label>
                    <b>Job Position</b>
                  </label>
                  <Form.Field style={{ marginBottom: "1rem" }}>
                    <Dropdown
                      clearable
                      item
                      placeholder="Job Position"
                      search
                      selection
                      onChange={(event, data) =>
                        handleChangeSemantic(data.value, "jobPositionId")
                      }
                      onBlur={formik.onBlur}
                      id="jobPositionId"
                      value={formik.values.jobPositionId}
                      options={jobPositionOption}
                    />
                    {formik.errors.jobPositionId &&
                      formik.touched.jobPositionId && (
                        <div className={"ui pointing red basic label"}>
                          {formik.errors.jobPositionId}
                        </div>
                      )}
                  </Form.Field>
                </div>
                <label>
                  <b>Quited Date</b>
                </label>
                <Form.Input
                  fluid
                  type="date"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.endDate && formik.touched.endDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.endDate}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
              <div>
              <label><b>Is Quited?</b></label>
                        <Form.Input
                            fluid
                            type="checkbox"
                            name="isQuited"
                            value={formik.values.isQuited = true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />     
                        {
                formik.errors.isQuited && formik.touched.isQuited && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.isQuited}
                  </div>
                )
              }    
              </div>     
              </Grid.Column>
            </Grid>
            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
