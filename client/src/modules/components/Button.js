import React from 'react';

export class Button extends React.Component {
  render() {
    return (
      <div className="Button">
        <button
          className={ "text-center " + this.props.class }
          type={ this.props.type}
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
