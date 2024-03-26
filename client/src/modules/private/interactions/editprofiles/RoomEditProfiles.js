import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function RoomEditProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const floor = ['First Floor', 'Second Floor', 'Third Floor']
  const building = ['Main', 'Annex-A', 'Annex-B']
  const type = ['Regular Room', 'Laboratory', 'Audio Visual Room', 'Practical Area', 'Others']

  //---
  const handleChange = (e) => {
    setEditRoom(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value
  }))}

  const [editroom, setEditRoom] = useState({
    RMID: state.RMID,
    RoomName: state.RoomName,
    Capacity: state.Capacity,
    Type: state.Type,
    Building: state.Building,
    Floor: state.Floor,
    DateCreated: state.DateCreated,
  })
  const EditRoom = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/update-room', editroom)
    .then(res => {
      try {
        navigate("/room")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  const [deletecourse, setDeleteCourse] = useState({
    RMID: params.id,
  })
  const DeleteCourse = () => {
    axios.post('http://localhost:8081/delete-room', deletecourse)
    .then(res => {
      try {
        navigate("/room")
      } catch(err) {
        console.log(err)
      }
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Layout2
        form_status={ "You have successfully created a " + params.type }
        form_title={ "Edit " + params.type }
        form_content={ 
          <>
            <div className='d-flex gap-1 justify-content-end'>
              <Button
                class={"btn btn-secondary"} 
                text={"Cancel"} 
                disabled={false}
                onClick={() => {navigate("/room")}}
              />
              <Button
                class={"btn btn-secondary"} 
                text={"Delete"} 
                disabled={false}
                onClick={DeleteCourse}
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
              <Input 
                title={ "RoomName" }
                type={ "text" }
                placeholder={ "RoomName" }
                trigger={ handleChange }
                name={ "RoomName" }
                value={editroom.RoomName}
                required
              />
              <div className="row align-items-start">
                <div className="col-lg-3">
                  <Input 
                    title={ "Capacity" }
                    type={ "text" }
                    placeholder={ "Capacity" }
                    trigger={ handleChange }
                    name={ "Capacity" }
                    value={editroom.Capacity}
                    required
                  />
                </div>
                <div className="col-lg-9">
                  <Select 
                    title={"Type"}
                    class={""}
                    name={"Type"}
                    trigger={handleChange}
                    options={<>{
                      type.map(option => ( 
                        option === editroom.Type ?
                        <option key={option} defaultValue={option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                        type.map(option => ( 
                          option != editroom.Type ?
                          <option key={option} value={option}> 
                            {option} 
                          </option>
                          :"" 
                        ))}
                    </>}
                    required
                  />
                </div>
              </div>
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <Select 
                    title={"Building"}
                    class={""}
                    name={"Building"}
                    trigger={handleChange}
                    options={<>{
                      building.map(option => ( 
                        option === editroom.Building ?
                        <option key={option} defaultValue={option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                        building.map(option => ( 
                          option != editroom.Building ?
                          <option key={option} value={option}> 
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
                    title={"Floor"}
                    class={""}
                    name={"Floor"}
                    trigger={handleChange}
                    options={<>{
                      floor.map(option => ( 
                        option === editroom.Floor ?
                        <option key={option} defaultValue={option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                        floor.map(option => ( 
                          option != editroom.Floor ?
                          <option key={option} value={option}> 
                            {option} 
                          </option>
                          :"" 
                        ))}
                    </>}
                    required
                  />
                </div>
              </div>
            </div>
          </>
        }
        navigate={() => {navigate("/room")}}
        form_submit={ EditRoom }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>RoomName:</span> {editroom.RoomName}</p>
          <p><span className='fs-6 text-secondary d-block'>Capacity:</span> {editroom.Capacity}</p>
          <p><span className='fs-6 text-secondary d-block'>Type:</span> {editroom.Type}</p>
          <p><span className='fs-6 text-secondary d-block'>Building:</span> {editroom.Building}</p>
          <p><span className='fs-6 text-secondary d-block'>Floor:</span> {editroom.Floor}</p>
        </>}
      />
    </>
  )
}