//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//css
//routes
//components
import { Button } from "../components/Button";
import { Table } from "../components/Table";
import { ViewModal } from '../components/ViewModal';

export function FacultyMember() {
  const page = 'FacultyMember';
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: "",
  }]);

  //get data from server: for faculty member table
  useEffect(() =>  {
    axios.get('http://localhost:8081/facultymember')
    .then( res => {
      try {
        setData(res.data)
      } catch(err) {
        console.log(err)
      }
    })
  }, []);

  return (
    <>
      <main className="p-3">
        <header className="d-flex justify-content-between align-items-center">
          <h1>{ page }</h1>
          <Button 
            class={ "btn btn-primary" }
            text={ "Add Entity" } 
            disabled={ false }
            onClick={ () => console.log("Hello World") }
          />
        </header>
        <hr />
        <main>
          <input type="text" className="px-3 py-2 mb-3 w-100" placeholder="Search"></input>
          <Table 
            tablename={ page }
            data={
              //map out the data pull from the database
                data.map((data, index) => (        
                <tr key={ index }>
                  <td className="ID">{ data.FacultyMemberID }</td>
                  <td>{ data.FirstName.concat(" ", data.LastName) }</td>
                  <td className="Actions">
                    <div className="ActionsButton">
                      <Button
                        class={ "btn btn-primary" } 
                        text={ "View" } 
                        disabled={ false }
                        onClick={ () => {
                          setSelectedIndex(index)
                          setUserData({
                            ID: data.FacultyMemberID,
                            Name: data.FirstName.concat(" ", data.LastName)
                          })
                        } }
                        databstoggle={ "modal" }
                        databstarget={ "#staticBackdrop" }
                      />
                      <Button
                        class={ "btn btn-primary" }  
                        text={ "Edit" } 
                          disabled={ false }
                          onClick={ () => console.log("Hello World") }
                          />
                    </div>
                  </td>
                </tr>
              ))
            }
            rows={ data.length }
          />
          <ViewModal 
            title={ page.concat(" Details") }
            body={
              <>
                <tr>
                  <td className='pe-3'>ID:</td>
                  <td>{ userdata.ID }</td>
                </tr>
                <tr>
                  <td className='pe-3'>Name:</td>
                  <td>{ userdata.Name }</td>
                </tr>
              </>
            }
          />
          
        </main>
      </main>
    </>
  );
}
  
  