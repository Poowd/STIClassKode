//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentProfiles } from '../components/profiles/StudentProfiles';
import { FacultyMemberProfiles } from '../components/profiles/FacultyMemberProfiles';
import { SchoolFacilityProfiles } from '../components/profiles/SchoolFacilityProfiles';
import { SectionProfiles } from '../components/profiles/SectionProfiles';
import { CourseProfiles } from '../components/profiles/CourseProfiles';
import { ProgramProfiles } from '../components/profiles/ProgramProfiles';
import { UserProfiles } from "../components/profiles/UserProfiles";
import { Button } from "../components/Button"
import { ConfirmModal } from '../components/ConfirmModal'
import logout from '../../assets/icons/switch.png'
//css
//routes
//components
export function ViewProfile() {
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

        { params.type === "student" ? <StudentProfiles /> : "" }
        { params.type === "facultymember" ? <FacultyMemberProfiles /> : "" }  
        { params.type === "schoolfacility" ? <SchoolFacilityProfiles /> : "" }  
        { params.type === "section" ? <SectionProfiles /> : "" } 
        { params.type === "course" ? <CourseProfiles /> : "" } 
        { params.type === "program" ? <ProgramProfiles /> : "" } 
        { params.type === "user" ? <UserProfiles /> : "" } 
      </main>
    </>
  )}