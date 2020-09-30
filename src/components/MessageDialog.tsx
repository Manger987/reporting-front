import React from "react";
import Alert from "react-bootstrap/Alert";
import { messageStructure } from "./../interfaces/messages";
function MessageDialog() {
  this.state = {
    message: this.this.props.message ? this.props.message : messageStructure,
  };
  return (
    <div>
      {this.state.message.status === 200 && (
        <Alert variant="success">{this.state.message.message}</Alert>
      )}
    </div>
  );
}
export default MessageDialog;
