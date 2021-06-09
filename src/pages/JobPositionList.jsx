import React, { useState, useEffect } from "react";
import { Table, Header, Icon } from "semantic-ui-react";
import JobPositionService from "../services/jobPositionService";

export default function JobPositionList() {
  const [positions, setPositions] = useState([]);

  useEffect(()=>{
    let jobPositionService = new JobPositionService()
    jobPositionService.getJobPositions().then(result=>setPositions(result.data.data))
  }, [])

  return (
    <div>
      <Header as="h2">
        <Icon name="list alternate outline" />
        <Header.Content>Job Positions</Header.Content>
      </Header>
      <Table color="violet" key="violet">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Job Position Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
            {positions.map((position) => (
                <Table.Row key={position.id}>
                    <Table.Cell>{position.positionName}</Table.Cell>
                </Table.Row>
            ))}
      
        </Table.Body>
      </Table>
    </div>
  );
}
