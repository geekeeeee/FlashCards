import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { BACKENDPORT } from '../config'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import Navbar from "../components/Navbar.jsx"
const Auth = () => {
  return (
    <div className='bg-hero min-h-screen'>
      <Navbar/>
      <div className="flex flex-row gap-4 place-content-center space-x-[217px] translate-y-5">
        <Login/>
        <Register/>
      </div>
    </div>
  )
}

const Login = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const onSubmit = async (event)=>{
    event.preventDefault();
    const port = BACKENDPORT + '/user/login';

    try{
      const res = await axios.post(port ,  {userName, password: passWord});
      if(!res.data.userId ){
        console.log(res);
        alert(res.data.message);
        navigate("/auth");
        setUserName('');
        setPassWord('');
        return;
      }
      console.log(res);
      setCookies("access_token", res.data.token);
      window.localStorage.setItem("userId", res.data.userId)

      navigate("/topicpage");

      // alert('Successful login');
      return;
    }
    catch(err){
      alert(err.message);
    }
  } 
  return <FormComp userName = {userName} setUserName={setUserName} passWord={passWord} setPassWord={setPassWord} submit="Login" onSubmit={onSubmit}/>;
}

const Register = () => {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');
  const onSubmit = async (event)=>{
    event.preventDefault();
    const port = BACKENDPORT + '/user/register';
    console.log(port);

    try{
      await axios.post(port ,  {userName, password: passWord});
      alert('Successful reg');
    }
    catch(err){
      alert(err.message);
    }
  } 

  return <FormComp userName = {userName} setUserName={setUserName} passWord={passWord} setPassWord={setPassWord} submit="Register" onSubmit={onSubmit} />;
}

const FormComp = ({userName, setUserName, passWord, setPassWord, submit, onSubmit}) => {
  return (
    <div className="h-[490px] w-[325px] bg-primary p-0 m-0 text-white rounded-[27px] drop-shadow-2xl  text-[18px] 
    ">
      <form onSubmit={onSubmit} className="flex flex-col items-center justify-around flex-wrap gap-[33px] translate-y-[50px]">
        <div className="h-[100px] w-[100px] rounded-full bg-authlogo p-0 m-0"/>
        <div className="flex flex-col justify-center items-center gap-[35px]">
          <input type="text" onChange={(event) => setUserName(event.target.value)} value= {userName} placeholder='Username'
          className="h-[54px] w-[250px] rounded-md bg-secondary py-0 px-4 placeholder:text-white"/>
          
          <input type="password" onChange={(event) => setPassWord(event.target.value)} placeholder='Password' value={passWord}
          className="h-[54px] w-[250px] bg-secondary rounded-md py-0 px-3  placeholder:text-white focus:border-primary"/>

          <button type="submit" className =' text-[20px] rounded-full border bg-white py-2 px-3 hover:bg-slate-100 text-secondary w-[180px] h-[54px]'>{submit}</button>
        </div>
      </form>
    </div>
  )
}
export default Auth
