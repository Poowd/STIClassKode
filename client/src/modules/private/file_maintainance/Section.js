import axios from 'axios'
import React, { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Table } from '../../components/Table'
import { RadioButton } from '../../components/RadioButton'
import { Layout4 } from '../../layout/Layout4'

export function Section() {
  const navigate = useNavigate()
  const sectionYear = ["First Year", "Second Year", "Third Year", "Fourth Year"]
  const sectionSemester = ["First Semester", "Second Semester"]

  const handleChange = (e) => {
    SetSearch(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [data, setData] = useState([])
  const [search, SetSearch] = useState({
    Search: ""
  })
  axios.post('http://localhost:8081/display-section', search)
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  const [program, setProgram] = useState([])
  axios.post('http://localhost:8081/display-input-program')
    .then( res => {
      try {
        setProgram(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  return (
    <Layout4
      parent_page={"File Maintainance"}
      page_title={"Section"}
      col_1_1={"d"}
      col_2_1={
        <section>
          <h6>{"Table"}</h6>
          <Table
            table_items={
              data.map((section, i) => (       
                <tr key={i} 
                  onClick={() => {console.log("Row Clicked!")}
                }>
                  <td><div className='pt-2'>{section.SCTID}</div></td>
                  <td><div className='pt-2'>{section.SectionName}</div></td>
                  <td className=''>
                    <div className='d-flex gap-1'>
                      <Link to={ "/view-profile/section/"+ i + "/" + section.SCTID} state={{ 
                          SCTID: section.SCTID,
                          SectionName: section.SectionName,
                          Population: section.Population,
                          Year: section.Year,
                          Semester: section.Semester,
                          Program: program.map(option => (
                            option.PRGID === section.PRGID ?
                            option.ProgramName:""
                          )),
                          DateCreated: section.DateCreated,
                        }} >
                        <Button
                          class={ "btn btn-info" }  
                          text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                      <Link to={ "/edit-profile/section/"+ i + "/" + section.SCTID} state={{ 
                          SCTID: section.SCTID,
                          SectionName: section.SectionName,
                          Population: section.Population,
                          Year: section.Year,
                          Semester: section.Semester,
                          PRGID: section.PRGID,
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
                  <Link to={ "/insert-profile/section" }>
                      <Button
                          class={"btn btn-primary"}  
                          text={"Add"} 
                          onClick={() => {console.log("Button Clicked!")}}
                      />
                  </Link>
              </section>
              <section className='mt-3'>
                <Link to={ "/insert-profile/generate section" }>
                  <Button
                      class={"btn btn-primary w-100"}  
                      text={"Generate"} 
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
                        sectionYear.map((year, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={'y' + i}
                              onchange={handleChange}
                              text={year}
                              value={year}
                            />
                          </div>
                        ))
                      }
                      <hr />
                      {
                        sectionSemester.map((semester, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={'s' + i}
                              onchange={handleChange}
                              text={semester}
                              value={semester}
                            />
                          </div>
                        ))
                      }
                      <hr />
                      {
                        program.map((program, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={'p' + i}
                              onchange={handleChange}
                              text={program.ProgramName}
                              value={program.ProgramName}
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
  
  