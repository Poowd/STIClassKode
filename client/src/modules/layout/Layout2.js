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
        <main className='row' style={{height: "80vh"}}>
          <section className='col-8 p-3'>
            <form onSubmit={this.props.form_submit}>
              {this.props.form_content}
            </form>
          </section>
          <section className='col-4 p-3'>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Details</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">check this out!</h6>
                <div className='py-2 px-3'>
                  {this.props.card_content}
                </div>
              </div>
            </div>
          </section>
        </main>
      </main>
    )}}