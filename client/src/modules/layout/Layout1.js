import React from 'react';

export class Layout1 extends React.Component {
  render() {
    return (
      <main>
        <main className='row m-0 h-100' style={{height: "6vh"}}>
          <section className='col d-flex align-items-center' style={{backgroundColor: "#01579b"}}>
            {this.props.header}
          </section>
        </main>
        <main className='row m-0 p-0' style={{height: "92vh"}}>
          <section className='col-lg-2 col-2 p-0' style={{backgroundColor: "#2c384a"}}>
            {this.props.sidebar}
          </section>
          <section className='col-lg-10 col-10 p-3'>
            {this.props.content}
          </section>
        </main>
      </main>
    )}}