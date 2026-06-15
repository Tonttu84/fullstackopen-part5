import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import Login from './Login'


const NavBar = ({setUser}) => 
{

     const padding = {
    padding: 5
  }

    return (
          <Router>
      <div>
        
        <Link style={padding} to="/login">login</Link>
        
      </div>

      <Routes>
        <Route path="/login" element={
          <Login setUser={setUser} />
        } />
        
        
      </Routes>
    </Router>
    )
}

export default NavBar