import axios from 'axios'
import React, { useEffect, useState } from "react"
import '../../App.css'
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import edit from '../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'
import { ContentWrapper } from '../wrapper/ContentWrapper'
import { Layout3 } from '../layout/Layout3';
import { Table } from '../components/Table'
import view from '../../assets/icons/view (1).png'


export function Dashboard() {
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [search, SetSearch] = useState({
    Search: ""
  })

  useEffect(() =>  {
    axios.get('http://localhost:8081')
    .then(res => {
      setName(res.data.Name)
    })}, [])

  axios.post('http://localhost:8081/display-user', search)
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
  })
  
  const handleChange = (e) => {
    SetSearch(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
    }))
  }
    
  return (<>
    <Layout3 
      item_1={"curriculum"}
      item_2={"academic year"}
      item_3={"semester"}
      col_1_1={"d"}
      col_2_1={
        <section>
          <h6>{"Table"}</h6>
          <Table
            table_items={
              data.map((user, i) => (        
                <tr key={i} 
                  onClick={() => {console.log("Row Clicked!")}
                }>
                  <td><div className='pt-2'>{user.SCHLID}</div></td>
                  <td><div className='pt-2'>{user.LastName.concat(", ", user.FirstName)}</div></td>
                  <td className=''>
                    <div className='d-flex gap-1'>
                      <Link to={ "/view-profile/user/"+ i + "/" + user.UUID} state={{ 
                          UUID: user.UUID,
                        }}>
                        <Button
                          class={ "btn btn-info" }  
                          text={ <img src={ view } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                      <Link to={ "/edit-profile/user/"+ i + "/" + user.UUID} state={{ 
                          UUID: user.UUID,
                        }}>
                        <Button
                          class={ "btn btn-warning" }  
                          text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                          onClick={ () => {console.log("Button Clicked!")} }
                        />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            }
          />
          <p className="w-100 fs-6 text mt-3 text-secondary">Table contains {data.length} rows.</p>
        </section>
      }
      col_2_2={
        <section className="">
          <section className="w-100">
              <h6>{"Details"}</h6>
              <section className="d-flex align-items-center gap-2 my-2">
                  <input 
                      className={"d-block w-100 px-4 py-2 form-control"}
                      type={"text"}
                      placeholder={"Search"}
                      name={"Search"}
                      onChange={handleChange}
                      value={search.Search}
                  />
                  <Link to={ "/insert-profile/user" }>
                      <Button
                          class={"btn btn-primary"}  
                          text={"Add"} 
                          onClick={() => {console.log("Button Clicked!")}}
                      />
                  </Link>
              </section>
              <section className='mt-3 shadow-sm'>
                <ul className="list-group bg-none shadow-sm">
                  <li className="list-group-item">
                    <h6 className='fs-6'>Filters:</h6>
                    <div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="Search" id="FilterRadio1" value="" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="FilterRadio1">
                          All
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="Search" id="FilterRadio2" value="Admin" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="FilterRadio2">
                          Admin
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="Search" id="FilterRadio3" value="Coach" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="FilterRadio3">
                          Coach
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="Search" id="FilterRadio4" value="Student" onChange={handleChange}/>
                        <label className="form-check-label" htmlFor="FilterRadio4">
                          Student
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
          </section>
        </section>
      }
    />
  </>)}