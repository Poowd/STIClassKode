import React from 'react';

import { Button } from "./Button";
import { Table } from "./Table";
import { ViewModal } from './ViewModal';
import { FormModal } from './FormModal';

export class TablePageWrapper extends React.Component {
  render() {
    return (
        <>
          <main className="p-3">
            <header className="d-flex justify-content-between align-items-center">
                <h1>{ this.props.page }</h1>
                <Button 
                  class={ this.props.class + " my-3" } 
                    text={ this.props.text } 
                      disabled={ false }
                        onClick={ () => console.log("open-modal") }
                          databstoggle={ this.props.databstoggle }
                            databstarget={ this.props.databstarget }
                  />
            </header>
            <hr />
            <main>
                <input type="text" className="px-3 py-2 mb-3 w-100" placeholder="Search"></input>
                <Table 
                  tablename={ this.props.tablename }
                    data={ this.props.data }
                      rows={ this.props.datalength }
                  />
                <ViewModal 
                  title={ this.props.viewmodaltitle }
                    body={ this.props.viewmodalbody }
                  />
            </main>
        </main>

        <FormModal  
          modaltitle={ this.props.formmodaltitle }
          modalbody={ this.props.formmodalbody }
        />
      </>
    )
  }
}