import { Link } from 'react-router-dom'

const NavBar = () => {
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
              
            </ul>
        </nav>
    </div>
  )
}

export default NavBar
