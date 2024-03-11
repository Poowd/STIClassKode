import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export function ProgramProfiles() {
    let navigate = useNavigate();
    const params = useParams();
    let { state } = useLocation();

    return (
      <>
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