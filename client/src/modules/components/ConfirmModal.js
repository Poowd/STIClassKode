import React from 'react'

import { Button } from "./Button"
import { Navigate } from 'react-router-dom'

export class ConfirmModal extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <div className="modal fade" id={ this.props.id } tabIndex="-1" aria-labelledby={ this.props.id } aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body my-3">
                  <div className='w-100 text-center mb-3'>
                    <img src={ this.props.icon } alt='...' width="75" height="75" />
                    <h3 className={'fw-bold ' + this.props.textclass}>{ this.props.title }</h3>
                    <p className='text-secondary fs-6'>{ this.props.subtitle }</p>
                  </div>
                  <div className='w-100 d-flex flex-column justify-content-center align-items-center mt-5 '>
                    <button type="button" className={ "btn text-white fw-bold " + this.props.btnclass } onClick={ this.props.confirm } data-bs-dismiss="modal">Continue</button>
                    <button type="button" className="btn btn-tertiary text-decoration-underline" data-bs-dismiss="modal">No</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}}
