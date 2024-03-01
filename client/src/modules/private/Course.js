//dependencies
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//css
//routes
//components
import { Button } from "../components/Button";
import { TablePageWrapper } from '../components/TablePageWrapper';

export function Course() {
  const page = 'Course';
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [userdata, setUserData] = useState([{
    ID: "",
    Name: "",
  }]);

  //get data from server: for course table
  useEffect(() =>  {
    axios.get('http://localhost:8081/course')
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
      <TablePageWrapper 
        page={ page }
        class={ "btn btn-primary" }
        text={ "Add " + page }
        databstoggle={ "modal" }
        databstarget={ "#staticBackdropi" }
        tablename={ page }
        data={
            //map out the data pull from the database
            data.map((data, index) => (        
              <tr key={ index }>
                <td className="ID">{ data.CourseID }</td>
                <td>{ data.Name }</td>
                <td className="Actions">
                  <div className="ActionsButton">
                  <Button
                      class={ "btn btn-primary" } 
                      text={ "View" } 
                      disabled={ false }
                      onClick={ () => {
                        setSelectedIndex(index)
                        setUserData({
                          ID: data.CourseID,
                          Name: data.Name
                        })
                      } }
                      databstoggle={ "modal" }
                      databstarget={ "#viewModal" }
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
        datalength={ data.length }
        viewmodaltitle={ page.concat(" Details") }
        viewmodalbody={
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
        formmodaltitle={
          <h1>Hello</h1>
        }
        formmodalbody={
          <h1>Hello</h1>
        }
      />
    </>
  );
}
  
  