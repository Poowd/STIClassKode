import React from 'react';

export class Input extends React.Component {
  render() {
    return (
      <div className="Input">
        <input 
          className={ this.props.className }
            type={ this.props.type }
              placeholder={ this.props.placeholder }
                onChange={ this.props.onChange } 
                  name={ this.props.name }
          />
      </div>
    );
  }
}
