//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"


export function Homepage() {

  const page = 'Dashboard'
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [editstudent, setEditStudent] = useState({
        FirstName: "",
          MiddleName: "",
            LastName: "",
              StudentType: "",
                ContactNumber: "",
                  Address: "",
        })

  //getting name from server
  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      setName(res.data.Name)
    })
  }, [])

  //removes the token thus redirected to login form (can be hompage)
  const handleLogout = () => {
    axios.post('http://localhost:8081/logout')
    .then(res => {
      if (res.data.Status === "Success") {
        window.location.reload(true)
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }

  

  return (
    <>
      <h1>Hi</h1>
      <Button
            class={ "btn btn-primary" } 
              text={ "Logout" } 
                disabled={ false }
                  onClick={ handleLogout }
          />

            

    </>
  )
}