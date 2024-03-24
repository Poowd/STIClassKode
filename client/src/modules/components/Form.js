import React from 'react'
import { Button } from "./Button"
import logout from '../../assets/icons/switch.png'
import { ConfirmModal } from './ConfirmModal';
import { StatusModal } from './StatusModal';
import success from '../../assets/icons/check.png'

export class Form extends React.Component {
  render() {
    return (
      <>
        <div>
          <div className="row align-items-start">
            <div className="col-12 col-lg-8">
              <form onSubmit={this.props.form_submit}>
                {this.props.form_content}
              </form>
            </div>
            <div className="col col-lg-4 my-lg-0 my-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Details</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">check this out!</h6>
                  <div className='py-2 px-3'>
                    {this.props.card_content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
