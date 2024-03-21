import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

export function EditPage() {
  const navigate = useNavigate()
  const [inputlabel, setInputLabel] = useState({
    i1: "FirstName"
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
            <section className="w-100 d-flex gap-1 justify-content-end mb-3">
              <button className="btn btn-primary">Save</button>
              <button className="btn btn-primary">Delete</button>
              <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
            </section>
            <section>
              <form>
              <div className="row">
                <div className="col-lg">
                  <label htmlFor={inputlabel.i1} className="fs-6">{inputlabel.i1}</label>
                  <input type="text" className="form-control" id={inputlabel.i1} placeholder={inputlabel.i1} aria-label={inputlabel.i1} />
                </div>
                <div className="col-lg">
                  <label htmlFor="LastName" className="fs-6">Last Name</label>
                  <input type="text" className="form-control" id="LastName" placeholder="Last name" aria-label="Last name" />
                </div>
              </div>
              </form>
            </section>
        </section>
    </main>
  )}