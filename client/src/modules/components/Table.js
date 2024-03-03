import React from 'react';
import '../../App.css'

/* 

  Use Primary Table as: 

*/

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
        <p className="w-100 d-flex justify-content-end fs-6 text">Table contains { this.props.rows } rows.</p>
      </div>
    )
  }
}