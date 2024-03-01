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


export function Dashboard() {
  const page = 'Dashboard';
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [counter, setCounter] = useState([]);
  const [userdata, setUserData] = useState({
    UserID:"",
    FirstName:"",
    LastName:"",
    Email:"",
    Password:""
  });

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
    setUserData(prev=>({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //get data from server: counter for total rows of user -> for UserID
  useEffect(() =>  {
    axios.get('http://localhost:8081/home')
    .then( res => {
      try {
        setCounter(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  //submit the form to create an account
  const handleSubmit = () => {
    if (userdata.FirstName != "" && userdata.LastName != "" && userdata.Email != "" && userdata.Password != "" ) {
      userdata.UserID = "USR".concat(counter[0].count)
      axios.post('http://localhost:8081/home', userdata)
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
      <main className="p-3">
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
                      placeholder={ "Email" }
                        onChange={ handleChange } 
                          name={ "Email" }
                  />

                <input 
                  className={ "d-block w-100 mb-3 px-4 py-2 form-control" }
                    type={ "text" }
                      placeholder={ "Password" }
                        onChange={ handleChange } 
                          name={ "Password" }
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