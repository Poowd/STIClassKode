//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
//css
import '../../App.css';
//routes
//components
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";


export function Home() {
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
    if (userdata.FirstName && userdata.LastName && userdata.Email && userdata.Password != null) {
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
      console.log("No Input")
      window.location.reload(true);
    }
  }

  return (
    <>
      <main className="p-3">
        <h1>{ page }</h1>
        <h3>You are Authorized {name}, </h3>
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
            databstarget={ "#staticBackdrop" }
          />
          <Modal 
            modalbody={
              <>
              <input 
                className="d-block w-100 mb-3 px-4 py-2 form-control"
                type="text" 
                placeholder="FirstName" 
                onChange={ handleChange } 
                name="FirstName"
                />
              <input 
                className="d-block w-100 mb-3 px-4 py-2 form-control"
                type="text" 
                placeholder="LastName" 
                onChange={ handleChange } 
                name="LastName"
                />
              <input 
                className="d-block w-100 mb-3 px-4 py-2 form-control"
                type="text" 
                placeholder="Email" 
                onChange={ handleChange } 
                name="Email"
                />
                <input 
                  className="d-block w-100 mb-3 px-4 py-2 form-control"
                  type="text" 
                  placeholder="Password" 
                  onChange={ handleChange } 
                  name="Password"
                  />
          
              </>
            }
            action={ handleSubmit } 
          />
        
      </main>
    </>
  );
}