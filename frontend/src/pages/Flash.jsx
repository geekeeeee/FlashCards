import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKENDPORT } from "../config.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib, faForward, faLightbulb ,faStop, faEye } from '@fortawesome/free-solid-svg-icons'; 

const Flash = () => {
  const navigate = useNavigate();
  const [qna, setQna] = useState([]);
  const [idx, setIdx] = useState(0);
  const [qn, setqn] = useState('Press >> to start');
  const [ans, setAns] = useState('Reveal');
  const [reveal, setReveal] = useState(false);
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const setQnAarray = async () => {
    const userId = window.localStorage.getItem("userId");
    const port = `${BACKENDPORT}/cards/all/${userId}`;

    try {
      const res = await axios.get(port);
      setQna(shuffle(res.data));
    } 
    catch (err){
      console.error('set qna array Cards error: ', err.message);
    }
  };

  useEffect(()=>{
    setQnAarray();
  }, []);
  
  const nextfn = () => {
    if(idx < qna.length){
      setReveal(false);
      setqn(qna[idx].question);
      setAns(qna[idx].answer);
      setIdx(idx+1);
    }
    else{
      // alert("Completed Flash Cards");
      navigate("/topicpage");
    }
  }

  return (
    <div className="bg-filtered bg-no-repeat bg-cover min-h-screen min-w-screen p-0 m-0 flex flex-col justify-start items-center overflow-x-hidden">
      <Navbar/>

      <div className = "flex flex-col justify-center items-center gap-3 text-white relative translate-y-20">
          <div className="h-[350px] w-[750px] overflow-y-scroll hidescrollbar bg-primary flex flex-col justify-center items-center rounded-lg drop-shadow-lg inset-5">
            <p className = " w-[700px] text-center text-[30px] text-wrap">{reveal ? ans : qn}</p>
            <div className='flex flex-row  gap-4 absolute bottom-[40px] '>
              <button
              onClick={() => {
                let temparray = [...ans];
                for(let i=0; i<temparray.length; i++){ 
                  temparray[i] = (Math.random() > 0.4 && temparray[i]!=' ') ? '_' : ans[i];
                }
                setAns(temparray);
                setReveal(!reveal);
                // if(reveal) setAns(ans);
              }}
              className=' h-[35px] w-[70px] border text-yellow-300 border-yellow-300 flex items-center justify-center rounded-full'>
                <FontAwesomeIcon icon={faLightbulb} />
              </button>

              <button onClick={ () =>{
                setAns(idx ? qna[idx-1].answer : "Reveal");
                setReveal(!reveal);
              }} className='z-10 h-[35px] w-[70px]  flex items-center justify-center  text-green-400 border border-green-400 rounded-full'>
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>
          <div className='flex flex-row gap-5 '>
            <button onClick={nextfn} className="z-10 h-[50px] w-[100px] bg-logoutred rounded-lg text-[30px]">
              <FontAwesomeIcon icon={faForward}/>
            </button>
            <button onClick={()=>{
              setIdx(0);
              navigate("/topicpage");
            }} className="z-10 h-[50px] w-[100px] bg-logoutred rounded-lg  text-[30px]">
              <FontAwesomeIcon icon={faStop}/>
            </button>
          </div>
      </div>
    </div>
  )
}

export default Flash
