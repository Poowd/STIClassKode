//dependencies
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
//css
import '../../App.css'
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
  const [programdata, setProgramData] = useState([]);
  const [studentList, setStudentList] = useState([{
    Student: "",
    Section: "",
    FirstName: "",
    LastName: "",
  }]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [sectiondata, setSectionData] = useState([{
    Name: "",
    Level: "",
    Semester: ""
  }]);
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: ""
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

  //show student list filtered from the junction
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

  //updates the userdata per keyboard button press in accordance with input tag
  const handleChange = (e) => {
    setSectionData(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //submit the form to create an account
  const handleSubmit = () => {
    if (!sectiondata.Name == "" && !sectiondata.Level == "" && !sectiondata.Semester == "") {
      axios.post('http://localhost:8081/add-section', sectiondata)
      .then(res => {
        try {
          window.location.reload(true);
        } catch(err) {
          console.log(err)
        }
      })
      .catch(err => console.log(err))
    } else {
      document.getElementById("err").textContent = "Missing Input/s"
    }
  }

  return (
    <>
    <TablePageWrapper
        page={ page }
        class={ "btn btn-primary" }
        text={ "Add " + page }
        databstoggle={ "modal" }
        databstarget={ "#staticBackdropi" }
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
                      databstarget={ "#viewModal" }
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
        viewmodaltitle={ page.concat(" Details") }
        viewmodalbody={
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
        formmodaltitle={ page }
        formmodalbody={
          <>
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                  placeholder={ "Name" }
                    onChange={ handleChange } 
                      name={ "Name" }
              />
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                  placeholder={ "Level" }
                    onChange={ handleChange } 
                      name={ "Level" }
              />
            <input 
              className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                type={ "text" }
                  placeholder={ "Semester" }
                    onChange={ handleChange } 
                      name={ "Semester" }
              />
            <p id='err' className='input-error'></p>
          </>
        }
        formmodalaction={ handleSubmit }
      />
    </>
  )
}

  