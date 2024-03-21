import React from 'react';
import '../../App.css'

export class Table extends React.Component {
  render() {
    return (
      <div className="PrimaryTable">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{ this.props.tablename }</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { this.props.data }
          </tbody>
        </table>
        
      </div>
    )
  }
}