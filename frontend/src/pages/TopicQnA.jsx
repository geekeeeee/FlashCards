import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BACKENDPORT } from "../config.js"
import axios from 'axios';
import Navbar from "../components/Navbar.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib, faForward, faLightbulb ,faStop, faEye } from '@fortawesome/free-solid-svg-icons'; 
import './general.css';


const TopicQnA = () => {
  const [flash, setFlash] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [qna, setQna] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updatedQues, setUpdatedQues] = useState('');
  const [updatedAns, setUpdatedAns] = useState('');
  const [create, setCreate] = useState(true);
  const [hoverId, setHoverId] = useState(null);
  const [toup, setToup] = useState(null)
  const [currTopic, setCurrTopic] = useState('');
  const {id} = useParams();


  const Flash = () => {
    const {id} = useParams();
    const [qap, setQap] = useState([]);
    const [idx, setIdx] = useState(0);
    const [qn, setqn] = useState("Press >> to Start");
    const [ans, setAns] = useState('');
    const [reveal, setReveal] = useState(false);

    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        let temp = array[j];
        array[j] = array[i]; 
        array[i] = temp ;
      }
      return array;
    }

    const setQnAarray = async () => {
      const port = `${BACKENDPORT}/cards/${id}`;

      try {
        const res = await axios.get(port);
        setQap(shuffle(res.data));
      } 
      catch (err){
        console.error('set qna array Cards error: ', err.message);
      }
    };
    
    const nextfn = () => {
      if(idx < qna.length){
        setReveal(false);
        setqn(qna[idx].question);
        setAns(qna[idx].answer);
        setIdx(idx+1);
      }
      else{
        // alert("Completed Flash Cards");
        setFlash(false);
      }
    }

    useEffect(()=>{
      setQnAarray()
    }, []);
    
    
    return (
      <div className = "flex flex-col justify-center items-center gap-3 text-white relative translate-y-20">
        <div className="h-[350px] w-[750px] overflow-y-scroll hidescrollbar bg-primary flex flex-col justify-center items-center rounded-lg drop-shadow-lg inset-5">
          <div className = " w-[700px] text-center text-[30px] text-wrap">{reveal ? ans : qn}</div>
          <div className='flex flex-row  gap-4 absolute bottom-[40px] '>
            <button
              onClick={() => {
                let temparray = [...ans];
                for(let i=0; i<temparray.length; i++){ 
                  temparray[i] = (Math.random() > 0.4 && temparray[i]!==' ') ? '_' : ans[i];
                }
                setAns(temparray);
                setReveal(!reveal);
                
              }}
              className=' h-[35px] w-[70px] border text-yellow-300 border-yellow-300 flex items-center justify-center rounded-full'>
                <FontAwesomeIcon icon={faLightbulb} />
            </button>
            <button onClick={ () =>{
              setAns(idx ? qna[idx-1].answer : "Reveal");
              setReveal(!reveal);
            }} className='z-10 h-[35px] w-[70px] flex items-center justify-center  text-green-400 border border-green-400 rounded-full'>
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
            setFlash(false);
          }} className="z-10 h-[50px] w-[100px] bg-logoutred rounded-lg  text-[30px]">
            <FontAwesomeIcon icon={faStop}/>
          </button>
        </div>
      </div>
    )
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const port = `${BACKENDPORT}/cards/${id}`;
    
    try {
      const userId = window.localStorage.getItem("userId");
      const res = await axios.post(port, {question, answer, userId});
      setQuestion('');
      setAnswer('');
      setQnAarray();

      // alert("QnA added");
    } catch (err) {
      console.error(err.message);
    }
  }
  
  const setQnAarray = async () => {
    const port = `${BACKENDPORT}/cards/${id}`;

    try {
      const res = await axios.get(port);
      setQna(res.data);
    } catch (err) {
      console.error('Get Cards error:', err.message);
    }
  };

  useEffect(() =>{
   setQnAarray();
  }, []);

  const topicNamefromId = async (id) =>{
    const port = `${BACKENDPORT}/topics/name/${id}`;
    
    try {
      const res = await axios.get(port);
      setCurrTopic(res.data);
      
    } catch (err) {
      console.error('TopicNamefromId:', err.message);
    }
  }

  topicNamefromId(id);

  const deleteCard = async (cardId) => {
    const port = `${BACKENDPORT}/cards/${cardId}`;
    try {
      const res = await axios.delete(port);
      setQnAarray();
    } catch (err) {
      console.error('Delete card error:', err.message);
    }
  };

  const updateCard = async (cardId) => {
    const port = BACKENDPORT + '/cards/' + cardId;

    try {
      const res = await axios.put(port, { question: updatedQues, answer: updatedAns });
      setQnAarray();
    } catch (err) {
      console.error('Update Cards error:', err.message);
    }
  };

  return (
    <div className="bg-filtered bg-cover bg-no-repeat min-h-screen min-w-screen p-0 m-0 flex flex-col justify-start items-center overflow-x-hidden">
      <Navbar/>

      <button onClick={() => setFlash(!flash)} 
      className ="z-10 p-0 m-0 text-white text-[35px] bg-logoutred rounded-md h-[50px] w-[50px] flex place-content-center drop-shadow-lg  fixed bottom-[70px] right-[70px]">
        {flash ? "✦" : " ►" }
      </button>
      
        {flash ? (
          <Flash/>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <button className="z-10 text-white text-[40px] bg-primary rounded-md h-[50px] w-[50px] p-0 m-0 flex place-content-center drop-shadow-lg  fixed bottom-[70px] right-[140px]" onClick={()=> setCreate(!create)}>
              {!create && (<h1 className="z-10 p-0 m-0 -translate-y-2">+</h1>)}
              {create && (<h1 className="z-10 p-0 m-0 -translate-y-2">⇮</h1>)}
            </button>
            <div className="text-white text-[30px]">
              <h3>{currTopic}</h3>
            </div>
            <div className="z-0 flex flex-row gap-4 p-10 flex-wrap place-content-center">
              {(qna.length > 0 ) && (
                qna.map((qa) => (
                  <div key={qa._id}
                  onMouseEnter={() =>
                    setHoverId(qa._id)
                  } 
                  onMouseLeave={() =>
                    setHoverId(null)
                  }
                  className="h-[180px] w-[300px] bg-primary flex flex-col items-center justify-between overflow-x-hidden overflow-y-scroll hidescrollbar text-white rounded-md drop-shadow-xl hover:drop-shadow-2xl m-0">
                    <div className='w-[300px] px-8 pt-8 flex flex-col items-start justify-center'>
                      <div className='text-[20px] w-[250px] text-wrap'>{qa.question}?</div>
                      <div className='text-[15px] w-[250px] text-wrap'>{qa.answer}</div>
                    </div>
                    {(hoverId===qa._id) && (
                      <div className="flex flex-row justify-between gap-6 m-5">
                        <button onClick={() => deleteCard(qa._id)}
                        className="rounded-full border border-white py-2 px-3 hover:bg-logoutred hover:border-transparent">
                          <FontAwesomeIcon icon={faTrash}/>
                        </button>
                        <button onClick={() =>{ setUpdateId(qa._id) ; setToup([qa.question , qa.answer])}}
                        className="rounded-full border border-white py-2 px-3 hover:bg-secondary hover:border-transparent">
                          <FontAwesomeIcon icon={faPenNib}/>
                        </button>
                      </div>
                    )}
                  </div>
                ))
            )}
            </div>
          
            {create && (
              <form onSubmit={onSubmit}
              className="z-10 fixed bottom-[70px] flex flex-row justify-between gap-5 text-black">
                <div className="flex flex-col gap-1 items-center justify-center">
                  <input
                      type="text"
                      onChange={(event) => setQuestion(event.target.value)}
                      value={question}
                      className="rounded-full p-2 w-[300px]"
                      placeholder='Question'
                  />
                  <div className='flex flex-row gap-2'>
                    <input
                        type="text"
                        onChange={(event) => setAnswer(event.target.value)}
                        value={answer}
                        className="rounded-full p-2 w-[300px]"
                        placeholder='Answer'
                    />
                    <button type="submit" className="z-10 text-white rounded-full border border-green-400 py-2 px-3 hover:bg-green-400">Create</button>
                  </div>
                </div>
              </form> 
            )}
            
            {!create && (
              <form onSubmit={(event) => updateCard(updateId)}  
              className="z-10 fixed bottom-[70px] flex flex-row justify-between gap-5 text-white">
                <div className='flex flex-col gap-1 items-center justify-center'>
                  <input
                    type="text"
                    value={updatedQues}
                    onChange={(event) => setUpdatedQues(event.target.value)}
                    className="rounded-full p-2 w-[300px] text-black"
                    placeholder = {toup==null ? "Select Component to be updated" : toup[0]}
                  />
                  <div className='flex flex-row gap-2'>
                    <input
                      type="text"
                      value={updatedAns}
                      onChange={(event) => setUpdatedAns(event.target.value)}
                      className="rounded-full p-2 w-[300px] text-black"
                      placeholder = {toup==null ? "Select Component to be updated" : toup[1]}
                    />
                    <button type="submit"
                    className="z-10 rounded-full border border-secondary py-2 px-3 hover:bg-secondary">
                      Update
                    </button>
                    <button onClick={() => {setUpdateId(null); setToup(null)}}
                    className="z-10 rounded-full border border-logoutred py-2 px-3 hover:bg-logoutred">
                      Cancel
                    </button>
                  </div>
                </div>
                
              </form>
            )}

          </div>
        )}  
        
    </div>
  );
  
}
export default TopicQnA
