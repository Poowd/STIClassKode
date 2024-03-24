import React from 'react';
import '../../Style.css'
import { Link } from 'react-router-dom';

/*
  Layout Usage:
    Dashboard Page
*/

export class Layout5 extends React.Component {
  render() {
    return (
      <main className='overflow-auto h-sm-100 pb-4 pb-lg-0' style={{height: "85vh"}}>
        <main className='row m-0'>
          <section className='col-lg-9'>
          <div className="row">
            <div className="col mb-3 mb-sm-0 px-0">
              {this.props.col_2_1}
            </div>
          </div>
          </section>
          <section className='col-lg-3'>
            {this.props.col_2_2}
          </section>
        </main>
        {/* <hr className='mx-3' />
        <main className='row mx-1 px-3'>
          <section className='col'>
            {this.props.col_1_1}
          </section>
        </main> */}
      </main>
    )}}