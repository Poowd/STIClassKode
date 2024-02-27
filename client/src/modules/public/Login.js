//dependencies
import axios from "axios";
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//css
import '../../App.css'
//routes
//components
import { Button } from '../components/Button';
import { Input } from '../components/Input';

export function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    //get the data from server, if the server response if success -- login
    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault(); //prevents normal function of onsubmit in forms
        axios.post('http://localhost:8081/login', values) //stores in usestate values
        .then(res => {
            if (res.data.Status === "Success") {
                navigate('/'); //to dashboard
                window.location.reload(true);
            } else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    }

    return (
      <>
        <main className='Login d-flex justify-content-center align-items-center'>
            <form onSubmit={ handleSubmit } className='card'>
                <div className='card-body'>
                    <h1 className='card-title text-center'>Login</h1>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='my-2'>
                            <Input //input box for email
                                label={ "Email" }
                                type={ "email" }
                                placeholder={ "Email" }
                                autoComplete="off"
                                change={ (e) => setValues({...values, email: e.target.value}) }
                            />
                            <Input //input box for password
                                label={ "Password" }
                                type={ "password" }
                                placeholder={ "Password" }
                                autoComplete="off"
                                change={ (e) => setValues({...values, password: e.target.value}) }
                            />
                        </div>
                        <Button //submit button
                            class={ "btn btn-primary" }
                            type= { "submit" }
                            text={ "Login" } 
                            disabled={ false }
                            onClick={ () => console.log("Log-Login-Clicked") }
                        />
                    </div>
                    <p className='custom-tag card-text text-center my-3'>Terms and Policy</p>
                </div>
            </form>
        </main>
      </>
    );
  }
  
  