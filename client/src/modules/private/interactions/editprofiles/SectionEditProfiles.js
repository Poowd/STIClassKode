import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Select } from '../../../components/Select';
import { Layout2 } from '../../../layout/Layout2';
import { Modal1 } from '../../../components/modals/Modal1';
import ErrorIcon from '../../../../assets/icons/warning.png'
import DeleteIcon from '../../../../assets/icons/delete.png'


export function SectionEditProfiles() {
  const bootstrap = require('bootstrap')
  const {state} = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  
  const year = ["None", "First Year", "Second Year", "Third Year", "Fourth Year"]
  const semester = ["None", "First Semester", "Second Semester"]

  const [editsection, setEditSection] = useState({
    SCTID: state.SCTID,
    SectionName: state.SectionName,
    Population: state.Population,
    Year: state.Year,
    Semester: state.Semester,
    PRGID: state.PRGID,
  })
  const [modalcontent, setModalContent] = useState({
    Title: '',
    SubTitle: '',
  })
  const EditSection = (e) => {
    e.preventDefault()
    if (editsection.Population > 0) {
      if (editsection.Population <= 45) {
        axios.post('http://localhost:8081/update-section', editsection)
        .then(res => {
          try {
            navigate("/section")
          } catch(err) {
            console.log(err)
          }
        })
        .catch(err => console.log(err))
      } else {
        setModalContent({
          Title: "Exceeded Limit (45)",
          SubTitle: "Make it right!",
        })
        getModal().show()
      }
    } else {
      setModalContent({
        Title: "Invalid Input",
        SubTitle: "Make it right!",
      })
      getModal().show()
    }
  }

  const [deletecourse, setDeleteCourse] = useState({
    SCTID: state.SCTID,
    ConfirmationName: '',
  })
  const DeleteCourse = () => {
    if (editsection.SectionName == deletecourse.ConfirmationName) {
      axios.post('http://localhost:8081/delete-section', deletecourse)
      .then(res => {
        try {
          navigate("/section")
          window.location.reload(true);
        } catch(err) {
          console.log(err)
        }
      })
      .catch(err => console.log(err))
    } else {
      console.log("not?")
    }
  }
  const [program, setProgram] = useState([])
  axios.post('http://localhost:8081/display-input-program')
    .then( res => {
      try {
        setProgram(res.data)
      } catch(err) {
        console.log(err)
      }
  })

  let modal = null;
  function getModal() {
    if (!modal) {modal = new bootstrap.Modal(document.getElementById('Modal'))}
    return modal
  }
  function toggleModal() {getModal().hide()}

  let DeleteModal = null
  function getDeleteModal() {
    if (!DeleteModal) {DeleteModal = new bootstrap.Modal(document.getElementById('DeleteModal'))}
    return DeleteModal
  } function toggleDeleteModal() {getDeleteModal().hide()}

  const handleChange = (e) => {
    setEditSection(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const handleChange1 = (e) => {
    setDeleteCourse(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  return (
    <>
      <Layout2
        form_status={ "You have successfully created a " + params.type }
        form_title={ "Insert " + params.type }
        form_content={ 
          <>
            <div className='d-flex gap-1 justify-content-end'>
              <Button
                class={"btn btn-secondary"} 
                type={ "button" }
                text={"Cancel"} 
                disabled={false}
                onClick={() => {navigate("/section")}}
              />
              <Button
                class={"btn btn-secondary"} 
                type={"button"}
                text={"Delete"} 
                disabled={false}
                onClick={() => {
                  setModalContent({
                    Title: "Yo, wanna delete this shit?",
                    SubTitle: "or Make it right?",
                  })
                  getDeleteModal().show()
                }}
              />
              <Button
                  class={ "btn btn-primary" } 
                  type={ "submit" }
                  text={ "Save" } 
                  disabled={ false }
                  onClick={ () => {console.log("Button Clicked!")} }
              />
            </div>
            <div>
              <div className="row align-items-start">
                <div className="col-lg-9">
                  <Input 
                    optional={<span id='errName' className='mb-0 text-danger'></span>}
                    title={ "SectionName" }
                    type={ "text" }
                    placeholder={ "SectionName" }
                    trigger={ handleChange }
                    name={ "SectionName" }
                    value={editsection.SectionName}
                    required
                  />
                </div>
                <div className="col-lg-3">
                  <Input 
                    optional={<span id='errPopulation' className='mb-0 text-danger'></span>}
                    title={ "Population" }
                    type={ "text" }
                    placeholder={ "Population" }
                    trigger={ handleChange }
                    name={ "Population" }
                    value={editsection.Population}
                    required
                  />
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <Select 
                    title={"Year"}
                    class={""}
                    name={"Year"}
                    trigger={handleChange}
                    options={<>{
                      year.map(option => ( 
                        option === editsection.Year ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      year.map(option => ( 
                        option != editsection.Year ?
                        <option key={option === 'None' ? '':option} value={option === 'None' ? '':option}> 
                          {option} 
                        </option>
                        :"" 
                      ))}
                    </>}
                    required
                  />
                </div>
                <div className="col-lg-6">
                  <Select 
                    title={"Semester"}
                    class={""}
                    name={"Semester"}
                    trigger={handleChange}
                    options={<>{
                      semester.map(option => ( 
                        option === editsection.Semester ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      semester.map(option => ( 
                        option != editsection.Semester ?
                        <option key={option === 'None' ? '':option} value={option === 'None' ? '':option}> 
                          {option} 
                        </option>
                        :"" 
                      ))}
                    </>}
                    required
                  />
                </div>
              </div>

              <Select 
                title={"Program"}
                class={""}
                name={"PRGID"}
                trigger={handleChange}
                options={<>{
                  program.map(option => ( 
                    option.PRGID === editsection.PRGID ?
                    <option key={option.PRGID} defaultValue={option.PRGID}> 
                      {option.ProgramName} 
                    </option> 
                    :""
                  ))}{
                    program.map(option => ( 
                      option.PRGID != editsection.PRGID ?
                      <option key={option.PRGID} value={option.PRGID}> 
                        {option.ProgramName} 
                      </option>
                      :"" 
                    ))}
                </>}
                required
              />
            </div>
            <Modal1 
              id={"Modal"} 
              class={"text-warning"}
              icon={ErrorIcon}
              title={modalcontent.Title}
              subtitle={modalcontent.SubTitle}
              neutralresponse={"Understood"}
            /> 
          </>
        }
        content={
          <Modal1 
            id={"DeleteModal"}
            class={"text-danger"}
            icon={DeleteIcon}
            title={modalcontent.Title}
            subtitle={modalcontent.SubTitle}
            action={
              <>
                <Input 
                  type={ "text" }
                  class={"text-center"}
                  placeholder={"Type '" + editsection.SectionName + "' to confirm."}
                  trigger={ handleChange1 }
                  name={ "ConfirmationName" }
                  required
                />
                <Button
                  class={ "btn btn-primary mb-1" } 
                  type={ "submit" }
                  text={ "Continue" } 
                  disabled={ false }
                  onClick={DeleteCourse}
                />
              </>
            }
            neutralresponse={"Cancel"}
          />
        }
        navigate={() => {navigate("/section")}}
        form_submit={ EditSection }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>SectionName:</span> {editsection.SectionName}</p>
          <p><span className='fs-6 text-secondary d-block'>Population:</span> {editsection.Population}</p>
          <p><span className='fs-6 text-secondary d-block'>Year:</span> {editsection.Year}</p>
          <p><span className='fs-6 text-secondary d-block'>Semester:</span> {editsection.Semester}</p>
          <p><span className='fs-6 text-secondary d-block'>Program:</span> {
            program.map(option => ( 
              option.PRGID === editsection.PRGID ?
              <span key={option.PRGID}>{option.ProgramName}</span>
              :""
            ))
          }</p>
        </>}
      />
    </>
  )
}