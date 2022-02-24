import { useAuth } from '../../context'
const NavBar = () => {
  const [loggedIn, _] = useAuth()

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-primary flex-sm-nowrap flex-wrap">
      <div className="container-fluid">
        <span className="navbar-brand flex-grow-1">Sample Application</span>
        {loggedIn && (
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar
