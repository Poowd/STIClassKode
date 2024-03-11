//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentEditProfiles } from './editprofiles/StudentEditProfiles';
import { FacultyMemberEditProfiles } from './editprofiles/FacultyMemberEditProfiles';
import { SchoolFacilityEditProfiles } from './editprofiles/SchoolFacilityEditProfiles';
import { SectionEditProfiles } from './editprofiles/SectionEditProfiles';
import { CourseEditProfiles } from './editprofiles/CourseEditProfiles';
import { ProgramEditProfiles } from './editprofiles/ProgramEditProfiles';
import { UserEditProfiles } from "./editprofiles/UserEditProfiles";
import { Button } from "../../components/Button"
import { ConfirmModal } from '../../components/ConfirmModal'
import warningIcon from '../../../assets/icons/warning.png'
//css
//routes
//components
export function EditProfile() {
  const navigate = useNavigate();
  const params = useParams();
  return ( 
    <>
      <main className="p-lg-5 p-3">
        <Button
          class={ "btn btn-secondary" } 
            text={ "Go Back" } 
              disabled={ false }
                onClick={ () => {} }
                  databstoggle="modal" 
                    databstarget="#back"
        />
        <ConfirmModal 
          id={ "back" }
          icon={ warningIcon }
          title={ "Go Back" }
          subtitle={ "Are you sure you want to go back?" }
          confirm={ () => navigate(-1) }
          textclass={ "text-warning" }
          btnclass={ "btn-warning" }
        />

        <hr />

        { params.type === "student" ? <StudentEditProfiles /> : "" }
        { params.type === "facultymember" ? <FacultyMemberEditProfiles /> : "" }  
        { params.type === "schoolfacility" ? <SchoolFacilityEditProfiles /> : "" }  
        { params.type === "section" ? <SectionEditProfiles /> : "" } 
        { params.type === "course" ? <CourseEditProfiles /> : "" } 
        { params.type === "program" ? <ProgramEditProfiles /> : "" } 
        { params.type === "user" ? <UserEditProfiles /> : "" } 
      </main>
    </>
  )}