import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'


const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = ()=>{
    setCookies("access_token", "");
    window.localStorage.removeItem("userId");
    navigate("/auth")
  }
  return (
    <div className = "z-10 sticky top-0 w-screen h-[86px] bg-gradient-to-b from-navbar text-white flex flex-row justify-between items-center m-0">
      <div className = "flex flex-row space-x-[48px] items-center px-[24px]">
        <div className ="h-[54px] w-[54px] items-center bg-logo"/>
        <Link to="/">Home</Link>
        <Link to="/topicpage">Topics</Link>
        <Link to="/flash">Mixed Practice</Link>
      </div>
      <div  className="rounded-full bg-logoutred py-2 px-3 mx-[24px]">
        {!cookies.access_token ? 
          ( <Link to="/auth">Login</Link> ) :
          ( <button onClick={logout}>Logout</button> )
        }
      </div>
      
    </div>
  )
}

export default Navbar