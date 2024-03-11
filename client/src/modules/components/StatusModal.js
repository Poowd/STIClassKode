import React from 'react'

import { Button } from "./Button"
import { Navigate } from 'react-router-dom'

export class StatusModal extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <div className="modal fade" id="statusModal" tabIndex="-1" aria-labelledby="statusModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body my-3">
                  <div className='w-100 text-center mb-3'>
                    <img src={ this.props.icon } alt='...' width="75" height="75" />
                    <h3 className='text-success fw-bold'>{ this.props.title }</h3>
                    <p className='text-secondary fs-6'>{ this.props.subtitle }</p>
                  </div>
                  <div className='w-100 d-flex justify-content-center gap-3 mt-5'>
                    <button type="button" className="btn btn-success text-white fw-bold" data-bs-dismiss="modal">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}}
