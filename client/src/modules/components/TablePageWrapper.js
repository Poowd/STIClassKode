import React from 'react';

import { Button } from "./Button";
import { Table } from "./Table";
import { ViewModal } from './ViewModal';
import { InsertModal } from './InsertModal';

export class TablePageWrapper extends React.Component {
  render() {
    return (
      <main className="p-3 overflow" style={{height:"100vh"}}>
        <header className="d-flex justify-content-between align-items-center">
            <h1>{ this.props.page }</h1>
              <Button 
                class={ this.props.class + " my-3" } 
                  text={ this.props.text }
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
                  customclass={ this.props.viewmodalcustomclass }
                    title={ this.props.viewmodaltitle }
                      body={ this.props.viewmodalbody }
                  />
                  <InsertModal
                    insert_modal_title={ this.props.insert_modal_title }
                      insert_modal_content={ this.props.insert_modal_content }
                        insert_modal_insert={ this.props.insert_modal_insert } 
                    />
            </main>
        </main>
    )}}