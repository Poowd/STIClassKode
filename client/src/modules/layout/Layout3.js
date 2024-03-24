import React from 'react';
import '../../Style.css'

/*
  Layout Usage:
    Dashboard Page
*/

export class Layout3 extends React.Component {
  render() {
    return (
      <main className='overflow-auto h-sm-100 pb-4 pb-lg-0' style={{height: "96vh"}}>
        <header>
          <ul className='p-0 m-0 row'>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "#0c8ce9"}}>
                {this.props.item_1}
              </section>
            </li>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "#0c8ce9"}}>
                {this.props.item_2}
              </section>
            </li>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "#0c8ce9"}}>
                {this.props.item_3}
              </section>
            </li>
          </ul>
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