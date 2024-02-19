import React from 'react';
import "./PrimaryButton.css";

/* 

  Use Primary Button as: 
  <PrimaryButton  
    text={ Is a Label } 
    disabled={ true or false }
    onClick={ () => Is a function }
  />

*/

export class PrimaryButton extends React.Component {
  render() {
    return (
      <div className="PrimaryButton">
        
        <button
          className='btn primary'
          disabled={ this.props.disabled }
          onClick={ () => this.props.onClick() }
        >
          { this.props.text }
        </button>

      </div>
    );
  }
}
