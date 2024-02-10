import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Login } from './Login'


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
        setName(res.data.name);
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
      <div>
        {
          auth ? 
          <div>
            <h3>You are Authorized {name}</h3>
            <button onClick={handleLogout}>Logout</button>
          </div>
          :
          <div>
            <Login />
          </div>
        }
      </div>
    </>
  );
}

