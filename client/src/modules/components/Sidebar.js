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
        <div className="d-flex flex-column align-items-center align-items-sm-start px-4 pt-2" style={{overflow:"auto", text_overflow: "ellipsis", white_space: "nowrap", height: "100vh"}}>
              <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item"> {/* Home */}
                    <Link to='/' className="nav-link align-middle px-0">
                      <img src={ home } width="15" height="15" />
                      <span className="ms-2 d-none d-sm-inline text-light">
                        Dashboard
                      </span>
                    </Link>
                </li>
                {
                  this.props.File_Maintainance === "True" ?
                    <li>
                      <a href="#submenu0" data-bs-toggle="collapse" className="nav-link px-lg-0 align-middle"> {/* Entities */}
                        <img src={ home } width="15" height="15" />
                        <span className="ms-2 d-none d-sm-inline text-light">
                          File Maintainance
                        </span>
                      </a>
                      
                      <ul className="collapse show nav flex-column" id="submenu0" data-bs-parent="#menu">
                          <li className="w-100">
                              <Link to='/program' className="nav-link">
                                <img src={ document } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">Program</span>
                              </Link>
                          </li>
                          {/* <li className="w-100">
                              <Link to='/student' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">
                                  Student
                                </span>
                              </Link>
                          </li> */}
                          <li className="w-100">
                              <Link to='/section' className="nav-link">
                                <img src={ users } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">
                                  Section
                                </span>
                              </Link>
                          </li>
                          <li className="w-100">
                              <Link to='/course' className="nav-link">
                                <img src={ document } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">
                                  Course
                                </span>
                              </Link>
                          </li>
                          <li className="w-100"> 
                              <Link to='/schoolfacility' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">
                                  School Facility
                                </span>
                              </Link>
                          </li>
                          <li className="w-100"> 
                              <Link to='/coach' className="nav-link">
                                <img src={ user } width="15" height="15" />
                                <span className="d-none d-sm-inline px-2 text-light">
                                  Coach
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
                      <span className="ms-2 d-none d-sm-inline text-light">
                        Schedules
                      </span>
                    </a>
                    <ul className="collapse nav flex-column" id="submenu2" data-bs-parent="#menu">
                        <li className="w-100">
                            <Link to='/schedule' className="nav-link">
                              <img src={ document } width="15" height="15" />
                              <span className="d-none d-sm-inline px-2 text-light">
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
                                <span className="d-none d-sm-inline px-2 text-light">
                                  Section
                                </span>
                              </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/' className="nav-link">
                                  <img src={ document } width="15" height="15" />
                                  <span className="d-none d-sm-inline px-2 text-light">
                                    Faculty Member
                                  </span>
                                </Link>
                            </li>
                            <li className="w-100">
                                <Link to='/' className="nav-link">
                                  <img src={ document } width="15" height="15" />
                                  <span className="d-none d-sm-inline px-2 text-light">
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
                      <span className="ms-2 d-none d-sm-inline text-light">
                        Faculty Locator
                      </span>
                    </a>
                    <ul className="collapse  nav flex-column" id="submenu3" data-bs-parent="#menu">
                        <li className="w-100"> {/* Free Space */}
                            <Link to='/' className="nav-link">
                              <img src={ exclamation } width="15" height="15" />
                              <span className="d-none d-sm-inline px-2 text-light">
                                Locator
                              </span>
                            </Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
      )
    }
  }