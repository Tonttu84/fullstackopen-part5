

const User = ({ user, handleLogout }) => {



  if (!user) return null

  return (
    <div >
      {user.name} logged in<button onClick={handleLogout}>logout</button>
      
    </div>
  )
}



export default User