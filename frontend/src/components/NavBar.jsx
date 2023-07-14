import { Link, useNavigate } from 'react-router-dom'

const NavBar = () => {
  const navigate = useNavigate()

  const logout = () => { 
    localStorage.setItem("login", "")
    localStorage.setItem("loginStatus", "Logged out successfully")
    navigate('/')
  }
  return (
    <div>
        <nav>
              <ul>
                  <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/list">Supplies List</Link>
                </li>
                <li>
                    <Link to="/add">Add Supplies</Link>
          </li>
          <li>
                    <Link to="/signin">Sign In</Link>
          </li>
          <li>
                    <Link to="/signup">Sign Up</Link>
              </li>
                <li className='logout' onClick ={logout}>Logout</li>
              
            </ul>
        </nav>
    </div>
  )
}

export default NavBar
