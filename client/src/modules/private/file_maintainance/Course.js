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

export function Course() {
  const navigate = useNavigate()

  const handleChange = (e) => {
    SetSearch(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [data, setData] = useState([])
  const [search, SetSearch] = useState({
    Search: ""
  })
  axios.post('http://localhost:8081/display-course-program', search)
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
      page_title={"Course"}
      col_1_1={"d"}
      col_2_1={
        <section>
          <h6>{"Table"}</h6>
          <Table
            table_items={
              data.map((course, i) => (       
                <tr key={i} 
                  onClick={() => {console.log("Row Clicked!")}
                }>
                  <td><div className='pt-2'>{course.CRSID}</div></td>
                  <td><div className='pt-2'>{course.CourseName}</div></td>
                  <td className=''>
                    <div className='d-flex gap-1'>
                      <Link to={ "/view-profile/course/"+ i + "/" + course.CRSID} state={{ 
                          CRSID: course.CRSID,
                          CourseCode: course.CourseCode,
                          CourseName: course.CourseName,
                          Units: course.Units,
                          LessonType: course.LessonType,
                          Program: program.map(option => (
                            option.PRGID === course.PRGID ?
                            option.ProgramName:""
                          )),
                          DateCreated: course.DateCreated,
                        }} >
                        <Button
                          class={ "btn btn-info" }  
                          text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                      <Link to={ "/edit-profile/course/"+ i + "/" + course.CRSID} state={{ 
                          CRSID: course.CRSID,
                          CourseCode: course.CourseCode,
                          CourseName: course.CourseName,
                          Units: course.Units,
                          LessonType: course.LessonType,
                          Program: course.PRGID,
                          DateCreated: course.DateCreated,
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
                  <Link to={ "/insert-profile/course" }>
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
                      {
                        program.map((program, i) => (    
                          <div key={i}>
                            <RadioButton 
                              name={"Search"}
                              id={i}
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
    // <>
    //   <TablePageWrapper 
    //     //header
    //     page={ pageTitle }
    //     add={
    //       <Link to={ "/insert-profile/course" }>
    //         <Button 
    //           class={ "btn btn-primary my-3" } 
    //             text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> }
    //               onClick={ () => {} }
    //           />
    //       </Link>
    //     }
    //     //table
    //     tablename={ pageTitle }
    //       data={
    //         data.map((data, index) => (        
    //           <tr key={ index }>
    //             <td className="ID">{ data.CRSID }</td>
    //               <td>{ data.Name }</td>
    //                 <td className="Actions">
    //                   <div className="ActionsButton">
    //                     <Link 
    //                       to={ "/view-profile/course/"+ index + "/" + data.CourseID}
    //                         state={{ 
    //                           Entity: "Course",
    //                             CourseID: data.CourseID,
    //                             Name: data.Name,
    //                             CourseCode: data.CourseCode,
    //                             Type: data.Type,
    //                             Description: data.Description,
    //                             Category: data.Category,
    //                           }} >
    //                           <Button
    //                             class={ "btn btn-info" }  
    //                               text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
    //                                 onClick={ () => {} }
    //                             />
    //                     </Link>
    //                     <Link 
    //                           to={ "/edit-profile/course/"+ index + "/" + data.CourseID} 
    //                             state={{ 
    //                               CourseID: data.CourseID,
    //                               Name: data.Name,
    //                               CourseCode: data.CourseCode,
    //                               Type: data.Type,
    //                               Description: data.Description,
    //                               Category: data.Category,
    //                               }} >
    //                               <Button
    //                                 class={ "btn btn-warning" }  
    //                                   text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
    //                                     onClick={ () => {} }
    //                                 />
    //                           </Link>
    //                     </div>
    //                   </td>
    //             </tr>
    //           ))}
    //         datalength={ data.length }
    //   />
    // </>
  )
}
  
  