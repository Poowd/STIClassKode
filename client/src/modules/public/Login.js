import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { Button } from '../components/Button';

export function Login() {

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if (res.data.Status === "Success") {
                navigate('/');
                window.location.reload(true);
            } else {
                alert(res.data.Message);
            }
        })
        .catch(err => console.log(err));
    }

    return (
      <>
        <main className='Login'>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder="Enter Email" name="email" autoComplete="off"
                    onChange={e => setValues({...values, email: e.target.value})} />
                </div>
                <div>
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder="Enter Password" name="password" autoComplete="off" 
                    onChange={e => setValues({...values, password: e.target.value})} />
                </div>
                <Button
                    class={ "btn btn-primary" }
                    text={ "Login" } 
                    disabled={ false }
                    onClick={ () => console.log("Logged In") }
                    type= { "submit" }
                />
                <p>Terms and Policy</p>
            </form>
        </main>
      </>
    );
  }
  
  