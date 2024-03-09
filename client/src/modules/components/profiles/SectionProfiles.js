import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export function SectionProfiles() {
    let navigate = useNavigate();
    let { state } = useLocation();
    const params = useParams();
    
    return (
      <>
        <h1>View { params.id }</h1>
        <ul>
            <li>{state.Entity}</li>
            <li>{state.SectionID}</li>
            <li>{state.Name}</li>
            <li>{state.Level}</li>
            <li>{state.Semester}</li>
        </ul>

        <p>Students:</p>
          <ul className='StudentList'>
            {
              state.StudentList.map((data, index) => {
                if (state.SectionID === state.StudentList[index].SectionID) {
                  return <li className='d-block w-100 text-start' key={ index }> {data.StudentID} : {data.LastName.concat(", ", data.FirstName)} </li>
                }})}
            </ul>
      </>
    );
}