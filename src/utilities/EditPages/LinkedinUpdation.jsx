import React from 'react'
import CandidateCvService from '../../services/candidateService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form } from "semantic-ui-react";
import swal from "sweetalert";

export default function UpdateLinkedin() {

    let candidateCvService = new CandidateCvService();
    const updateLinkedinSchema = Yup.object().shape({
        linkedinLink: Yup.string().required("Linked.in cannot be empty to edit!")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const formik = useFormik({
        initialValues:{
            linkedinLink:""
        },
        validationSchema: updateLinkedinSchema,
        onSubmit:(values) =>{
            candidateCvService.updateLinkedin(values.linkedinLink,1).then((result) =>{
                if (result.data.success === true) {
                    swal({
                      title: "Succeed!",
                      text: "Linked.in is updated!",
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
                <label><b>Linked.in Address</b></label>
                <Form.Input
                    fluid
                    placeholder="Linked.in Address"
                    type="text"
                    value={formik.values.githubLink}
                    name="linkedinLink"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {
                formik.errors.linkedinLink && formik.touched.linkedinLink && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.linkedinLink}
                  </div>
                )
              }
              <Button color="violet" size="large" type="submit">Update</Button>
            </Form>
        </div>
    )
}