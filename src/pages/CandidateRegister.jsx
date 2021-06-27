import React from "react";
import { Form, Button, Card } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import CandidateService from "../services/candidateService";

export default function CandidateRegister() {
  let candidateService = new CandidateService();

  const CandidateRegisterSchema = Yup.object().shape({
    birthYear: Yup.string()
      .required("Birth Year must be filled!")
      .min(4, "Birth Year must be 4 character!")
      .max(4, "Birth Year must be 4 character!"),
    email: Yup.string().required("E-mail must be filled!").min(1).max(255).email("E-mail must be in ex@ex.com format!"),
    firstName: Yup.string()
      .required("First Name must be filled!")
      .min(1)
      .max(255),
    lastName: Yup.string()
      .required("Last Name must be filled!")
      .min(1)
      .max(255),
    nationalityId: Yup.string()
      .required("Nationality ID must be filled!")
      .min(11, "Nationality ID must be 11 character")
      .max(11, "Nationality ID must be 11 character"),
    password: Yup.string()
      .required("Password must be filled!")
      .min(8, "Password must be at least 8 character!")
      .max(16, "Password cannot be longer than 16 character!"),
    passwordAgain: Yup.string()
      .required("Confirm Password must be filled!")
      .min(8, "Confirm Password must be at least 8 character!")
      .max(16, "Confirm Password cannot be longer than 16 chracater!").oneOf([Yup.ref("password"), null], "Passwords do not match!"),
  });

  const formik = useFormik({
    initialValues: {
      birthYear: "",
      email: "",
      firstName: "",
      lastName: "",
      nationalityId: "",
      password: "",
    },
    validationSchema: CandidateRegisterSchema,
    onSubmit: (values) => {
      candidateService
        .register(values)
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "Successfully Registered! Please check your e-mail to verify your account!",
              icon: "success",
              button: "Ok",
            }).then(function () {
              window.location.reload();
            })
          }
          else {
            swal({
              title: "Registration is Unsuccessful!",
              text: result.data.message,
              icon: "error",
              button: "Ok",
            })
          }
        }
        )},
  });

  return (
    <div>
      <Card color="violet" fluid>
        <Form color="violet" onSubmit={formik.handleSubmit}>
          <Form.Input
            error={Boolean(formik.errors.firstName)}
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="user"
            iconPosition="left"
            placeholder="First Name"
          />
          {formik.errors.firstName && formik.touched.firstName && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.firstName}
            </div>
          )}
          <Form.Input
            error={Boolean(formik.errors.lastName)}
            fluid
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="user"
            iconPosition="left"
            placeholder="Last Name"
          />

          {formik.errors.lastName && formik.touched.lastName && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.lastName}
            </div>
          )}

          <Form.Input
            error={Boolean(formik.errors.nationalityId)}
            fluid
            name="nationalityId"
            value={formik.values.nationalityId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="id card"
            iconPosition="left"
            placeholder="Nationality ID"
          />

          {formik.errors.nationalityId && formik.touched.nationalityId && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.nationalityId}
            </div>
          )}
          <Form.Input
            error={Boolean(formik.errors.birthYear)}
            fluid
            name="birthYear"
            value={formik.values.birthYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="birthday"
            iconPosition="left"
            placeholder="Birth Year"
          />

          {formik.errors.birthYear && formik.touched.birthYear && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.birthYear}
            </div>
          )}
          <Form.Input
            error={Boolean(formik.errors.email)}
            fluid
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="mail"
            iconPosition="left"
            placeholder="E-mail"
            type="email"
          />

          {formik.errors.email && formik.touched.email && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.email}
            </div>
          )}
          <Form.Input
            error={Boolean(formik.errors.password)}
            fluid
            name="password"
            value={formik.values.password}
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
          <Form.Input
            error={Boolean(formik.errors.passwordAgain)}
            fluid
            name="passwordAgain"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
          />

          {formik.errors.passwordAgain && formik.touched.passwordAgain && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.passwordAgain}
            </div>
          )}
          <br />
          <Button animated type="submit" color="violet" fluid size="large">
            Register
          </Button>
        </Form>
      </Card>
    </div>
  );
}
