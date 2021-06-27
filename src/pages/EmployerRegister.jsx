import React from "react";
import { Form, Button, Card } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import EmployerService from "../services/employerService";

export default function CandidateRegister() {
  let employerService = new EmployerService();

  const EmployerRegisterSchema = Yup.object().shape({
    companyName: Yup.string()
      .required("Company Name must be filled!")
      .min(1)
      .max(255),
    email: Yup.string().required("E-mail must be filled!").min(1).max(255).email("E-mail must be in ex@ex.com format!"),
    phoneNumber: Yup.string()
      .required("Phone Number be filled!")
      .min(1)
      .max(255).matches(("^(\\+\\d{1,3}( )?)?((\\(\\d{3}\\))|\\d{3})[- .]?\\d{3}[- .]?\\d{4}$" 
      + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?){2}\\d{3}$" 
      + "|^(\\+\\d{1,3}( )?)?(\\d{3}[ ]?)(\\d{2}[ ]?){2}\\d{2}$"), "Invalid phone number format!"),
    webSite: Yup.string()
      .required("Website must be filled!")
      .min(1)
      .max(255).matches(("^(\\/\\/)?(www\\.)?([\\w]+\\.)+[\u200C\u200B\\w]{2,63}\\/?$"),"Website must be in www.ex.com format!"),
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
      companyName: "",
      email: "",
      phoneNumber: "",
      webSite: "",
      password: "",
    },
    validationSchema: EmployerRegisterSchema,
    onSubmit: (values) => {
      employerService
        .register(values)
        .then((result) =>  {
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
            error={Boolean(formik.errors.companyName)}
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="building"
            iconPosition="left"
            placeholder="Company Name"
          />
          {formik.errors.companyName && formik.touched.companyName && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.companyName}
            </div>
          )}
          <Form.Input
            error={Boolean(formik.errors.webSite)}
            fluid
            name="webSite"
            value={formik.values.webSite}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="world"
            iconPosition="left"
            placeholder="Web Site"
          />

          {formik.errors.webSite && formik.touched.webSite && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.webSite}
            </div>
          )}

          <Form.Input
            error={Boolean(formik.errors.phoneNumber)}
            fluid
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            icon="phone"
            iconPosition="left"
            placeholder="Phone Number"
          />

          {formik.errors.phoneNumber && formik.touched.phoneNumber && (
            <div
              style={{ marginBottom: "1rem" }}
              className={"ui pointing red basic label"}
            >
              {formik.errors.phoneNumber}
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
