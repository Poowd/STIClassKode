//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentEditProfiles } from '../components/editprofiles/StudentEditProfiles';
import { FacultyMemberEditProfiles } from '../components/editprofiles/FacultyMemberEditProfiles';
import { SchoolFacilityEditProfiles } from '../components/editprofiles/SchoolFacilityEditProfiles';
import { SectionEditProfiles } from '../components/editprofiles/SectionEditProfiles';
import { CourseEditProfiles } from '../components/editprofiles/CourseEditProfiles';
import { ProgramEditProfiles } from '../components/editprofiles/ProgramEditProfiles';
import { UserEditProfiles } from "../components/editprofiles/UserEditProfiles";
import { Button } from "../components/Button"
import { ConfirmModal } from '../components/ConfirmModal'
import logout from '../../assets/icons/switch.png'
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
                    databstarget="#confirmationModal"
        />
        <ConfirmModal 
          confirm_modal_icon={ logout }
            confirm_modal_title={ "Go Back" }
              confirm_modal_subtitle={ "Are you sure you want to go back?" }
                confirm_modal_confirm={ () => navigate(-1) }
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