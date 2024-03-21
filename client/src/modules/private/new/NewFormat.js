import React, { useState } from "react"
import { Link } from "react-router-dom"

export function NewFormat() {
    const [placeholder, setPlaceholder] = useState({
        ID: "None",
        Name: "None",
    })
  return (
    <main className="px-lg-5 py-lg-4">
        <section>
            <header>
                <h2>Title of the Page</h2>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fs-6 ps-1">
                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li className="breadcrumb-item"><a href="#">Title of the Page</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Selected ID</li>
                    </ol>
                </nav>
                <hr />
            </header>
        </section>
        <section>
            <main>
                <section class="row align-items-start">
                    <section class="col-lg-8 p-3">
                        <h6>Table</h6>
                        <section className="d-flex align-items-center gap-1 my-3">
                            <input className="w-100 px-3 py-1" />
                            <button className="btn btn-primary">Filter</button>
                            <button className="btn btn-primary">New</button>
                        </section>
                        <section style={{overflowY: "auto", height: "65vh"}}>
                            <table className="table w-100 shadow-sm table-hover">
                                <thead>
                                    <tr>
                                        <th className="col-2">ID</th>
                                        <th className="col-8">Name</th>
                                        <th className="col-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr onClick={
                                        () => {
                                            setPlaceholder({
                                                ID: "1",
                                                Name: "Mark"
                                            })
                                        }
                                    }>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td className="d-flex align-items-center gap-1">
                                            <Link to="/page"><button className="btn btn-primary">Edit</button></Link>
                                        </td>
                                    </tr>
                                    <tr onClick={
                                        () => {
                                            setPlaceholder({
                                                ID: "2",
                                                Name: "Limuel"
                                            })
                                        }
                                    }>
                                        <td>2</td>
                                        <td>Limuel</td>
                                        <td className="d-flex align-items-center gap-1">
                                            <Link to="/page"><button className="btn btn-primary">Edit</button></Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <p className="w-100 fs-6 text mt-2">Table contains {"x"} rows.</p>
                    </section>
                    <section class="col-lg-4">
                        <section className="w-100 py-3">
                            <h6>Details</h6>
                            <ul class="list-group bg-none shadow-sm">
                                <li class="list-group-item">
                                    <span className="fs-6">ID:</span> {placeholder.ID}
                                </li>
                                <li class="list-group-item">
                                    <span className="fs-6">Name:</span> {placeholder.Name}
                                </li>
                            </ul>
                        </section>
                    </section>
                </section>
            </main>
        </section>
    </main>
  )
}
  
  