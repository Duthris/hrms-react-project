import React, { useState } from "react";
import { useEffect } from "react";
import CandidateLanguageService from "../../services/candidateLanguageService";
import LanguageService from "../../services/languageService"

import { Card, Table, Button, Icon, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function UpdateLanguage() {

  const [candidateLanguages, setCandidateLanguages] = useState([]);

  let candidateLanguageService = new CandidateLanguageService();

  const history = useHistory();

  useEffect(() => {
    let candidateLanguageService = new CandidateLanguageService();
    candidateLanguageService.getByCandidateCvId(1).then((result) => {
      setCandidateLanguages(result.data.data);
    });
  },[]);

  
  let languageAddSchema = Yup.object().shape({
    
  });

  const formik = useFormik({
    initialValues: {
      id: "",
    },
    validationSchema: languageAddSchema,
    onSubmit: (values) => {
      values.id = parseInt(values.id);
      candidateLanguageService
        .addLanguageToCv(values,1)
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "Language is added to cv!",
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
    },
  });

  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    let languageService = new LanguageService();

    languageService.getAll().then((result) => setLanguages(result.data.data));
  }, []);

  const languageNameOption = languages.map((language, index) => ({
    key: index,
    text: language.languageName + " : " + language.languageLevel,
    value: language.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  }

  const handleDeleteLanguage = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your Language info!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        candidateLanguageService.deleteFromCv(id).then(
          swal("Succeed! Language has been deleted!", {
            icon: "success",
          }).then(function () {
            history.push("/x");
            history.push("/candidateCvUpdate");
          })
        );
      } else {
        swal(
          "Cancelled",
          "Don't worry the your Language info is still there :)",
          "error"
        );
      }
    });
  }

  return (
    <div>
      <Card fluid color={"violet"}>
        <Card.Content header="Languages" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateLanguages.map((candidateLanguage) => (
              <Table.Row key={candidateLanguage.language?.id}>
                <Table.Cell width="2">{candidateLanguage.language?.languageName}</Table.Cell>
                <Table.Cell width="1">{candidateLanguage.language?.languageLevel}</Table.Cell>
                <Table.Cell width="1">
                <Button
                            style={{ marginLeft: "1em"}}
                            size="small"
                            negative
                            onClick={() => handleDeleteLanguage(candidateLanguage.id)}
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
        <Card.Content header="Add Language" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={12}>
                <label>
                  <b>Choose a Language and Level to add to your Cv: </b>
                </label>
                <Dropdown
                style={{marginLeft: "2em"}}
                  clearable
                  search
                  selection
                  name="id"
                  value={formik.values.id}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "id")
                  }
                  onBlur={formik.handleBlur}
                  id="id"
                  options={languageNameOption}
                />
                {formik.errors.id && formik.touched.id && (
                <div className={"ui pointing red basic label"}>
                {formik.errors.id}
              </div>
              )}
              </Grid.Column>
      
            </Grid>
            <div style={{ marginTop: "1em" }}>
              <Button fluid color="green" type="submit">
                Add
              </Button>
            </div>
          </Form>
        </Card.Content>
      </Card>
    </div>
  );
}