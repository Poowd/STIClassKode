import React from 'react';

import '../../App.css'

import { Sidebar } from './Sidebar';

export class MainPageWrapper extends React.Component {
  render() {
    return (
      <main>
          <div className="container-fluid">
            <div className="row flex-nowrap">
              <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 border-end">  {/* Sidebar Here */}
                <Sidebar 
                  name={ this.props.name }
                  File_Management={ this.props.File_Management } 
                  />

                </div>
                <div className="col p-0"> {/* Content Here */}
                  { this.props.routes }
                  </div>
              </div>
            </div>
        </main>
    )}}