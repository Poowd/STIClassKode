import React from 'react';

import { Button } from "./Button";
import { Table } from "./Table";
import { ViewModal } from './ViewModal';
import { Modal } from './Modal';

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
                databstoggle={ "modal" }
                databstarget={ "#staticBackdropi" }
                />
            </header>
            <hr />
            <main>
                <input type="text" className="px-3 py-2 mb-3 w-100" placeholder="Search"></input>
                <Table 
                tablename={ this.props.tablename }
                data={
                    this.props.data
                }
                rows={ this.props.datalength }
                />
                <ViewModal 
                title={ this.props.modaltitle }
                body={ this.props.body }
                />
            </main>
        </main>

        <Modal  
        modaltitle={ "Input " + this.props.modaltitle }
        body={ console.log("Hello World")}
        />
      </>
    )
  }
}