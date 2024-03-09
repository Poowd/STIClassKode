import React from 'react'
import { Button } from "../Button"

export class Form extends React.Component {
  render() {
    return (
      <>
        <h1>{ this.props.form_title }</h1>
        <form>
          { this.props.form_content }
          <Button
            class={ "btn btn-primary" } 
              text={ "Save" }
              type={ "submit" }
                onClick={ this.props.form_submit }
          />
          <p id='err' className='input-error'></p>
        </form>
      </>
    );
  }
}
