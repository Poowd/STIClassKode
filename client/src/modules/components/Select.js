import React from 'react';

export class Select extends React.Component {
  render() {
    return (
      <div className="Select w-100 my-2">
        <label className='fs-6'>{this.props.title}</label>
        <select 
          className={"d-block w-100 px-4 py-2 form-select " + this.props.class}
          id={this.props.name}
          name={this.props.name}
          onChange={this.props.trigger}
          required={this.props.required}>
          {this.props.options}
        </select>
      </div>
    );
  }
}


{/* <option defaultValue={this.props.defaultValue}>{this.props.defaultValue}</option>
  {this.props.defaultValue === this.props.value  ? "":<option value={this.props.value} >{this.props.value} </option>} */}