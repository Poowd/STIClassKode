import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import clock from '../../assets/icons/clock.png'
import document from '../../assets/icons/document.png'
import exclamation from '../../assets/icons/exclamation.png'
import home from '../../assets/icons/home.png'
import user from '../../assets/icons/user.png'
import users from '../../assets/icons/users.png'
import avatar from '../../assets/imgs/placeholderimages/avatar.png'
import { Button } from './Button';
import { ConfirmModal } from './ConfirmModal';
import logoutIcon from '../../assets/icons/switch.png'

export class Sidebar extends React.Component {
    render() {
      const handleLogout = () => {
        axios.post('http://localhost:8081/logout')
        .then(res => {
          if (res.data.Status === "Success") {
            window.location.reload(true);
          } else {
            alert("Error");
          }
        })
        .catch(err => console.log(err))
      }
      return (
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 min-vh-95 overflow" style={{overflow:"hidden", text_overflow: "ellipsis", white_space: "nowrap"}}>
            <Link to='/' className="d-flex align-items-center mb-md-0 me-md-auto text-decoration-none mt-3 py-3"> {/* Title */}
              <span className="fs-5 d-none d-sm-inline">
                <strong>STI College Muñoz-EDSA</strong>
              </span>
            </Link>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item"> {/* Home */}
                    <Link to='/' className="nav-link align-middle px-0">
                      <img src={ home } width="15" height="15" />
                      <span className="ms-2 d-none d-sm-inline">
                        Dashboard
                      </span>
                    </Link>
                </li>
                {
                  this.props.File_Management === "True" ?
                    <li>{/* Dropdown */}
                      <a href="#submenu0" data-bs-toggle="collapse" className="nav-link px-lg-0 align-middle"> {/* Entities */}
                        <img src={ home } width="15" height="15" />
                        <span className="ms-2 d-none d-sm-inline">
                          File Maintainance
                        </span>
                      </a>
                      <ul className="collapse show nav flex-column" id="submenu0" data-bs-parent="#menu">
                          <li className="w-100">
                              <Link to='/program' className="nav-link">
                                <img src={ document } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Program
                                </span>
                              </Link>
                          </li>
                          {/* <li className="w-100">
                              <Link to='/student' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Student
                                </span>
                              </Link>
                          </li> */}
                          <li className="w-100">
                              <Link to='/section' className="nav-link">
                                <img src={ users } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Section
                                </span>
                              </Link>
                          </li>
                          <li className="w-100">
                              <Link to='/course' className="nav-link">
                                <img src={ document } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Course
                                </span>
                              </Link>
                          </li>
                          <li className="w-100"> 
                              <Link to='/schoolfacility' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  School Facility
                                </span>
                              </Link>
                          </li>
                          <li className="w-100"> 
                              <Link to='/facultymember' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Faculty Member
                                </span>
                              </Link>
                          </li>
                        </ul>
                  </li>
                  : ""
                }
                <li>{/* Dropdown */}
                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-lg-0 align-middle"> {/* Entities */}
                      <img src={ clock } width="15" height="15" />
                      <span className="ms-2 d-none d-sm-inline">
                        Schedules
                      </span>
                    </a>
                    <ul className="collapse show nav flex-column" id="submenu2" data-bs-parent="#menu">
                        <li className="w-100">
                            <Link to='/schedule' className="nav-link">
                              <img src={ document } width="15" height="15" />
                              <span className="d-none d-sm-inline px-2">
                                Schedule
                              </span>
                            </Link>
                        </li>
                        {
                          this.props.File_Management === "True" ?
                          <>
                            <li className="w-100">
                              <Link to='/' className="nav-link">
                                <img src={ document } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2">
                                  Section
                                </span>
                              </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/' className="nav-link">
                                  <img src={ document } width="15" height="15" />
                                  <span className="d-none d-sm-inline px-2">
                                    Faculty Member
                                  </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/' className="nav-link">
                                  <img src={ document } width="15" height="15" />
                                  <span className="d-none d-sm-inline px-2">
                                    School Facility
                                  </span>
                                </Link>
                            </li>
                          </>
                          : ""
                        }
                      </ul>
                </li>
                <li> {/* Dropdown */}
                    <a href="#submenu3" data-bs-toggle="collapse" className="nav-link px-lg-0 align-middle"> {/* Free Space */}
                      <img src={ exclamation } width="15" height="15" />
                      <span className="ms-2 d-none d-sm-inline">
                        Faculty Locator
                      </span>
                    </a>
                    <ul className="collapse show nav flex-column" id="submenu3" data-bs-parent="#menu">
                        <li className="w-100"> {/* Free Space */}
                            <Link to='/' className="nav-link">
                              <img src={ exclamation } width="15" height="15" />
                              <span className="d-none d-sm-inline px-2">
                                Locator
                              </span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
            
            <hr/>
            

            <div className="dropup dropup my-3">
              <button className="btn btn-link dropdown-toggle d-flex align-items-center p-0" type="button" data-bs-toggle="dropdown" aria-expanded="false" data-bs-offset="45,10">
                <img src={ avatar } alt="hugenerd" width="30" height="30" className="rounded-circle" style={{objectFit:"cover"}}/>

                <span className="d-none d-sm-inline ms-3 me-1">{ this.props.name }</span>
              </button>
              <ul className="dropdown-menu">
                <Link to={ "/"} className='dropdown-item'>
                  <li>Action</li>
                </Link>
                <li><hr className="dropdown-divider" /></li>
                <li>
                <div className='d-flex align-items-center'>
                  <Button
                    class={ "btn btn-danger" } 
                    text={ "Logout" } 
                    disabled={ false }
                    onClick={ handleLogout }
                  />
                </div>
                </li>
              </ul>
            </div>
        </div>
      )
    }
  }