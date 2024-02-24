import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Table } from "../components/Table";

export function Student() {
  const page = 'Student';
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  //get data from server: for student table
  useEffect(() =>  {
    axios.get('http://localhost:8081/student')
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
                  <td className="ID">{ data.StudentID }</td>
                  <td>{ data.FirstName.concat(" ", data.LastName) }</td>
                  <td className="Actions">
                    <div className="ActionsButton">
                      <Button
                        class={ "btn btn-primary" }  
                        text={ "View" } 
                        disabled={ false }
                        onClick={ () => console.log("Hello World") }
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
            rows={ "x" }
          />
          
          
        </main>
      </main>
    </>
  );
}
  
  