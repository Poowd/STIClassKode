import React from 'react'
import { Button } from "../Button"

export class Form extends React.Component {
  render() {
    return (
      <>
        <h1>{ this.props.form_title }</h1>
        <form onSubmit={this.props.form_submit}>
          { this.props.form_content }
          <Button
            class={ "btn btn-primary" } 
            text={ "Save" }
            type={ "submit" }
            onClick={ () => {} }
          />
        </form>
      </>
    );
  }
}
