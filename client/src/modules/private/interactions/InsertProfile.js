//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentInsertProfiles } from './insertprofiles/StudentInsertProfiles';
import { FacultyMemberInsertProfiles } from './insertprofiles/FacultyMemberInsertProfiles';
import { SchoolFacilityInsertProfiles } from './insertprofiles/SchoolFacilityInsertProfiles';
import { SectionInsertProfiles } from './insertprofiles/SectionInsertProfiles';
import { CourseInsertProfiles } from './insertprofiles/CourseInsertProfiles';
import { ProgramInsertProfiles } from './insertprofiles/ProgramInsertProfiles';
import { UserInsertProfiles } from "./insertprofiles/UserInsertProfiles";
import { Button } from "../../components/Button"
import { ConfirmModal } from '../../components/ConfirmModal'
import warningIcon from '../../../assets/icons/warning.png'
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