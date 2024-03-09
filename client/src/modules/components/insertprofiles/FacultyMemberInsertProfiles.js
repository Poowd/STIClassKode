import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function FacultyMemberInsertProfiles() {
    let navigate = useNavigate();
    const params = useParams();
    let { state } = useLocation();

    return (
      <>
        <div className='w-100 text-end'>
          <button className='btn btn-secondary' onClick={() => navigate(-1)}>Back</button>
            </div>
        <h1>View { params.id }</h1>
        <ul>
            <li>{state.Entity}</li>
            <li>{state.FacultyMemberID}</li>
            <li>{state.UserID}</li>
            <li>{state.SchoolFacultyMemberID}</li>
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