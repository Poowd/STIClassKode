//dependencies
import axios from "axios"
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//css
import '../../App.css'
//routes
//components
import { Button } from '../components/Button'
import { Input } from '../components/Input'
//assets
import view from '../../assets/icons/view.png'

export function Login() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: '',
      password: '',
    })

  //get the data from server, if the server response if success -- login
  axios.defaults.withCredentials = true
  const handleSubmit = (e) => {
    e.preventDefault() //prevents normal function of onsubmit in forms
    axios.post('http://localhost:8081/login', values) //stores in usestate values
    .then(res => {
        if (res.data.Status === "Success") {
            navigate('/') //to dashboard
            window.location.reload(true)
        } else {
            alert(res.data.Message)
        }
    })
    .catch(err => console.log(err))}

    return (
      <>
        <main className='Login d-flex justify-content-center align-items-center'>
          <form onSubmit={ handleSubmit } className='card'>
            <div className='card-body my-5'>
              <h1 className='card-title text-center'>Login</h1>
                <div className='d-flex flex-column align-items-center'>
                  <div className='my-2'>
                        <Input 
                          title={ "Email" }
                          type={ "email" }
                          placeholder={ "Email" }
                          trigger={ (e) => setValues({...values, email: e.target.value}) }
                          name={ "Email" }
                          required
                        />
                      <div className="input-group mb-3">
                        <Input 
                          title={ "First Name" }
                          type={ "password" }
                          placeholder={ "Password" }
                          trigger={ (e) => setValues({...values, password: e.target.value}) }
                          name={ "Password" }
                          required
                        />
                          <div className="input-group-text">
                            <input id="password-toggler" className="form-check-input mt-0" type="checkbox" value="" />
                            </div>
                        </div>
                    </div>
                  <Button //submit button
                    class={ "btn btn-primary" }
                      type= { "submit" }
                        text={ "Login" } 
                          onClick={ () => console.log("Log-Login-Clicked") }
                    />
                    </div>
              <p className='custom-tag card-text text-center my-3'><Link to={ "/termspolicy" }>Terms & Policy</Link></p>
            </div>
          </form>
        </main>
      </>
    )}
  
  