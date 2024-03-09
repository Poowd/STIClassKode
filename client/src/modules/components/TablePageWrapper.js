import React from 'react';

import { Button } from "./Button";
import { Table } from "./Table";
import { Link } from 'react-router-dom';

export class TablePageWrapper extends React.Component {
  render() {
    return (
      <main className="p-lg-5 p-3 overflow" style={{height:"100vh"}}>
        <header className="d-flex justify-content-between align-items-center">
            <h1>{ this.props.page }</h1>
              <Link to={ this.props.insert }>
                <Button 
                  class={ this.props.class + " my-3" } 
                    text={ this.props.text }
                      onClick={ () => {} }
                  />
              </Link>
          </header>
          <hr />
          <main>
            <input type="text" className="px-3 py-2 mb-3 w-100" placeholder="Search"></input>
              <Table
                tablename={ this.props.tablename }
                  data={ this.props.data }
                    rows={ this.props.datalength }
                />
            </main>
        </main>
    )}}