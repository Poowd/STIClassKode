//dependencies
import React from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StudentInsertProfiles } from './insertprofiles/StudentInsertProfiles';
import { CoachInsertProfiles, FacultyMemberInsertProfiles } from './insertprofiles/CoachInsertProfiles';
import { SectionInsertProfiles } from './insertprofiles/SectionInsertProfiles';
import { CourseInsertProfiles } from './insertprofiles/CourseInsertProfiles';
import { ProgramInsertProfiles } from './insertprofiles/ProgramInsertProfiles';
import { UserInsertProfiles } from "./insertprofiles/UserInsertProfiles";
import { RoomInsertProfiles } from "./insertprofiles/RoomInsertProfiles";
//css
//routes
//components
export function InsertProfile() {
  const navigate = useNavigate();
  const params = useParams();
  return (  
    <>
      <main className="p-3 overflow-auto" style={{height: "85vh"}}>
        <header>
          <h2>{"Insert " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</h2>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-6 ps-1">
              <li className="breadcrumb-item"><Link to={params.type === 'user' ? "/" : "/" + params.type}>{params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{"Insert " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</li>
              </ol>
          </nav>
          <hr />
        </header>
        { params.type === "student" ? <StudentInsertProfiles /> : "" }
        { params.type === "coach" ? <CoachInsertProfiles /> : "" }  
        { params.type === "room" ? <RoomInsertProfiles /> : "" }  
        { params.type === "section" ? <SectionInsertProfiles /> : "" } 
        { params.type === "course" ? <CourseInsertProfiles /> : "" } 
        { params.type === "program" ? <ProgramInsertProfiles /> : "" } 
        { params.type === "user" ? <UserInsertProfiles /> : "" } 
      </main>
    </>
  )}