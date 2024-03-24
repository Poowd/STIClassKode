import React from 'react';

export class RadioButton extends React.Component {
  render() {
    return (
      <div className="form-check">
        <input className="form-check-input" type="radio" name={this.props.name} id={this.props.id} value={this.props.value} onChange={this.props.onchange}/>
        <label className="form-check-label" htmlFor={this.props.id}>
          {this.props.text}
        </label>
      </div>
    );
  }
}