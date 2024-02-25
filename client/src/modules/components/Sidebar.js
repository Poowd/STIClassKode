import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import logo from '../../assets/icons/calendar.png'

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
        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link to='/' className="d-flex align-items-center mb-md-0 me-md-auto text-white text-decoration-none mt-3 py-3"> {/* Title */}
              <span className="fs-5 d-none d-sm-inline">
                STI College Muñoz-EDSA {/* Editable Text */}
              </span>
            </Link>
            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                <li className="nav-item"> {/* Home */}
                    <Link to='/' className="nav-link align-middle px-0">
                      <img src={logo} width="35" height="35" />
                      <span className="ms-1 d-none d-sm-inline">
                        Home {/* Editable Text */}
                      </span>
                    </Link>
                </li>
                <li>{/* Dropdown */}
                    <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle"> {/* Entities */}
                      <img src={logo} width="35" height="35" />
                      <span className="ms-1 d-none d-sm-inline">
                        Entities {/* Editable Text */}
                      </span>
                    </a>
                    <ul className="collapse show nav flex-column ms-1" id="submenu1" data-bs-parent="#menu">
                        <li className="w-100"> {/* Section */}
                            <Link to='/section' className="nav-link">
                              <img src={logo} width="35" height="35" />
                              <span className="d-none d-sm-inline px-2">
                                Section {/* Editable Text */}
                              </span>
                            </Link>
                        </li>
                        <li className="w-100"> {/* Student */}
                            <Link to='/student' className="nav-link">
                              <img src={logo} width="35" height="35" />
                              <span className="d-none d-sm-inline px-2">
                                Student {/* Editable Text */}
                              </span>
                            </Link>
                        </li>
                        <li className="w-100"> {/* Course */}
                            <Link to='/course' className="nav-link">
                              <img src={logo} width="35" height="35" />
                              <span className="d-none d-sm-inline px-2">
                                Course {/* Editable Text */}
                              </span>
                            </Link>
                        </li>
                        <li className="w-100"> {/* FacultyMember */}
                            <Link to='/facultymember' className="nav-link">
                              <img src={logo} width="35" height="35" />
                              <span className="d-none d-sm-inline px-2">
                                Faculty Member {/* Editable Text */}
                              </span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li> {/* Dropdown */}
                    <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle"> {/* Free Space */}
                      <img src={logo} width="35" height="35" />
                      <span className="ms-1 d-none d-sm-inline">
                        Not Available {/* Editable Text */}
                      </span>
                    </a>
                    <ul className="collapse show nav flex-column ms-1" id="submenu2" data-bs-parent="#menu">
                        <li className="w-100"> {/* Free Space */}
                            <Link to='/section' className="nav-link">
                              <img src={logo} width="35" height="35" />
                              <span className="d-none d-sm-inline px-2">
                                Not Available {/* Editable Text */}
                              </span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="nav-item"> {/* Free Space */}
                    <Link to='/' className="nav-link align-middle px-0">
                      <img src={logo} width="35" height="35"/>
                      <span className="ms-1 d-none d-sm-inline">
                        Home {/* Editable Text */}
                      </span>
                    </Link>
                </li>
            </ul>
            <hr/>
            <div className="dropdown pb-4">
                <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/341612198_9114909431915406_7864035034026480621_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=efb6e6&_nc_eui2=AeG6qaAQNLtUTAYRjz43N2FKh9Sybz6zRUOH1LJvPrNFQy_QR4mfX3_ddYP8BoKYLjULdgOperYTuahgS8hXBnsn&_nc_ohc=_gKXfmJ-aa4AX_Qleaa&_nc_ht=scontent.fcrk1-1.fna&cb_e2o_trans=q&oh=00_AfDxLPRwLcdTHVVcyrSXDgBhcMU_fzjqGaJU3mYBYpWsVg&oe=65DEB585" alt="hugenerd" width="30" height="30" className="rounded-circle"/>
                    <span className="d-none d-sm-inline mx-1">{ this.props.name }</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}>Sign out</a></li>
                </ul>
            </div>
        </div>
      )
    }
  }