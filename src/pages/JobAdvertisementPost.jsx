import React, { useEffect, useState } from "react";
import { Header, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Dropdown, Input, TextArea, Card, Form, Grid } from "semantic-ui-react";
import CityService from "../services/cityService";
import JobPositionService from "../services/jobPositionService";
import WorkingTimeService from "../services/workingTimeService";
import WorkingMethodService from "../services/workingMethodService";
import JobAdvertisementService from "../services/jobAdvertisementService";

export default function JobAdCreate() {
  let jobAdvertisementService = new JobAdvertisementService();
  const JobAdvertAddSchema = Yup.object().shape({
    expirationDate: Yup.date().nullable().required("Expiration Date must be filled!"),
    description: Yup.string().required("Description must be filled!"),
    jobPositionId: Yup.string().required("Job Position must be chosen!"),
    workingTimeId: Yup.string().required("Working time must be chosen!"),
    workingMethodId: Yup.string().required("Working method must be chosen!"),
    quota: Yup.string().required("Quota must be filled!").min(1,"Minimum 1 person can be accepted to job!"),
    cityId: Yup.string().required("City must be chosen!"),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      jobPositionId: "",
      workingTimeId: "",
      workingMethodId: "",
      quota: "",
      cityId: "",
      minSalary: "",
      maxSalary: "",
      expirationDate: "",
      employerId: "",
    },
    validationSchema: JobAdvertAddSchema,
    onSubmit: (values) => {
      values.employerId = 3;
      values.jobPositionId = parseInt(values.jobPositionId);
      values.workingTimeId = parseInt(values.workingTimeId);
      values.workingMethodId = parseInt(values.workingMethodId);
      values.cityId = parseInt(values.cityId);
      values.minSalary = parseInt(values.minSalary);
      values.maxSalary = parseInt(values.maxSalary);
      values.quota = parseInt(values.quota);

      jobAdvertisementService.add(values).then((result) => console.log(result));
    },
  });

  const [workingTimes, setWorkingTimes] = useState([]);
  const [workingMethods, setWorkingMethods] = useState([]);
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    let workingTimeService = new WorkingTimeService();
    let workingMethodService = new WorkingMethodService();
    let cityService = new CityService();
    let jobPositionService = new JobPositionService();

    workingTimeService.getAll().then((result) => setWorkingTimes(result.data.data));
    workingMethodService.getAll().then((result) => setWorkingMethods(result.data.data));
    cityService.getAll().then((result) => setCities(result.data.data));
    jobPositionService.getJobPositions().then((result) => setJobPositions(result.data.data));
  }, []);

  const workingTimeOption = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.workingTime,
    value: workingTime.id,
  }));
  const workingMethodOption = workingMethods.map((workingMethod, index) => ({
    key: index,
    text: workingMethod.workingMethod,
    value: workingMethod.id,
  }));
  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.cityName,
    value: city.id,
  }));
  const jobPositionOption = jobPositions.map((jobPosition, index) => ({
    key: index,
    text: jobPosition.positionName,
    value: jobPosition.id,
  }));

  const handleChangeSemantic = (value, fieldName) => {
    formik.setFieldValue(fieldName, value);
  }

  return (
    <div>
      <Card color="violet" fluid>
      <Card.Content header='Add Job Advertisement' />
      <Card.Content>
      <Form color="violet" onSubmit={formik.handleSubmit}>
        <Form.Field style={{marginBottom: "1rem"}}>
        <Dropdown
          clearable
          item
          placeholder="Job Position"
          search
          selection
          onChange={(event, data) =>
            handleChangeSemantic(data.value, "jobPositionId")
          }
          onBlur={formik.onBlur}
          id="jobPositionId"
          value={formik.values.jobPositionId}
          options={jobPositionOption}
          />
          {formik.errors.jobPositionId && formik.touched.jobPositionId &&(
            <div className={"ui pointing red basic label"}>
              {formik.errors.jobPositionId}
            </div>
          )}
          </Form.Field>
          <Form.Field>
            <Dropdown
              clearable
              item
              placeholder="City"
              search
              selection
              onChange={(event, data) =>
                handleChangeSemantic(data.value, "cityId")
              }
              onBlur={formik.onBlur}
              id="cityId"
              value={formik.values.cityId}
              options={cityOption}
              />
              {formik.errors.cityId && formik.touched.cityId && (
                <div className={"ui pointing red basic label"}>
                {formik.errors.cityId}
              </div>
              )}
          </Form.Field>
          <Form.Field>
          <Dropdown
                  clearable
                  item
                  placeholder="Working Method"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workingMethodId")
                  }
                  onBlur={formik.onBlur}
                  id="workingMethodId"
                  value={formik.values.workingMethodId}
                  options={workingMethodOption}
                />
                {formik.errors.workingMethodId && formik.touched.workingMethodId && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.workingMethodId}
                  </div>
                )}
          </Form.Field>
          <Form.Field>
                <Dropdown
                  clearable
                  item
                  placeholder="Working Time"
                  search
                  selection
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "workingTimeId")
                  }
                  onBlur={formik.onBlur}
                  id="workingTimeId"
                  value={formik.values.workingTimeId}
                  options={workingTimeOption}
                />
                {formik.errors.workingTimeId && formik.touched.workingTimeId && (
                  <div className={"ui pointing red basic label"}>{formik.errors.workingTimeId}</div>
                )}
              </Form.Field>
              <Form.Field>
              <Grid stackable>
              <Grid.Column width={8}>
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Minimum Salary"
                  value={formik.values.minSalary}
                  name="minSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                </Input>
                {formik.errors.minSalary && formik.touched.minSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.minSalary}
                  </div>
                )}
                </Grid.Column>
                <Grid.Column width={8}>
                <Input
                  style={{ width: "100%" }}
                  type="number"
                  placeholder="Maximum Salary"
                  value={formik.values.maxSalary}
                  name="maxSalary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                </Input>
                {formik.errors.maxSalary && formik.touched.maxSalary && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.maxSalary}
                  </div>
                )}
                </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
              <Grid stackable>
              <Grid.Column width={8}>
                <Input
                  style={{ width: "100%" }}
                  id="quota"
                  name="quota"
                  error={Boolean(formik.errors.quota)}
                  onChange={formik.handleChange}
                  value={formik.values.quota}
                  onBlur={formik.handleBlur}
                  type="number"
                  placeholder="Quota"
                />
                {formik.errors.quota && formik.touched.quota && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.quota}
                  </div>
                )}
                </Grid.Column>
                <Grid.Column width={8}>
                <Input
                  style={{ width: "100%" }}
                  type="date"
                  error={Boolean(formik.errors.expirationDate)}
                  onChange={(event, data) =>
                    handleChangeSemantic(data.value, "expirationDate")
                  }
                  value={formik.values.expirationDate}
                  onBlur={formik.handleBlur}
                  name="expirationDate"
                  type="datetime-local"
                  placeholder="Deadline"
                />
                {formik.errors.expirationDate && formik.touched.expirationDate && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.expirationDate}
                  </div>
                )}
                </Grid.Column>
                </Grid>
              </Form.Field>

              <Form.Field>
                <TextArea
                  placeholder="Description"
                  style={{ minHeight: 150 }}
                  error={Boolean(formik.errors.description).toString()}
                  value={formik.values.description}
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className={"ui pointing red basic label"}>
                    {formik.errors.description}
                  </div>
                )}
              </Form.Field>
              <Button
                animated
                content="Add"
                labelPosition="right"
                icon="add"
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