//dependencies
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
//css
//routes
//components
import { Table } from "../components/Table";
import { Button } from "../components/Button";
import { ViewModal } from '../components/ViewModal';
import { TablePageWrapper } from '../components/TablePageWrapper';

export function Section() {
  const page = 'Section';
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [studentList, setStudentList] = useState([{
    Student: "",
    Section: "",
    FirstName: "",
    LastName: "",
  }]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: "",
  }]);

  //get data from server: for section table
  useEffect(() =>  {
    axios.get('http://localhost:8081/section')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  useEffect(() =>  {
    axios.get('http://localhost:8081/studentsection')
    .then( res => {
      try {
        setStudentList(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  return (
    <>
    <TablePageWrapper
        page={ page }
        class={ "btn btn-primary" }
        text={ "Add " + page }
        tablename={ page }
        data={
            //map out the data pull from the database
            data.map((data, index) => (        
              <tr key={ index }>
                <td className="ID">{ data.SectionID }</td>
                <td>{ data.Name }</td>
                <td className="Actions">
                  <div className="ActionsButton">
                  <Button
                      class={ "btn btn-primary" } 
                      text={ "View" } 
                      disabled={ false }
                      onClick={ () => {
                        setSelectedIndex(index)
                        setUserData({
                          ID: data.SectionID,
                          Name: data.Name
                        })
                      }}
                      databstoggle={ "modal" }
                      databstarget={ "#staticBackdrop" }
                    />
                    <Button
                      class={ "btn btn-primary" }  
                      text={ "Edit" } 
                        disabled={ false }
                        onClick={ () => console.log("Hello World") }
                        />
                  </div>
                </td>
              </tr>
            ))
          }
        datalength={ data.length }
        modaltitle={ page.concat(" Details") }
        body={
          <>
            <tr>
              <td className='pe-3'>ID: { userdata.ID }</td>
            </tr>
            <tr>
              <td className='pe-3'>Name: { userdata.Name }</td>
            </tr>
            <tr>
              <td>
                <hr className='w-100' />
              </td>
            </tr>
            <tr>
              <td>
                <p>Students:</p>
                <ul className='StudentList'>
                  {
                      studentList.map(function(data, index) {
                        if (data.SectionID == userdata.ID) {
                          return <li className='d-block mt-1 w-100 text-start' key={ index }> {data.StudentID} : {data.FirstName.concat(" ", data.LastName)} </li>
                        }
                      })
                    }
                </ul>
              </td>
            </tr>
          </>
        }
      />
    </>
  )
}
  
  