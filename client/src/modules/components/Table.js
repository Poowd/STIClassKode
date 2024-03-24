import React from 'react';
import '../../App.css'

export class Table extends React.Component {
  render() {
    return (
      <section style={{overflowY: "auto", height: "60vh"}} className='bg-light'>
      <table className="table w-100 shadow-sm table-hover">
          <thead>
              <tr>
                  <th className="col-2 py-2">ID</th>
                  <th className="col-8 py-2">Name</th>
                  <th className="col-2 py-2">Actions</th>
              </tr>
          </thead>
          <tbody>
          {this.props.table_items}
          </tbody>
      </table>
  </section>
    )
  }
}