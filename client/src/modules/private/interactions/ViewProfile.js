//dependencies
import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import { StudentProfiles } from './profiles/StudentProfiles';
import { FacultyMemberProfiles } from './profiles/FacultyMemberProfiles';
import { SchoolFacilityProfiles } from './profiles/SchoolFacilityProfiles';
import { SectionProfiles } from './profiles/SectionProfiles';
import { CourseProfiles } from './profiles/CourseProfiles';
import { ProgramProfiles } from './profiles/ProgramProfiles';
import { UserProfiles } from "./profiles/UserProfiles";
import { Button } from "../../components/Button"
import { ConfirmModal } from '../../components/ConfirmModal'
import logout from '../../../assets/icons/switch.png'
import { ScheduleProfiles } from "./profiles/ScheduleProfiles";
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
                onClick={ () => navigate(-1) }
        />
        
        <hr />

        { params.type === "student" ? <StudentProfiles /> : "" }
        { params.type === "facultymember" ? <FacultyMemberProfiles /> : "" }  
        { params.type === "schoolfacility" ? <SchoolFacilityProfiles /> : "" }  
        { params.type === "section" ? <SectionProfiles /> : "" } 
        { params.type === "course" ? <CourseProfiles /> : "" } 
        { params.type === "program" ? <ProgramProfiles /> : "" } 
        { params.type === "user" ? <UserProfiles /> : "" } 
        { params.type === "schedule" ? <ScheduleProfiles /> : "" } 
      </main>
    </>
  )}