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
        <h1>{ this.props.form_title }</h1>
        <form onSubmit={ this.props.form_submit }>
          { this.props.form_content }
          <div className='d-flex gap-3'>
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
      </>
    );
  }
}
