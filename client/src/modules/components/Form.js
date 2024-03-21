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
              <form onSubmit={ this.props.form_submit }>
                { this.props.form_content }
                <div className='d-flex gap-1'>
                <Button
                  class={"btn btn-secondary"} 
                  text={"Cancel"} 
                  disabled={false}
                  onClick={this.props.navigate}
                />
                <Button
                    class={ "btn btn-primary" } 
                    type={ "submit" }
                      text={ "Save" } 
                        disabled={ false }
                          onClick={ () => {} }
                            databstoggle={ this.props.status === true ? "modal" : "" } //"modal" 
                              databstarget={ this.props.status === true ? "#statusModal" : "" } //"#statusModal"
                    />
                </div>
                    <StatusModal 
                      icon={ success }
                        title={ "SUCCESS" }
                          subtitle={ this.props.form_status }
                            confirm={ () => {} }
                      />
              </form>
            </div>
            <div className="col col-lg-4 my-lg-0 my-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Details</h5>
                  <h6 className="card-subtitle mb-2 text-body-secondary">check this out!</h6>
                  <div className='py-3 px-5'>
                    {this.props.cardContent}
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
