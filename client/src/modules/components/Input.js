import React from 'react';

export class Input extends React.Component {
  render() {
    return (
      <div className="Input w-100 my-2">
        <label className='fs-6'>{this.props.title}<span className='ms-2 text-secondary fst-italic'><small>{this.props.optional}</small></span></label>
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