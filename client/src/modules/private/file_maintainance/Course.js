import axios from 'axios'
import React, { useEffect, useState } from "react"
import { Button } from "../../components/Button"
import { TablePageWrapper } from '../../components/TablePageWrapper'
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'

export function Course() {
  // const pageTitle = 'Course'
  // const [data, setData] = useState([]) //stores data sent by the server from database
  
  // //get data from server: for course table
  // useEffect(() =>  {
  //   axios.get('http://localhost:8081/view-course')
  //   .then( res => {
  //     try {
  //       setData(res.data)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   })}, [])

  return (
    <h1>Course Page</h1>
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
    //             <td className="ID">{ data.CourseID }</td>
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
  
  