import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export function UserProfiles() {
    let navigate = useNavigate();
    const params = useParams();
    let { state } = useLocation();

    return (
      <>
        <h1>View { params.id }</h1>
        <ul>
            <li>{state.Entity}</li>
            <li>{state.UserID}</li>
            <li>{state.SchoolID}</li>
            <li>{state.FirstName}</li>
            <li>{state.LastName}</li>
            <li>{state.Birthday}</li>
            <li>{state.UserLevel}</li>
        </ul>
      </>
    );
}