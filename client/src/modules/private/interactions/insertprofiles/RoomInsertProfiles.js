import axios from 'axios'
import React, { useState } from "react"
import { useLocation, useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';
import { Layout2 } from '../../../layout/Layout2';
import { Select } from '../../../components/Select';

export function RoomInsertProfiles() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const floor = ['None', 'First Floor', 'Second Floor', 'Third Floor']
  const building = ['None', 'Main', 'Annex-A', 'Annex-B']
  const type = ['None', 'Regular Room', 'Laboratory', 'Audio Visual Room', 'Practical Area', 'Others']
  const x = ''
  const y = ''


  //---
  const handleChange = (e) => {
    setAddRoom(prev => ({
      ...prev,
      [ e.target.name ]: e.target.value,
  }))
}
  const onChanges = (e) => {
    setAddRoom({
      RoomName: addroom.Building
    })
  }

  const [addroom, setAddRoom] = useState({
    RMID: '',
    RoomName: '',
    Capacity: '',
    Type: '',
    Building: '',
    Floor: '',
    DateCreated: '',
  })
  const AddRoom = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8081/create-room', addroom)
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
                  class={ "btn btn-primary" } 
                  type={ "submit" }
                  text={ "Save" } 
                  disabled={ false }
                  onClick={ () => {console.log("Button Clicked!")} }
              />
            </div>
            <div>
              <div className="row align-items-start">
                <div className="col-lg-3">
                  <Input 
                    title={ "Capacity" }
                    type={ "text" }
                    placeholder={ "Capacity" }
                    trigger={ handleChange }
                    name={ "Capacity" }
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
                        option === addroom.Type ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      type.map(option => ( 
                        option != addroom.Type ?
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
              <div className="row align-items-start">
                <div className="col-lg-6">
                  <Select 
                    title={"Building"}
                    class={""}
                    name={"Building"}
                    trigger={handleChange}
                    options={<>{
                      building.map(option => ( 
                        option === addroom.Building ?
                        <option key={option} defaultValue={option === 'None' ? '':option}> 
                          {option} 
                        </option> 
                        :""
                      ))}{
                      building.map(option => ( 
                        option != addroom.Building ?
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
                    title={"Floor"}
                    class={""}
                    name={"Floor"}
                    trigger={handleChange}
                    options={<>{
                        floor.map(option => ( 
                          option === addroom.Floor ?
                          <option key={option} defaultValue={option === 'None' ? '':option}> 
                            {option} 
                          </option> 
                          :""
                        ))}{
                        floor.map(option => ( 
                          option != addroom.Floor ?
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
              <Input 
                title={ "RoomName" }
                optional={"Optional (Except Laboratory)"}
                type={ "text" }
                placeholder={ "RoomName" }
                trigger={ handleChange }
                name={ "RoomName" }
                value={addroom.RoomName}
                required={addroom.Type === 'Laboratory' ? true : false}
              />
            </div>
          </>
        }
        navigate={() => {navigate("/room")}}
        form_submit={ AddRoom }
        card_content={<>
          <p><span className='fs-6 text-secondary d-block'>RoomName:</span> {addroom.RoomName}</p>
          <p><span className='fs-6 text-secondary d-block'>Capacity:</span> {addroom.Capacity}</p>
          <p><span className='fs-6 text-secondary d-block'>Type:</span> {addroom.Type}</p>
          <p><span className='fs-6 text-secondary d-block'>Building:</span> {addroom.Building}</p>
          <p><span className='fs-6 text-secondary d-block'>Floor:</span> {addroom.Floor}</p>
        </>}
      />
    </>
  )
}