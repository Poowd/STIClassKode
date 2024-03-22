import React from 'react';
import '../../Style.css'

/*
  Layout Usage:
    File Maintainance Pages
      Programs
      Sections
      Courses
      Rooms
      Coaches
*/

export class Layout2 extends React.Component {
  render() {
    return (
      <main>
        <header className='row' style={{height: "8vh"}}>
          <nav className='px-3' style={{backgroundColor: "orange"}}>
            <ul className='m-0 p-0 d-flex gap-3 align-items-center' style={{height: "8vh"}}>
              <li>Item 1</li>
              <li>Item 2</li>
              <li>Item 3</li>
              <li>Item 4</li>
              <li>Item 5</li>
            </ul>
          </nav>
        </header>
        <main className='row' style={{height: "84vh"}}>
          <section className='col-8 p-3' style={{backgroundColor: "violet"}}>
            Form
          </section>
          <section className='col-4 p-3' style={{backgroundColor: "magenta"}}>
            Output
          </section>
        </main>
      </main>
    )}}