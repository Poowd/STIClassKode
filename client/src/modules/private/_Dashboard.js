//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//css
import '../../App.css';
//routes
//components
import { Button } from "../components/Button";
import { FormModal } from "../components/FormModal";
import { Table } from '../components/Table';
import { ViewModal } from '../components/ViewModal';


export function Dashboard() {
  const page = 'Dashboard';
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [adduserdata, setAddUserData] = useState([{
    UserID: "",
    FirstName: "",
    LastName: "",
    Birthday: "",
    UserLevel: ""
  }]);
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: "",
  }]);

  //get data from server: for student table
  useEffect(() =>  {
    axios.get('http://localhost:8081/view-user')
    .then( res => {
      try {
        setAddUserData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  //getting name from server
  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      setName(res.data.Name);
    })
  }, [])

  //removes the token thus redirected to login form (can be hompage)
  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data.Status === "Success") {
        window.location.reload(true);
      } else {
        alert("Error");
      }
    })
    .catch(err => console.log(err))
  }

  //updates the userdata per keyboard button press in accordance with input tag
  const handleChange = (e) => {
    setAddUserData(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //submit the form to create an account
  const handleSubmit = () => {
    if (adduserdata.FirstName != "" && adduserdata.LastName != "" && adduserdata.Birthday != "" && adduserdata.UserLevel != "" ) {
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
      <main className="p-3 overflow" style={{height:"100vh"}}>
        <h1>{ page }</h1>
        <h3>You are Authorized { name }, </h3>
          <Button
            class={ "btn btn-primary" } 
              text={ "Logout" } 
                disabled={ false }
                  onClick={ handleLogout }
          />

        <Button
            class={ "btn btn-primary my-3" }
              text={ "Add User" } 
                disabled={ false }
                  onClick={ () => console.log("open-modal") }
                    databstoggle={ "modal" }
                      databstarget={ "#staticBackdropi" }
          />

        <Table 
          tablename={ "wawa" }
            data={ 
              //map out the data pull from the database
              adduserdata.map((data, index) => (        
                <tr key={ index }>
                  <td className="ID">{ data.UserID }</td>
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
                            ID: data.UserID,
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
              rows={ adduserdata.length }
          />

          <ViewModal 
            title={ "Users" }
              body={ 
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
            />

          <FormModal 
            modaltitle={ "Add User Details" }
            modalbody={
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

                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "User Level (Student | Coach | Admin)" }
                        onChange={ handleChange } 
                          name={ "UserLevel" }
                  />

                <p id='err' className='input-error'></p>
              </>
            }
            action={ handleSubmit } 
          />
        
      </main>
    </>
  );
}