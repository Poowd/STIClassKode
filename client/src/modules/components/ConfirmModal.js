import React from 'react'

import { Button } from "./Button"
import { Navigate } from 'react-router-dom'

export class ConfirmModal extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <div className="modal fade" id="confirmationModal" tabIndex="-1" aria-labelledby="confirmationModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body my-3">
                  <div className='w-100 text-center mb-3'>
                    <img src={ this.props.confirm_modal_icon } alt='...' width="50" height="50" />
                    <h3 className='mb-0'>{ this.props.confirm_modal_title }</h3>
                    <p>{ this.props.confirm_modal_subtitle }</p>
                  </div>
                  <div className='w-100 d-flex justify-content-center gap-3'>
                    <button type="button" className="btn btn-primary" onClick={ this.props.confirm_modal_confirm } data-bs-dismiss="modal">Yes</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}}
