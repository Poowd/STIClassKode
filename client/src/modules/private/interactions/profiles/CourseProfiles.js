import React from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Layout4 } from "../../../layout/Layout4";
import { Layout3 } from "../../../layout/Layout3";
import { Layout5 } from "../../../layout/Layout5";

export function CourseProfiles() {
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
                <h5>{state.CourseCode}</h5>
                <h3 className="card-title">{state.CourseName}</h3>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><span className='text-secondary'>Units: </span>{state.Units}</li>
                    <li className="list-group-item"><span className='text-secondary'>Lesson Type: </span>{state.LessonType}</li>
                    <li className="list-group-item"><span className='text-secondary'>Program: </span>{state.Program}</li>
                    <li className="list-group-item"><span className='text-secondary'>Date Created: </span>{state.DateCreated}</li>
                  </ul>
              </div>
            </div>
          }
          col_2_2={
            <img src="https://i.pinimg.com/236x/e5/24/d1/e524d1d14252daa2b81366a854a3f642.jpg" className="custom-image" alt="..." />
          }
        />
      </>
    );
}