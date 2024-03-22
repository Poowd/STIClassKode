import React from 'react';
import '../../Style.css'

/*
  Layout Usage:
    Dashboard Page
*/

export class Layout3 extends React.Component {
  render() {
    return (
      <main>
        <header>
          <ul className='p-0 m-0 row'>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "purple"}}>
                Item 1
              </section>
            </li>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "purple"}}>
                Item 2
              </section>
            </li>
            <li className='col-lg-4 p-3'>
              <section className='card' style={{height: "10em", backgroundColor: "purple"}}>
                Item 3
              </section>
            </li>
          </ul>
        </header>
        <hr />
        <main className='row mx-1 px-3'>
          <section className='col-lg-9'>
            col 01
          </section>
          <section className='col-lg-3'>
            col 02
          </section>
        </main>
        <hr />
        <main className='row mx-1 px-3'>
          <section className='col'>
            content
          </section>
        </main>
      </main>
    )}}