import { Link } from 'react-router-dom'
function Header({type}) {
  return (
    <div className="header-container">
        <h1>{(type === 'register' || type === 'login') ? type: 'Home'}</h1>
        <div className="link_containers">
           <Link className='pathRoute' to="/">Home</Link >
           <Link className='pathRoute' to="/register">Register</Link >
           <Link className='pathRoute' to="/login">Login</Link >
        </div>
    </div>
  )
}


export default Header