import React from 'react'
import CandidateService from '../../services/candidateService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";
import swal from "sweetalert";

export default function UpdatePersonalInfos() {

    let candidateService = new CandidateService();
    const updatePersonalInfosSchema = Yup.object().shape({
        firstName: Yup.string().min(1,"First name cannot be less than 1 character to edit!").nullable(),
        lastName: Yup.string().min(1,"Last name cannot be less than 1 character to edit!").nullable(),
        birthyear: Yup.string().min(4, "Birth Year must be 4 character to edit!").nullable(),
        email: Yup.string().min(1, "E-mail cannot be less than 1 character to edit!").nullable().email("E-mail must be in ex@ex.com format!"),
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            firstName: null,
            lastName: null,
            birthYear: null,
            email: null,
            id: null,
        },
        validationSchema: updatePersonalInfosSchema,
        onSubmit:(values) =>{
          values.id = 1;
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


              <label label><b>E-mail</b></label>
                <Form.Input
                    fluid
                    placeholder="E-mail"
                    type="text"
                    value={formik.values.email}
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.email && formik.touched.email && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.email}
                  </div>
                )
              } 
              <Button color="violet" size="large" type="submit">Update</Button>
            </Form>
        </div>
    )
}