import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import CandidateSchoolService from "../../services/candidateSchoolService";
import { Card, Table, Button, Icon, Form, Grid } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


export default function UpdateSchools() {
  const { authItem } = useSelector((state) => state.auth);

  const [schools, setSchools] = useState([]);

  let candidateSchoolService = new CandidateSchoolService();
  useEffect(() => {    
    let candidateSchoolService = new CandidateSchoolService();
    candidateSchoolService.getByCandidateCvId(1).then((result) => {
      setSchools(result.data.data);
    });
  },[]);

  let schoolAddSchema = Yup.object().shape({
    schoolName: Yup.string().required("School name must be filled!").min(1, "School name cannot be less than 1 character to add"),
    department: Yup.string().required("Department must be filled!").min(1,"Department cannot be less than 1 character to add"),
    graduationDate: Yup.date(),
    startingDate: Yup.date().required("Starting date must be filled!"),
    isGraduated: Yup.boolean().required("Graduation status must be filled to add!"),
  })

  const formik = useFormik({
    initialValues: {
      department:"",
      graduationDate:"",
      isGraduated: false,
      schoolName:"",
      startingDate:"",
    },
    validationSchema: schoolAddSchema,
    onSubmit:(values)=>{
        values.cvId = 1;
      candidateSchoolService.add(values).then((result) => {
        if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "School is added to cv!",
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

  const history = useHistory();

  const handleDeleteSchool = (id) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your Linked.in Address!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          candidateSchoolService.delete(id).then(
            swal("Succeed! School has been deleted!", {
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
  }


  return (
    <div>
      <Card fluid color={"violet"}>
        <Card.Content header="Schools" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>School Name</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>Starting Date</Table.HeaderCell>
              <Table.HeaderCell>Graduation Date</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {schools?.map((school) => (
              <Table.Row key={school.id}>
                <Table.Cell>{school.schoolName}</Table.Cell>
                <Table.Cell>{school.department}</Table.Cell>
                <Table.Cell>{new Date(school.startingDate).toLocaleDateString()}</Table.Cell>
                <Table.Cell>
                  {school.graduationDate == null
                    ? "Continue"
                    : new Date(school.graduationDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                <Button
                            style={{ marginLeft: "1em"}}
                            size="small"
                            negative
                            onClick={() => handleDeleteSchool(school.id)}
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
        <Card.Content header="Add School" />
        <Card.Content>
            <Form onSubmit={formik.handleSubmit}>
                <Grid stackable>
                    <Grid.Column width={8}>
                        <label><b>School Name</b></label>
                        <Form.Input
                            fluid
                            placeholder="School Name"
                            type="text"
                            name="schoolName"
                            value={formik.values.schoolName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                formik.errors.schoolName && formik.touched.schoolName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.schoolName}
                  </div>
                )
              }
                        <label><b>Starting Date</b></label>
                        <Form.Input
                            fluid
                            type="date"
                            name="startingDate"
                            value={formik.values.startingDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />

{
                formik.errors.startingDate && formik.touched.startingDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.startingDate}
                  </div>
                )
              }
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <label><b>Department</b></label>
                    <Form.Input
                            fluid
                            placeholder="Department"
                            type="text"
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                formik.errors.department && formik.touched.department && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.department}
                  </div>
                )
              }
                    <label><b>Graduation Date</b></label>
                        <Form.Input
                            fluid
                            type="date"
                            name="graduationDate"
                            value={formik.values.graduationDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {
                formik.errors.graduationDate && formik.touched.graduationDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.graduationDate}
                  </div>
                )
              }

                    <label><b>Is Graduated?</b></label>
                        <Form.Input
                            fluid
                            type="checkbox"
                            name="isGraduated"
                            value={formik.values.isGraduated}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />     
                        {
                formik.errors.isGraduated && formik.touched.isGraduated && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.isGraduated}
                  </div>
                )
              }         
                    </Grid.Column>
                </Grid>
                <div style={{marginTop:"1em"}}>
                <Button fluid color="green" type="submit">Add</Button>
                </div>
            </Form>
        </Card.Content>
      </Card>
    </div>
  );
}