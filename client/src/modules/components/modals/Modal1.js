import React from 'react'

import { Navigate } from 'react-router-dom'

export class Modal1 extends React.Component {
  render() {
    return (
      <>
        <div className="Modal">
          <div className="modal fade" id={ this.props.id } tabIndex="-1" aria-labelledby={ this.props.id } aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body my-3">
                  <div className='w-100 text-center mb-1'>
                    <img src={ this.props.icon } alt='...' width="75" height="75" />
                    <h3 className={'fw-bold mt-3 ' + this.props.class}>{ this.props.title }</h3>
                    <p className='text-secondary fs-6'>{ this.props.subtitle }</p>
                  </div>
                  <div className='w-100 px-5 text-center'>
                    <div>{this.props.action}</div>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{this.props.neutralresponse}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )}}
