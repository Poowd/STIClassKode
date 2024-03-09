import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Form } from '../crud/Form';

export function ProgramInsertProfiles() {
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
            <li>{state.ProgramID}</li>
            <li>{state.Name}</li>
            <li>{state.ProgramCode}</li>
            <li>{state.Description}</li>
            <li>{state.Category}</li>
        </ul>
      </>
    );
}