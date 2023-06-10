import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <div>
          <nav>
              <ul>
                  <li>
                      <Link to="/">Supplies List</Link>
                  </li>
                   <li>
                      <Link to="/add">Add Supplies</Link>
                  </li>
                   <li>
                      <Link to="/edit">Edit Supplies</Link>
                  </li>
              </ul>
      </nav>
    </div>
  )
}

export default NavBar
