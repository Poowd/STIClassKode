import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Sidebar } from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../public/Login";

export function Curriculum() {
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

    return (
      <>
        <main className="container">
          <Sidebar />
          {
            auth ? 
            <main className="content">
              <header>
                <h1>Curriculum</h1>
                <button>Add</button>
              </header>
              <hr />
              <main>
                <input type="text" placeholder="Search"></input>
                <table>
                  <thead>
                    <tr>
                      <th>Curriculum</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Tertiary</td>
                      <td>
                        <button>View</button>
                        <button>Edit</button>
                      </td>
                    </tr>
                    <tr>
                      <td>Senior High School</td>
                      <td>
                        <button>View</button>
                        <button>Edit</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>Table contains x rows.</p>
              </main>
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
  
  