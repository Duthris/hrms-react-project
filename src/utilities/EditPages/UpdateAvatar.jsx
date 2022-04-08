import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import CandidateCvService from "../../services/candidateCvService";
import swal from "sweetalert"

export default class UpdateAvatar extends Component {
  state = {
    multipartFile: null,
  };

  multipartFileSelectHandler = (event) => {
    this.setState({
        multipartFile: event.target.files[0],
    });
  };


  multipartFileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      "multipartFile",
      this.state.multipartFile,
      this.state.multipartFile.name
    );


    let candidateCvService = new CandidateCvService();
    candidateCvService
      .addCvAvatar(console.log(this.state.auth), formData)
      .then((result) => {
        if (result.data.success === true) {
            swal({
              title: "Succeed!",
              text: "Your Cv Avatar is updated!",
              icon: "success",
              button: "Ok",
            }).then(function () {
              window.location.reload()
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
  };

  render() {
    return (
      <div>
        <Card fluid color={"violet"}>
          <Card.Content header="Avatar Upload" />
          <Card.Content style={{}}>
            <input
              style={{ display: "none" }}
              type="file"
              onChange={this.multipartFileSelectHandler}
              ref={(fileInput) => (this.fileInput = fileInput)}
            />
            <button className="ui button" onClick={() => this.fileInput.click()}>Choose File</button>
            <Button color={"green"} onClick={this.multipartFileUploadHandler} disabled={this.state.multipartFile==null}>Upload</Button>

          </Card.Content>
        </Card>
      </div>
    );
  }
}