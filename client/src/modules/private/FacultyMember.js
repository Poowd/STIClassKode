//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//css
//routes
//components
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { ViewModal } from '../components/ViewModal';
import { TablePageWrapper } from '../components/TablePageWrapper';

export function FacultyMember() {
  const page = 'Faculty Member';
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [adduserdata, setAddUserData] = useState({
    FirstName: "",
    LastName: "",
    Birthday: "",
    UserLevel: "Coach"
  });
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: "",
  }]);

  //get data from server: for faculty member table
  useEffect(() =>  {
    axios.get('http://localhost:8081/facultymember')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  //updates the userdata per keyboard button press in accordance with input tag
  const handleChange = (e) => {
    setAddUserData(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //submit the form to create an account
  const handleSubmit = () => {
    if (!adduserdata.FirstName == "" && !adduserdata.LastName == "" && !adduserdata.Birthday == "") {
      axios.post('http://localhost:8081/home', adduserdata)
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
                  <td className="ID">{ data.FacultyMemberID }</td>
                  <td>{ data.LastName.concat(", ", data.FirstName) }</td>
                  <td className="Actions">
                    <div className="ActionsButton">
                      <Button
                        class={ "btn btn-primary" } 
                        text={ "View" } 
                        disabled={ false }
                        onClick={ () => {
                          setSelectedIndex(index)
                          setUserData({
                            ID: data.FacultyMemberID,
                            Name: data.LastName.concat(", ", data.FirstName)
                          })
                        } }
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
                <td className='pe-3'>ID:</td>
                <td>{ userdata.ID }</td>
              </tr>
              <tr>
                <td className='pe-3'>Name:</td>
                <td>{ userdata.Name }</td>
              </tr>
            </>
          }
          formmodaltitle={ page }
        formmodalbody={
          <>
            <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "First Name" }
                        onChange={ handleChange } 
                          name={ "FirstName" }
                  />
                
                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "Last Name" }
                        onChange={ handleChange } 
                          name={ "LastName" }
                  />

                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "email" }
                      placeholder={ "Birthday (yyyy-mm-dd)" }
                        onChange={ handleChange } 
                          name={ "Birthday" }
                  />

            <p id='err' className='input-error'></p>
          </>
        }
        formmodalaction={ handleSubmit }
        
        />
      </>
    )
}
  
  