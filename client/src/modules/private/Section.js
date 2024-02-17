import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Sidebar } from "../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../public/Login";

export function Section() {
  const [auth, setAuth] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const [datas, setDatas] = useState([]);

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

  useEffect(() =>  {
    axios.get('http://localhost:8081/section')
    .then( res => {
      try {
        setDatas(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

    return (
      <>
        <main className="container">
          <Sidebar />
          
          {
            auth ? 
            <main className="content">
              <header>
                <h1>Section</h1>
                <button>Add</button>
              </header>
              <hr />
              <main>
                <input type="text" placeholder="Search"></input>
                  <table>
                    <thead>
                      <tr>
                        <th>Section</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {datas.map(data => (
                        
                            <tr>
                              <td>{data.Section_ID}</td>
                              <td>
                                <button>View</button>
                                <button>Edit</button>
                              </td>
                            </tr>
                      ))}
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
  
  