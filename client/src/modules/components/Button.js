import React from 'react';

/* 

  Use Primary Button as: 
  <PrimaryButton  
    text={ Is a Label } 
    disabled={ true or false }
    onClick={ () => Is a function }
  />

*/

export class Button extends React.Component {
  render() {
    return (
      <div className="Button">
        <button
          className={ this.props.class }
          disabled={ this.props.disabled }
          onClick={ () => this.props.onClick() }
          data-bs-toggle={ this.props.databstoggle } 
          data-bs-target={ this.props.databstarget } 
          data-bs-dismiss={ this.props.databsdismiss }
        >
          { this.props.text }
        </button>
      </div>
    );
  }
}
