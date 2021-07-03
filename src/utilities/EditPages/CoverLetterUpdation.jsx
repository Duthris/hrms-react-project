import React from 'react'
import CandidateCvService from '../../services/candidateCvService'
import * as Yup from "yup";
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { Button, Form, Label } from "semantic-ui-react";
import swal from "sweetalert";
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';

export default function UpdateCoverLetter() {

    let candidateCvService = new CandidateCvService();
    const updateCoverLetterSchema = Yup.object().shape({
        coverLetter: Yup.string().required("Cover Letter cannot be empty to edit!")
    })

    const {authItem} = useSelector(state => state.auth)

    const history = useHistory();

    const handleRichTextEditorInput = (value) => {
        formik.setFieldValue("coverLetter", value)
      }
    

    const formik = useFormik({
        initialValues:{
            coverLetter:""
        },
        validationSchema: updateCoverLetterSchema,
        onSubmit:(values) =>{
            candidateCvService.updateCoverLetter(values.coverLetter,1).then((result) =>{
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
        <label><b>Cover Letter</b></label>
              <RichTextEditor
            textValue={handleRichTextEditorInput}
          />
                {formik.errors.coverLetter && formik.touched.coverLetter && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.coverLetter}
                  </div>
                )}
              <Button style={{marginTop: "1em"}} color="violet" size="large" type="submit">Update</Button>
              </Form>
        </div>
    )
}