//dependencies
import axios from 'axios'
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
//css
import '../../App.css'
//routes
//components
import { Button } from "../components/Button"
import logoutIcon from '../../assets/icons/switch.png'
import { ConfirmModal } from '../components/ConfirmModal'



export function Homepage() {
  const page = 'Dashboard'
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const bootstrap = require('bootstrap')

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
        //window.location.reload(true)
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err))
  }
  

  let modal = null;
  function getModal() {
    if (!modal) {
      modal = new bootstrap.Modal(document.getElementById('example'));   
    }
    return modal
  }
  
  function toggleModal() {
    getModal().hide()
  }

  return (
    <>
      

      <main className="p-lg-5 p-3 overflow" style={{height:"100vh"}}>
        <header className="d-flex justify-content-between align-items-center">
            <div className='w-100'>
              <h1>{ "Homepage" }</h1>
              <h5>You are Authorized { name }. </h5>
            </div>
            <Button
              class={ "btn btn-danger" } 
              text={ "Logout" } 
              disabled={ false }
              onClick={ () => {} }
              databstoggle="modal" 
              databstarget="#logout"
            />
                
            <ConfirmModal 
              id={ "logout" }
              icon={ logoutIcon }
              title={ "Logout" }
              subtitle={ "Are you sure you want to logout?" }
              confirm={ handleLogout }
              textclass={ "text-danger" }
              btnclass={ "btn-danger" }
            />
          </header>
          <hr />
          <main>
               <div className='d-lg-flex w-100 justify-content-between gap-3'>
                  <div class="card border-primary mb-3 w-100">
                    <div class="card-header">Header</div>
                    <div class="card-body text-primary">
                      <h5 class="card-title">Card 1</h5>
                      <p class="card-text">...</p>
                    </div>
                  </div>

                  <div class="card border-primary mb-3 w-100">
                    <div class="card-header">Header</div>
                    <div class="card-body text-primary">
                      <h5 class="card-title">Card 2</h5>
                      <p class="card-text">...</p>
                    </div>
                  </div>

                  <div class="card border-primary mb-3 w-100">
                    <div class="card-header">Header</div>
                    <div class="card-body text-primary">
                      <h5 class="card-title">Card 3</h5>
                      <p class="card-text">...</p>
                    </div>
                  </div>
               </div>
          </main>
          
      <button onClick={ () => {
        const x = 1
        if (x === 2) {
          console.log("hi")
        } else {
          getModal().show()
        }
      } } className='btn btn-primary' id='hello'>asd</button>
      
      </main>

      <div class="modal fade" id="example" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              ...
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={toggleModal}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      
    </>
  )
}