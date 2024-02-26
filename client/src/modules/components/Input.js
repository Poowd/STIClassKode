import React from 'react';

export class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        {/* <label htmlFor="password"><strong>{ this.props.label }</strong></label> */}
        {/* <input
          className='d-block w-100 mb-3 px-4 py-2 form-control'
          placeholder={ this.props.label }
          type={ this.props.type }
          name={ this.props.name }
          onChange={ this.props.onChange }
        /> */}
        <input 
                  className="d-block w-100 my-3 px-3 py-2"
                  type="text" 
                  placeholder="FirstName" 
                  onChange={ this.props.change } 
                  name="FirstName"
                  />
      </div>
    );
  }
}
