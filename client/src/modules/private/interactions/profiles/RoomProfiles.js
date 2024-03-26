import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Layout5 } from "../../../layout/Layout5";

export function RoomProfiles() {
  let navigate = useNavigate();
  const params = useParams();
  let { state } = useLocation();

  return (
    <>
      <Layout5 
        page_title={"a"}
        col_2_1={
          <div className="card">
            <div className="card-body p-4">
              <h5>{"School Facility"}</h5>
              <h3 className="card-title">{state.RoomName}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><span className='text-secondary'>Capacity: </span>{state.Capacity}</li>
                  <li className="list-group-item"><span className='text-secondary'>Type: </span>{state.Type}</li>
                  <li className="list-group-item"><span className='text-secondary'>Building: </span>{state.Building}</li>
                  <li className="list-group-item"><span className='text-secondary'>Floor: </span>{state.Floor}</li>
                  <li className="list-group-item"><span className='text-secondary'>DateCreated: </span>{state.DateCreated}</li>
                </ul>
            </div>
          </div>
        }
        col_2_2={
          <img src={"https://hips.hearstapps.com/hmg-prod/images/bedroom-ideas-rupp-studiodmitchell-ruppstudio-parkave-06a-1675097820.jpg"} className="custom-image w-100" alt="..." style={{aspectRatio: '9/16'}} />
        }
      />
    </>
  );
}