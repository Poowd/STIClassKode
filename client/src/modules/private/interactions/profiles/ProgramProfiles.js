import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Layout5 } from "../../../layout/Layout5";
import avatar from "../../../../assets/imgs/placeholderimages/avatar.png"

export function ProgramProfiles() {
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
              <h5>{state.ProgramCode}</h5>
              <h3 className="card-title">{state.ProgramName}</h3>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><span className='text-secondary'>Abbrev: </span>{state.Abbrev}</li>
                  <li className="list-group-item"><span className='text-secondary'>Description: </span>{state.Description}</li>
                  <li className="list-group-item"><span className='text-secondary'>Department: </span>{state.DPTID}</li>
                  <li className="list-group-item"><span className='text-secondary'>DateCreated: </span>{state.DateCreated}</li>
                </ul>
            </div>
          </div>
        }
        col_2_2={
          <img src={avatar} className="custom-image" alt="..."  style={{aspectRatio: '9/16'}} />
        }
      />
    </>
  );
}