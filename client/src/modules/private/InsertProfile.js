//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentInsertProfiles } from '../components/insertprofiles/StudentInsertProfiles';
import { FacultyMemberInsertProfiles } from '../components/insertprofiles/FacultyMemberInsertProfiles';
import { SchoolFacilityInsertProfiles } from '../components/insertprofiles/SchoolFacilityInsertProfiles';
import { SectionInsertProfiles } from '../components/insertprofiles/SectionInsertProfiles';
import { CourseInsertProfiles } from '../components/insertprofiles/CourseInsertProfiles';
import { ProgramInsertProfiles } from '../components/insertprofiles/ProgramInsertProfiles';
import { UserInsertProfiles } from "../components/insertprofiles/UserInsertProfiles";
import { Button } from "../components/Button"
import { ConfirmModal } from '../components/ConfirmModal'
import logout from '../../assets/icons/switch.png'
//css
//routes
//components
export function InsertProfile() {
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

        { params.type === "student" ? <StudentInsertProfiles /> : "" }
        { params.type === "facultymember" ? <FacultyMemberInsertProfiles /> : "" }  
        { params.type === "schoolfacility" ? <SchoolFacilityInsertProfiles /> : "" }  
        { params.type === "section" ? <SectionInsertProfiles /> : "" } 
        { params.type === "course" ? <CourseInsertProfiles /> : "" } 
        { params.type === "program" ? <ProgramInsertProfiles /> : "" } 
        { params.type === "user" ? <UserInsertProfiles /> : "" } 
      </main>
    </>
  )}