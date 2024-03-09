import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';

export function SchoolFacilityProfiles() {
    let navigate = useNavigate();
    const params = useParams();
    let { state } = useLocation();

    return (
      <>
        <h1>View { params.id }</h1>
        <ul>
            <li>{state.Entity}</li>
            <li>{state.SchoolFacilityID}</li>
            <li>{state.Name}</li>
            <li>{state.Capacity}</li>
            <li>{state.Type}</li>
            <li>{state.Building}</li>
        </ul>
      </>
    );
}