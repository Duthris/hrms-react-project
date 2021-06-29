import React, { useEffect, useState } from "react";
import { Formik, useFormik } from "formik";
import {
  Form,
  Label,
  Button,
  FormField,
  Header,
  Icon,
  Card,
  Grid,
  Input,
} from "semantic-ui-react";
import EmployeeService from "../services/employeeService";
import * as Yup from "yup";
import swal from "sweetalert";

export default function EmployeeInfosUpdation() {
  let employeeService = new EmployeeService();

  const EmployeeInfosUpdationSchema = Yup.object().shape({
    email: Yup.string().nullable().min(1, "E-mail cannot be empty to edit!").email("E-mail must be in ex@ex.com format!"),
    password: Yup.string().nullable()
      .min(8, "Password must be at least 8 character!")
      .max(16, "Password cannot be longer than 16 character!"),
    passwordConfirm: Yup.string().nullable()
      .min(8, "Confirm Password must be at least 8 character!")
      .max(16, "Confirm Password cannot be longer than 16 chracater!").oneOf([Yup.ref("password"), null], "Passwords do not match!"),
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
      });
    },
  });

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  };

  return (
    <div>
      <Header style={{ marginTop: "7em", marginLeft: "-2.5em" }} as="h2">
        <Icon name="edit" />
        <Header.Content>Employee Profile Update</Header.Content>
      </Header>

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

            <Form.Field style={{marginLeft: "20rem"}}>
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
                  {formik.errors.passwordConfirm && formik.touched.passwordConfirm && (
                    <div className={"ui pointing red basic label"}>
                      {formik.errors.passwordConfirm}
                    </div>
                  )}
                </Grid.Column>
              </Grid>
            </Form.Field>

            <Button
              animated
              content="Update"
              labelPosition="right"
              icon="check"
              color="violet"
              type="submit"
              style={{ marginLeft: "20px" }}
            />
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}
