import React from 'react';
import '../../Style.css'
import { Link } from 'react-router-dom';

/*
  Layout Usage:
    Dashboard Page
*/

export class Layout4 extends React.Component {
  render() {
    return (
      <main className='overflow-auto h-sm-100 pb-4 pb-lg-0' style={{height: "96vh"}}>
        <header className='px-3 pt-3'>
          <Link to="" className="fs-6 text-secondary">{this.props.parent_page}</Link>
          <h1>{this.props.page_title}</h1>
        </header>
        <hr className='mx-3' />
        <main className='row mx-1 px-3'>
          <section className='col-lg-9'>
            {this.props.col_2_1}
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