import React from "react";
import { useSelector } from "react-redux";
import EmployerService from "../../services/employerService";
import {
  Card,
  Grid,
  Form,
  Button,
  Message,
} from "semantic-ui-react";
import { useState } from "react";
import { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function UpdateEmployer() {


    let employerService = new EmployerService();

    const { authItem } = useSelector((state) => state.auth);

    const [employer, setEmployer] = useState([]);

    useEffect(() => {
        let employerService = new EmployerService();
        employerService.getById(authItem[0].user.id).then((result) => {
          setEmployer(result.data.data);
        });
      }, [authItem]);
    
      const employerUpdateShema= Yup.object().shape({
        companyName: Yup.string().required("Must be filled!").min(2,"Minimum of 2 character is required!"),
        email: Yup.string().required("Must be filled!").email("Inavlid E-mail format"),
        phoneNumber: Yup.string().required("Must be filled!").min(11,"Phone number must be 11 character").max(11,"Phone number must be 11 character"),
        webSite: Yup.string().required("Must be filled!")
      })
    
      const formik = useFormik({
          initialValues:{
            companyName:"",
            email:"",
            phoneNumber:"",
            webSite:"",
          },
          validationSchema:employerUpdateShema,
          onSubmit:(values) => {
            formik.values.employerId=authItem[0].user.id;
              employerService.update(values).then((result) => {
                  alert(result.data.message)
              })
          }
      })

    return (
        <div>
            {console.log(employer)}
      {employer.waitingUpdate === true && (
        <Message positive>
          <Message.Header>Update request is still on progress</Message.Header>
          <p>
            You already have a update request. You cannot make more update request until your last request has considered.
          </p>
        </Message>
      )}
      {employer.waitingUpdate === false && (
          <Card fluid color={"black"}>
              <Card.Content header={"Update Company Infos"}/>
              <Card.Content>
                  <Form onSubmit={formik.handleSubmit}>
                    <Grid>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Company Name</b></label>
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
                            <label><b>E-mail</b></label>
                            <Form.Input
                                fluid
                                placeholder="E-mail"
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.email && formik.touched.email && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.email}
                                </div>
                            )}
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <div>
                            <label><b>Website</b></label>
                            <Form.Input
                                fluid
                                placeholder="Website"
                                type="text"
                                name="webSite"
                                value={formik.values.webSite}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.webSite && formik.touched.webSite && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.webSite}
                                </div>
                            )}
                            </div>
                            <label><b>Phone Number</b></label>
                            <Form.Input
                                fluid
                                placeholder="Phone Number"
                                type="text"
                                name="phoneNumber"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                                <div className={"ui pointing red basic label"}>
                                {formik.errors.phoneNumber}
                                </div>
                            )}
                        </Grid.Column>
                    </Grid>
                    <div style={{marginTop:"1em"}}>
                    <Button fluid color="green" type="submit">Update</Button>
                    </div>
                  </Form>
              </Card.Content>
          </Card>
      )}
    </div>
    )
}
