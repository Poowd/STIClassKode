import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../../../../App.css'

export function StudentProfiles() {
    let navigate = useNavigate();
    const params = useParams();
    let { state } = useLocation();

    return (
      <>
        <h1>View { params.id }</h1>
        <ul>
            <li>{state.Entity}</li>
            <li>{state.StudentID}</li>
            <li>{state.UserID}</li>
            <li>{state.SchoolStudentID}</li>
            <li>{state.FirstName}</li>
            <li>{state.MiddleName}</li>
            <li>{state.LastName}</li>
            <li>{state.StudentType}</li>
            <li>{state.Email}</li>
            <li>{state.ContactNumber}</li>
            <li>{state.Address}</li>
            <li>{state.DateCreated}</li>
        </ul>
      </>
    );
}