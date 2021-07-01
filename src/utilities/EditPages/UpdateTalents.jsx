import React, { useState } from "react";
import { useEffect } from "react";
import CandidateTalentService from "../../services/candidateTalentService";
import TalentService from "../../services/talentService"

import { Card, Table, Button, Icon, Form, Grid, Dropdown } from "semantic-ui-react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

export default function UpdateTalent() {

  const [candidateTalents, setCandidateTalents] = useState([]);

  let candidateTalentService = new CandidateTalentService();

  const history = useHistory();

  useEffect(() => {
    let candidateTalentService = new CandidateTalentService();
    candidateTalentService.getByCandidateCvId(1).then((result) => {
      setCandidateTalents(result.data.data);
    });
  },[]);

  
  let talentAddSchema = Yup.object().shape({
    
  });

  const formik = useFormik({
    initialValues: {

    },
    validationSchema: talentAddSchema,
    onSubmit: (values) => {
      console.log(values)
      candidateTalentService
        .addTalentToCv(1,values)
        .then((result) => {
          if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "Talent is added to cv!",
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

  const [talents, setTalents] = useState([]);

  useEffect(() => {
    let talentService = new TalentService();

    talentService.getAll().then((result) => setTalents(result.data.data));
  }, []);

  const talentNameOption = talents.map((talent, index) => ({
    key: index,
    text: talent.talentName,
    value: talent.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  }

  const handleDeleteTalent = (talentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover your Talent!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        candidateTalentService.delete(talentId).then(
          swal("Succeed! Talent has been deleted!", {
            icon: "success",
          }).then(function () {
            history.push("/x");
            history.push("/candidateCvUpdate");
          })
        );
      } else {
        swal(
          "Cancelled",
          "Don't worry the your Talent is still there :)",
          "error"
        );
      }
    });
  }

  return (
    <div>
      <Card fluid color={"violet"}>
        <Card.Content header="Talents" />
        <Table celled color={"violet"}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Talent</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {candidateTalents.map((candidateTalent) => (
              <Table.Row key={candidateTalent.talent?.id}>
                <Table.Cell width="2">{candidateTalent.talent?.talentName}</Table.Cell>
                <Table.Cell width="1">
                <Button
                            style={{ marginLeft: "1em"}}
                            size="small"
                            negative
                            onClick={() => handleDeleteTalent(candidateTalent.id)}
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
        <Card.Content header="Add Talent" />
        <Card.Content>
          <Form onSubmit={formik.handleSubmit}>
            <Grid stackable>
              <Grid.Column width={12}>
                <label>
                  <b>Choose a Talent to add to your Cv: </b>
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
                  options={talentNameOption}
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