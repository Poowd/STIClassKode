import axios from 'axios'
import React, { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Layout3 } from '../../layout/Layout3'
import { Table } from '../../components/Table'
import { RadioButton } from '../../components/RadioButton'
import { Layout4 } from '../../layout/Layout4'

export function Coach() {
  const navigate = useNavigate()

  const coachStatus = ['Fulltime', 'Parttime']

  const handleChange = (e) => {
    SetSearch(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [data, setData] = useState([])
  const [search, SetSearch] = useState({
    Search: ""
  })
  axios.post('http://localhost:8081/display-coach', search)
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  const [department, setDepartment] = useState([])
  axios.post('http://localhost:8081/display-input-department')
    .then( res => {
      try {
        setDepartment(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  return (
    <Layout4
      parent_page={"File Maintainance"}
      page_title={"Coach"}
      col_1_1={"d"}
      col_2_1={
        <section>
          <h6>{"Table"}</h6>
          <Table
            table_items={
              data.map((coach, i) => (       
                <tr key={i} 
                  onClick={() => {console.log("Row Clicked!")}
                }>
                  <td><div className='pt-2'>{coach.CCHID}</div></td>
                  <td><div className='pt-2'>{coach.LastName.concat(", ", coach.FirstName)}</div></td>
                  <td className=''>
                    <div className='d-flex gap-1'>
                      <Link to={ "/view-profile/coach/"+ i + "/" + coach.CCHID} state={{ 
                          CCHID: coach.CCHID,
                          SCHLID: coach.SCHLID,
                          FirstName: coach.FirstName,
                          MiddleInitial: coach.MiddleInitial,
                          LastName: coach.LastName,
                          Type: coach.Type,
                          Units: coach.Units,
                          DPTID: department.map(option => (
                            option.DPTID === coach.DPTID ?
                            option.DepartmentName:""
                          )),
                          Email: coach.Email,
                          ContactNumber: coach.ContactNumber,
                          Facebook: coach.Facebook,
                          DateCreated: coach.DateCreated,
                        }} >
                        <Button
                          class={ "btn btn-info" }  
                          text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                      <Link to={ "/edit-profile/coach/"+ i + "/" + coach.CCHID} state={{ 
                          CCHID: coach.CCHID,
                          SCHLID: coach.SCHLID,
                          FirstName: coach.FirstName,
                          MiddleInitial: coach.MiddleInitial,
                          LastName: coach.LastName,
                          Type: coach.Type,
                          Units: coach.Units,
                          DPTID: coach.DPTID,
                          Email: coach.Email,
                          ContactNumber: coach.ContactNumber,
                          Facebook: coach.Facebook,
                          DateCreated: coach.DateCreated,
                        }}>
                        <Button
                          class={ "btn btn-warning" }  
                          text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          />
          <p className="w-100 fs-6 text mt-3 text-secondary">Table contains {data.length} rows.</p>
        </section>
      }
      col_2_2={
        <section className="">
          <section className="w-100">
              <h6>{"Details"}</h6>
              <section className="d-flex align-items-center gap-2 my-2">
                  <input 
                      className={"d-block w-100 px-4 py-2 form-control"}
                      type={"text"}
                      placeholder={"Search"}
                      name={"Search"}
                      onChange={handleChange}
                      value={search.Search}
                  />
                  <Link to={ "/insert-profile/coach" }>
                      <Button
                          class={"btn btn-primary"}  
                          text={"Add"} 
                          onClick={() => {console.log("Button Clicked!")}}
                      />
                  </Link>
              </section>
              <section className='mt-3 shadow-sm'>
                <ul className="list-group bg-none shadow-sm">
                  <li className="list-group-item">
                    <h6 className='fs-6'>Filters:</h6>
                    <div>
                      <RadioButton 
                        name={"Search"}
                        id={"FilterRadio"}
                        onchange={handleChange}
                        text={"All"}
                        value={""}
                      />
                      <hr />
                      {
                        department.map((department, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={'d' + i}
                              onchange={handleChange}
                              text={department.DepartmentName}
                              value={department.DepartmentName}
                            />
                          </div>
                        ))
                      }
                      <hr />
                      {
                        coachStatus.map((status, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={'s' + i}
                              onchange={handleChange}
                              text={status}
                              value={status}
                            />
                          </div>
                        ))
                      }
                    </div>
                  </li>
                </ul>
              </section>
          </section>
        </section>
      }
    />
  )
}