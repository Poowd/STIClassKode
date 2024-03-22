import React from 'react';

export class Layout1 extends React.Component {
  render() {
    return (
      <main>
        <main className='row m-0 h-100' style={{height: "8vh"}}>
          <section className='col d-flex align-items-center' style={{backgroundColor: "#333333"}}>
            {this.props.header}
          </section>
        </main>
        <main className='row m-0' style={{height: "92vh"}}>
          <section className='col-lg-1 col-2' style={{backgroundColor: "#4d4d4d"}}>
            {this.props.sidebar}
          </section>
          <section className='col-lg-11 col-10'>
            {this.props.content}
          </section>
        </main>
      </main>
    )}}