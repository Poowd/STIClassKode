import React from 'react';
import { Button } from "../components/Button";

export class Modal extends React.Component {
  render() {
    return (
      <div className="Modal">
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Add User</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body px-5">
                { this.props.modalbody }
              </div>
              <div className="modal-footer">
                <Button
                  class={ "btn btn-secondary" } 
                  text={ "Close" } 
                  disabled={ false }
                  onClick={ () => console.log("dismiss-modal") }
                  databsdismiss={ "modal" }
                />
                <Button
                  class={ "btn btn-primary" } 
                  text={ "Add" } 
                  disabled={ false }
                  onClick={ this.props.action }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
