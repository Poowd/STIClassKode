import React from 'react';
import { Select } from '../components/Select';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

/* 
  Table Props:
    PageTitle
    ParentPage
    Selected
    TableName
    TableItems
    Counter
    TableItemDetails
*/

export class ContentWrapper extends React.Component {
  render() {
    return (
      <main className="px-lg-5 py-3 py-lg-4" style={{height: "100vh", overflowY: "auto"}}>
        <section>
            <header>
                <h2>{this.props.PageTitle}</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fs-6 ps-1">
                        <li className="breadcrumb-item"><Link to="">{this.props.ParentPage}</Link></li>
                        <li className="breadcrumb-item"><Link to="">{this.props.PageTitle}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">{this.props.Selected}</li>
                    </ol>
                </nav>
                <hr />
            </header>
        </section>
        <section>
            <main>
                <section className="row align-items-start">
                    <section className="col-lg-8 p-3">
                        <h6>{this.props.TableName + " Table"}</h6>
                        <section style={{overflowY: "auto", height: "65vh"}} className='bg-light'>
                            <table className="table w-100 shadow-sm table-hover">
                                <thead>
                                    <tr>
                                        <th className="col-2">ID</th>
                                        <th className="col-8">Name</th>
                                        <th className="col-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.TableItems}
                                </tbody>
                            </table>
                        </section>
                        <p className="w-100 fs-6 text mt-3 text-secondary">Table contains {this.props.Counter} rows.</p>
                    </section>
                    <section className="col-lg-4">
                        <section className="w-100 py-3">
                            <h6>{this.props.TableName + " Details"}</h6>
                            <section className="d-flex align-items-center gap-2 my-2">
                                <input 
                                    className={"d-block w-100 px-4 py-2 form-control"}
                                    type={"text"}
                                    placeholder={"Search"}
                                    name={"Search"}
                                    onChange={this.props.Search}
                                    value={this.props.SearchValue}
                                />
                                <Link to={ "/insert-profile/user" }>
                                    <Button
                                        class={"btn btn-primary"}  
                                        text={"Add"} 
                                        onClick={() => {console.log("Button Clicked!")}}
                                    />
                                </Link>
                            </section>
                            <ul className="list-group bg-none shadow-sm">
                                {this.props.TableItemDetails}
                            </ul>
                            <section className='mt-3 shadow-sm'>
                                <main className='card'>
                                    <section className='card-body'>
                                        <h6 className='fs-6'>Filters:</h6>
                                        <select 
                                            className={"d-block w-100 px-4 py-2 form-select"}
                                            id={"Search"}
                                            name={"Search"}
                                            onChange={this.props.Trigger}>
                                            {this.props.Options}
                                        </select>
                                    </section>
                                </main>
                            </section>
                        </section>
                    </section>
                </section>
            </main>
        </section>
      </main>
    )}}