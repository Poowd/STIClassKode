import React from 'react'

import { Button } from "./Button"

export class InsertModal extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <div className="modal fade" id="insertModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="insertModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="insertModal">{ this.props.insert_modal_title }</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body px-5 m-0 py-3">
                  { this.props.insert_modal_content }
                </div>
                <div className="modal-footer">
                  <Button
                    class={ "btn btn-secondary" } 
                      text={ "Close" } 
                        onClick={ () => console.log("dismiss-modal") }
                          databsdismiss={ "modal" }
                  />
                  <Button
                    class={ "btn btn-primary" } 
                      text={ "Add" } 
                        onClick={ this.props.insert_modal_insert }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}}
