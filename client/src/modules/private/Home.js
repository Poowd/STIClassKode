import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../public/Login'
import { Sidebar } from "../components/Sidebar";
import '../../App.css';
import { PrimaryButton } from "../components/PrimaryButton";


export function Home() {

  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  
  const navigate = useNavigate();

  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      if (res.data.Status === "Success") {
        setAuth(true);
        setName(res.data.Name);
      } else {
        setAuth(false);
        setMessage(res.data.Message);
      }
    })
  }, [])

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

  return (
    <>
      <main className="container">
        <Sidebar />
        {
          auth ? 
          <main className="content">
            <h1>Dashboard</h1>
            <h3>You are Authorized {name}, </h3>
            <PrimaryButton 
              text={ "Logout" } 
              disabled={ false }
              onClick={ handleLogout }
            />
          </main>
          :
          <main>
            <Login />
          </main>
        }
      </main>
    </>
  );
}