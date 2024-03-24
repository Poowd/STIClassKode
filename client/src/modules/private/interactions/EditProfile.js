//dependencies
import React from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { StudentEditProfiles } from './editprofiles/StudentEditProfiles';
import { CoachEditProfiles } from './editprofiles/CoachEditProfiles';
import { SchoolFacilityEditProfiles } from './editprofiles/SchoolFacilityEditProfiles';
import { SectionEditProfiles } from './editprofiles/SectionEditProfiles';
import { CourseEditProfiles } from './editprofiles/CourseEditProfiles';
import { ProgramEditProfiles } from './editprofiles/ProgramEditProfiles';
import { UserEditProfiles } from "./editprofiles/UserEditProfiles";
//css
//routes
//components
export function EditProfile() {
  const navigate = useNavigate();
  const params = useParams();
  return ( 
    <>
      <main className="p-3 overflow-auto" style={{height: "85vh"}}>
        <header>
          <h2>{"Edit " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</h2>
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb fs-6 ps-1">
              <li className="breadcrumb-item"><Link to={params.type === 'user' ? "/" : "/" + params.type}>{params.type.substring(0, 1).toUpperCase() + params.type.substring(1)}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{"Insert " + params.type.substring(0, 1).toUpperCase() + params.type.substring(1) + " / " + params.id}</li>
              </ol>
          </nav>
          <hr />
        </header>
        { params.type === "student" ? <StudentEditProfiles /> : "" }
        { params.type === "coach" ? <CoachEditProfiles /> : "" }  
        { params.type === "schoolfacility" ? <SchoolFacilityEditProfiles /> : "" }  
        { params.type === "section" ? <SectionEditProfiles /> : "" } 
        { params.type === "course" ? <CourseEditProfiles /> : "" } 
        { params.type === "program" ? <ProgramEditProfiles /> : "" } 
        { params.type === "user" ? <UserEditProfiles /> : "" } 
      </main>
    </>
  )}