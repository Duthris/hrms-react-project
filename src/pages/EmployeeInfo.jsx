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
} from "semantic-ui-react";
import { useEffect } from "react";
import EmployeeService from "../services/employeeService";
import swal from "sweetalert";
import * as Yup from "yup";

export default function EmployeeInfo({ employee }) {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditClick = () => {
    setIsEdit(!isEdit);
  };

  useEffect(() => {}, [isEdit]);

  let employeeService = new EmployeeService();

  const EmployeeInfosUpdationSchema = Yup.object().shape({
    email: Yup.string()
      .nullable()
      .min(1, "E-mail cannot be empty to edit!")
      .email("E-mail must be in ex@ex.com format!"),
    password: Yup.string()
      .nullable()
      .min(8, "Password must be at least 8 character!")
      .max(16, "Password cannot be longer than 16 character!"),
    passwordConfirm: Yup.string()
      .min(8, "Confirm Password must be at least 8 character!")
      .max(16, "Confirm Password cannot be longer than 16 chracater!")
      .oneOf([Yup.ref("password"), null], "Passwords do not match!"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      id: null,
    },
    validationSchema: EmployeeInfosUpdationSchema,
    onSubmit: (values) => {
      values.id = 1;

      employeeService.update(values).then((result) => {
        console.log({ employee });
        if (result.data.success === true) {
          swal({
            title: "Succeed!",
            text: "Employee is updated!",
            icon: "success",
            button: "Ok",
          }).then(function () {
            window.location.reload();
          });
        } else {
          swal({
            title: "Updation is unsuccessful!",
            text: result.data.message,
            icon: "error",
            button: "Ok",
          });
        }
      }, handleEditClick());
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
       <Header style={{ marginTop: "3em", marginLeft: "-2.5em" }} as="h2">
        <Icon name="edit" />
        <Header.Content>Employee Profile Update</Header.Content>
      </Header>

      {isEdit ? (
        <Card style={{ marginLeft: "-5em"}} color="violet" fluid>
        <Card.Content>
        <Form color="violet" onSubmit={formik.handleSubmit}>
          <Form.Field>
            <Grid stackable>
              <Grid.Column width={8}>
                <Input
                  iconPosition="left"
                  style={{ width: "100%" }}
                  placeholder="First Name"
                  value={formik.values.firstName}
                  name="firstName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <input />
                  <Icon name="user" />
                </Input>
                {formik.errors.firstName && formik.touched.firstName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.firstName}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <Input
                  iconPosition="left"
                  style={{ width: "100%" }}
                  placeholder="Last Name"
                  value={formik.values.lastName}
                  name="lastName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <input />
                  <Icon name="user" />
                </Input>
                {formik.errors.lastName && formik.touched.lastName && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.lastName}
                  </div>
                )}
              </Grid.Column>
            </Grid>
          </Form.Field>

          <Form.Field>
            <Grid stackable>
              <Grid.Column width={8}>
                <Input
                  error={Boolean(formik.errors.password)}
                  fluid
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                />

                {formik.errors.password && formik.touched.password && (
                  <div
                    style={{ marginBottom: "1rem" }}
                    className={"ui pointing red basic label"}
                  >
                    {formik.errors.password}
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width={8}>
                <Input
                  iconPosition="left"
                  style={{ width: "100%" }}
                  id="passwordConfirm"
                  error={Boolean(formik.errors.passwordConfirm)}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "passwordConfirm")
                  }
                  onBlur={formik.handleBlur}
                  name="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                >
                  <input />
                  <Icon name="lock" />
                </Input>
                {formik.errors.passwordConfirm &&
                  formik.touched.passwordConfirm && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.passwordConfirm}
                    </div>
                  )}
              </Grid.Column>
            </Grid>
          </Form.Field>

          <Form.Field style={{ marginLeft: "20rem" }}>
            <Grid stackable>
              <Grid.Column width={8}>
                <Input
                  error={Boolean(formik.errors.email)}
                  fluid
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  icon="at"
                  iconPosition="left"
                  placeholder="E-mail"
                />
                {formik.errors.email && formik.touched.email && (
                  <div
                    style={{ marginBottom: "1rem" }}
                    className={"ui pointing red basic label"}
                  >
                    {formik.errors.email}
                  </div>
                )}
              </Grid.Column>
            </Grid>
          </Form.Field>
          <Button.Group>
        <Button animated positive size="medium">
          <Button.Content size="medium" visible>
            Update
          </Button.Content>
          <Button.Content size="medium" hidden>
            <Icon name="check" />
          </Button.Content>
        </Button>
        <div className="or" data-text="or"></div>
        <Button animated primary negative onClick={() => handleEditClick()} size="medium">
          {" "}
          <Button.Content size="medium" visible>
            Cancle
          </Button.Content>
          <Button.Content size="medium" hidden>
            <Icon name="delete" />
          </Button.Content>
        </Button>
      </Button.Group>
        </Form>
        </Card.Content>
        </Card>
      ) : (
        
        <div>
            <Card style={{ marginLeft: "-5em"}} color="violet" fluid>
              <Card.Content>
                <img
                  src="https://media2.giphy.com/media/jmNwcTZbMnz0Grdbb9/giphy.gif?cid=790b76113fb5d33797589c0d7a25ec5e3c73f6aba8eb8223&rid=giphy.gif&ct=g"
                  alt="pp"
                  className="rounded-circle w-25 img-fluid img-thumbnail"
                />
              </Card.Content>

              <Card.Content>
                <Card.Description>
                  <Table celled color={"violet"}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Employee</Table.HeaderCell>
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
                        <Table.Cell>{employee.firstName}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Header.Content>Last Name</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{employee.lastName}</Table.Cell>
                      </Table.Row>

                      <Table.Row>
                        <Table.Cell>
                          <Header as="h4" image>
                            <Header.Content>E-mail</Header.Content>
                          </Header>
                        </Table.Cell>
                        <Table.Cell>{employee.email}</Table.Cell>
                      </Table.Row>
                    </Table.Body>
                  </Table>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button
                  style={{ marginLeft: "-1em" }}
                  color="violet"
                  animated
                  onClick={() => (isEdit ? null : handleEditClick())}
                >
                  <Button.Content visible>Edit</Button.Content>
                  <Button.Content hidden>
                    <Icon name="arrow right" />
                  </Button.Content>
                </Button>
              </Card.Content>
            </Card>
          </div>
      )}
    </div>
  );
}
