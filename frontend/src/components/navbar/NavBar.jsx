import './navbar.css'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  //for hiding logout button when not logged in and sign in and sign up when logged in
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => { 
    const loginStatus = localStorage.getItem("login")
    setIsLoggedIn(loginStatus !== null && loginStatus !== "")
  }, [])


  const logout = () => { 
    localStorage.setItem("login", "")
    localStorage.setItem("loginStatus", "Logged out successfully")
    setIsLoggedIn(false)
    navigate('/')
  }

    return (
    <div className='nav'>
    
        <nav className={isMenuOpen ? "open-menu" : ""}>

           <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                ☰
          </div>
          
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
                {!isLoggedIn && <li className='signin'>
                    <Link to="/signin">Sign In</Link>
                </li>}
                {!isLoggedIn && <li className='signup'>
                    <Link to="/signup">Sign Up</Link>
                </li>}
                {isLoggedIn && <li className='logout'
                    onClick={logout}>Sign Out</li>}
            </ul>
      </nav>
    </div>          
  )
}

export default NavBar
