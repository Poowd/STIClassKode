import React from 'react';

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
            {/* use to map out the data extracted from server */}
            { this.props.data }
            {/* 
              THIS IS SAMPLE STRUCTURE:
              data.map((data, index) => (        
                <tr key={ index }>
                  <td>{ data.Academic_Year }</td>
                    <td className="Actions">
                      <div className="ActionsButton">
                        <PrimaryButton  
                          text={ "View" } 
                          disabled={ false }
                          onClick={ () => console.log("Hello World") }
                        />
                        <PrimaryButton  
                          text={ "View" } 
                          disabled={ false }
                          onClick={ () => console.log("Hello World") }
                        />
                  </td>
                </tr>
              ))
            */}
          </tbody>
        </table>
        <p className="w-100 d-flex justify-content-end fs-6 text">Table contains { this.props.rows } rows.</p>
      </div>
    )
  }
}