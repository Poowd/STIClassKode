import { Link } from "react-router-dom";
import './Sidebar.css';

export function Sidebar() {
    return (
        <nav className="sidebar">
          <ul>
            <li><Link to='/'  >Home</Link></li>
            <li>
              <details open>
                <summary>Scheduling</summary>
                <ul>
                  <li><Link to='/academicyear'  >Academic Year</Link></li>
                  {/* <li><Link to='/curriculum'  >Curriculum</Link></li> */}
                  <li><Link to='/section'  >Section</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
    );
  }
  
  