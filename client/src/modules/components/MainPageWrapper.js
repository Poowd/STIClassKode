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
                    userlevel={ this.props.userlevel } 
                  />
                </div>
                <div className="col py-4 px-4"> {/* Content Here */}
                  { this.props.routes }
                  </div>
              </div>
            </div>
        </main>
    )}}