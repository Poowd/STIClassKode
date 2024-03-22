import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button } from "../../components/Button";
import { TablePageWrapper } from '../../components/TablePageWrapper';
import view from '../../../assets/icons/view (1).png'
import edit from '../../../assets/icons/edit-text.png'
import { Link, Navigate } from 'react-router-dom'

export function SchoolFacility() {
  // const pageTitle = 'School Facility';
  //   const [data, setData] = useState([]);
  // const [schoolfacilitydata, setSchoolFacilityData] = useState([{
  //   Name: "",
  //     Capacity: "",
  //       Type: "",
  //         Building: ""
  //   }]);
  // const [userdata, setUserData] = useState([{
  //   ID: "",
  //     Name: "",
  //   }]);

  // //get data from server: for faculty member table
  // useEffect(() =>  {
  //   axios.get('http://localhost:8081/view-schoolfacility')
  //   .then( res => {
  //     try {
  //       setData(res.data)
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   })}, []);
  //   //updates the userdata per keyboard button press in accordance with input tag
  //   const handleChange = ( e ) => {
  //     setSchoolFacilityData(prev => ({
  //       ...prev,
  //       [ e.target.name ]: e.target.value
  //     }))}
  //     //submit the form to create an account
  //     const sendSchoolFacilityData = () => {
  //       if (!schoolfacilitydata.Name === "" && !schoolfacilitydata.Capacity === "" && !schoolfacilitydata.Type === "" && !schoolfacilitydata.Building === "") {
  //         axios.post('http://localhost:8081/add-schoolfacility', schoolfacilitydata)
  //         .then(res => {
  //           try {
  //             window.location.reload(true);
  //           } catch(err) {
  //             console.log(err)
  //           }
  //         })
  //         .catch(err => console.log(err))
  //       } else {
  //         document.getElementById("err").textContent = "Missing Input/s" }}

  return (
    <h1>Room Page</h1>
    // <>
    //   <TablePageWrapper
    //     page={ pageTitle}
    //     add={
    //       <Link to={ "/insert-profile/schoolfacility" }>
    //         <Button 
    //           class={ "btn btn-primary my-3" } 
    //             text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> }
    //               onClick={ () => {} }
    //           />
    //       </Link>
    //     }
    //     tablename={ pageTitle}
    //       data={
    //           //map out the data pull from the database
    //           data.map((data, index) => (        
    //             <tr key={ index }>
    //               <td className="ID">{ data.SchoolFacilityID }</td>
    //                 <td>{ data.Name }</td>
    //                   <td className="Actions">
    //                     <div className="ActionsButton">
    //                       <Link 
    //                         to={ "/view-profile/schoolfacility/"+ index + "/" + data.SchoolFacilityID}
    //                           state={{ 
    //                             Entity: "School Facility",
    //                               SchoolFacilityID: data.SchoolFacilityID,
    //                               Name: data.Name,
    //                               Capacity: data.Capacity,
    //                               Type: data.Type,
    //                               Building: data.Building,
    //                             }} >
    //                             <Button
    //                               class={ "btn btn-info" }  
    //                                 text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
    //                                   onClick={ () => {} }
    //                               />
    //                       </Link>
    //                       <Link 
    //                         to={ "/edit-profile/schoolfacility/"+ index + "/" + data.SchoolFacilityID}
    //                           state={{ 
    //                             Entity: "School Facility",
    //                               SchoolFacilityID: data.SchoolFacilityID,
    //                               Name: data.Name,
    //                               Capacity: data.Capacity,
    //                               Type: data.Type,
    //                               Building: data.Building,
    //                             }} >
    //                             <Button
    //                               class={ "btn btn-warning" }  
    //                                 text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
    //                                   onClick={ () => {} }
    //                               />
    //                       </Link>
    //                       </div>
    //                     </td>
    //               </tr>
    //             ))}
    //             datalength={ data.length }
    //     />
    //   </>
  )}