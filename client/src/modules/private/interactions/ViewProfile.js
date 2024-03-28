//dependencies
import React from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CoachProfiles, FacultyMemberProfiles } from './profiles/CoachProfiles';
import { SectionProfiles } from './profiles/SectionProfiles';
import { CourseProfiles } from './profiles/CourseProfiles';
import { ProgramProfiles } from './profiles/ProgramProfiles';
import { UserProfiles } from "./profiles/UserProfiles";
import { ScheduleProfiles } from "./profiles/ScheduleProfiles";
import { RoomProfiles } from "./profiles/RoomProfiles";
//css
//routes
//components
export function ViewProfile() {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <>
      <main className="p-3 overflow-auto" style={{height: "85vh"}}>
        <header>
          <h2>{"View " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</h2>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-6 ps-1">
                  <li className="breadcrumb-item"><Link to={params.type === 'user' ? "/" : "/" + params.type}>{params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{"View " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1) + " / " + params.id}</li>
              </ol>
          </nav>
          <hr />
        </header>
        { params.type === "coach" ? <CoachProfiles /> : "" }  
        { params.type === "room" ? <RoomProfiles /> : "" }  
        { params.type === "section" ? <SectionProfiles /> : "" } 
        { params.type === "course" ? <CourseProfiles /> : "" } 
        { params.type === "program" ? <ProgramProfiles /> : "" } 
        { params.type === "user" ? <UserProfiles /> : "" } 
        { params.type === "schedule" ? <ScheduleProfiles /> : "" } 
      </main>
    </>
  )}