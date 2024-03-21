import React from 'react';

export class Input extends React.Component {
  render() {
    return (
      <div className="Input w-100">
        <label className='fs-6'>{this.props.title}</label>
            <input 
              className={ "d-block w-100 px-4 py-2 form-control " + this.props.class }
              type={this.props.type}
              placeholder={this.props.placeholder}
              onChange={this.props.trigger} 
              name={this.props.name}
              id={this.props.name}
              value={this.props.value}
              required={this.props.required}
            />
      </div>
    );
  }
}