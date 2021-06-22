import React, { useEffect, useState } from "react";
import JobAdvertisementService from "../services/jobAdvertisementService";
import { Table, Header, Icon, Button } from "semantic-ui-react";
import swal from 'sweetalert';

export default function JobAdvertisementConfirm() {
  let jobAdvertisementService = new JobAdvertisementService();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    jobAdvertisementService
      .getAllPassiveJobs()
      .then((result) => setJobs(result.data.data));
  });

  const activate = (id) => {
    jobAdvertisementService.activate(id, true).then(swal({
        title: "Succeed!",
        text: "Job Advertisement is confirmed!",
        icon: "success",
        button: "Ok"
      }).then(function(){window.location.reload()}));
};

  const deleteJobAdvertisement = (jobAdvertisement) => {
    jobAdvertisementService
      .delete(jobAdvertisement)
      .then(swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this job advertisement!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
      .then((willDelete) => {
           if (willDelete) { 
               swal("Succeed! Job Advertisement has been deleted!", { icon: "success" })
               .then(function(){window.location.reload()});
        }}));
  };

  return (
    <div>
      <Header as="h2">
        <Icon name="thumbtack" />
        <Header.Content>Job Advertisement Requests</Header.Content>
      </Header>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Job Position</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Minimum Salary</Table.HeaderCell>
            <Table.HeaderCell>Maximum Salary</Table.HeaderCell>
            <Table.HeaderCell>Quota</Table.HeaderCell>
            <Table.HeaderCell>Working Time</Table.HeaderCell>
            <Table.HeaderCell>Working Method</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Approval Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobs.map((job) => (
            <Table.Row key={job.id}>
              <Table.Cell>{job.employer.companyName}</Table.Cell>
              <Table.Cell>{job.jobPosition.positionName}</Table.Cell>
              <Table.Cell>{job.city.cityName}</Table.Cell>
              <Table.Cell>{job.minSalary} ₺</Table.Cell>
              <Table.Cell>{job.maxSalary} ₺</Table.Cell>
              <Table.Cell>{job.quota}</Table.Cell>
              <Table.Cell>{job.workingTime.workingTime}</Table.Cell>
              <Table.Cell>{job.workingMethod.workingMethod}</Table.Cell>
              <Table.Cell>
                {(
                  (new Date(job.expirationDate).getTime() -
                    new Date(Date.now()).getTime()) /
                  86400000
                )
                  .toString()
                  .split(".", 1)}{" "}
                days
              </Table.Cell>
              <Table.Cell>
                {job.activationStatus === true ? "Active" : "Passive"}
              </Table.Cell>
              <Table.Cell>
                <Button fluid size="tiny" positive onClick={(e) => activate(job.id)}><Icon name="check" /> Confirm</Button>
                <Button fluid size="tiny" negative onClick={(e) => deleteJobAdvertisement(job.id)}><Icon name="trash alternate" /> Delete</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
