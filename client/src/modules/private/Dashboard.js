import axios from 'axios'
import React, { useEffect, useState } from "react"
import '../../App.css'
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import edit from '../../assets/icons/edit-text.png'
import { Link } from 'react-router-dom'
import { ContentWrapper } from '../wrapper/ContentWrapper'


export function Dashboard() {
  const [name, setName] = useState('')
  const [data, setData] = useState([])
  const [itemDetails, SetItemDetails] = useState({
    Name: "",
  })
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
    <ContentWrapper 
      PageTitle={"Dashboard"}
      ParentPage={"ClassKode: " + name}
      Selected={itemDetails.SchoolID}
      TableName={"User"}
      Search={handleChange}
      SearchValue={search.Search}
      Trigger={handleChange}
      Options={
        <>
          <option defaultValue=""></option>
          <option value="Admin">Admin</option>
          <option value="Coach">Coach</option>
          <option value="Student">Student</option>
        </>
      }
      TableItems={
        data.map((user, i) => (        
          <tr key={i} 
            onClick={() => {
              SetItemDetails({
                  SchoolID: user.SchoolID,
                  Name: user.LastName.concat(", ", user.FirstName),
                  UserLevel: user.UserLevel,
            })}
          }>
            <td>{ user.SchoolID }</td>
            <td>{user.LastName.concat(", ", user.FirstName)}</td>
            <td>
              <Link to={ "/edit-profile/user/"+ i + "/" + user.UserID} state={{ 
                Entity: "User",
                UserID: user.UserID,
                SchoolID: user.SchoolID,
                FirstName: user.FirstName,
                LastName: user.LastName,
                Birthday: user.Birthday,
                UserLevel: user.UserLevel,
              }}>
              <Button
                class={ "btn btn-warning" }  
                  text={ <img src={ edit } alt='...' width="20" height="20" className='custom-icon' /> } 
                    onClick={ () => {console.log(5-6)} }
                />
              </Link>
            </td>
          </tr>
        ))
      }
      Counter={data.length}
      TableItemDetails={
        <>
          <li className="list-group-item">
            <span className="fs-6 text-secondary">ID:</span> {itemDetails.SchoolID}
          </li>
          <li className="list-group-item">
            <span className="fs-6 text-secondary">Name:</span> {itemDetails.Name}
          </li>
          <li className="list-group-item">
            <span className="fs-6 text-secondary">UserLevel:</span> {itemDetails.UserLevel}
          </li>
        </>
      }
    />
  </>)}