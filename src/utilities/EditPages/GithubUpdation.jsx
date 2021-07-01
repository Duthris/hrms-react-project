import React from 'react'
import CandidateCvService from '../../services/candidateCvService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";
import swal from "sweetalert";

export default function UptadeGithub() {

    let candidateCvService = new CandidateCvService();
    const updateGithubSchema = Yup.object().shape({
        githubLink: Yup.string().required("Github cannot be empty to edit!")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            githubLink:""
        },
        validationSchema: updateGithubSchema,
        onSubmit:(values) =>{
            candidateCvService.updateGithub(values.githubLink,1).then((result) =>{
                if (result.data.success === true) {
                    swal({
                      title: "Succeed!",
                      text: "Github is updated!",
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
                <label><b>Github Address</b></label>
                <Form.Input
                    fluid
                    placeholder="Github Address"
                    type="text"
                    value={formik.values.githubLink}
                    name="githubLink"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.githubLink && formik.touched.githubLink && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.githubLink}
                  </div>
                )
              }
              <Button color="violet" size="large" type="submit">Update</Button>
            </Form>
        </div>
    )
}