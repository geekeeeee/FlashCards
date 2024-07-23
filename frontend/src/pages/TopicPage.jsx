import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKENDPORT } from '../config';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons'; 
import './general.css'

const TopicPage = () => {
  const navigate = useNavigate(); 
  const [tpc, setTpc] = useState('');
  const [tpcArr, setTpcArr] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [toup, setToup] = useState(null)
  const [updatedName, setUpdatedName] = useState('');
  const [hoverId, setHoverId] = useState(null)
  const [create, setCreate] = useState(true);
  
  

  const setTopicArray = async () => {
    const userId = window.localStorage.getItem('userId');
    const port = BACKENDPORT + '/topics/' + userId;

    try {
      const res = await axios.get(port);
      setTpcArr(res.data);
    } catch (err) {
      console.error('Get Topics error:', err.message);
    }
  };

  useEffect(() => {
    setTopicArray();
  }, []);

  const deleteTpc = async (tId) => {
    const port = BACKENDPORT + '/topics/' + tId;

    try {
      const res = await axios.delete(port);
      setTopicArray();
      console.log(res);
    } catch (err) {
      console.error('Delete Topics error:', err.message);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const port = BACKENDPORT + '/topics';

    try {
      const userId = window.localStorage.getItem('userId');
      if (!userId) {
        alert('Please Login First');
        navigate('/auth')
        return;
      }

      const res = await axios.post(port, { userId, topicName: tpc });
      console.log(res);
      setTpc('');
      setTopicArray();
    } catch (err) {
      console.error(err.message);
    }
  };

  const updateTpc = async (tid, tc) => {
    const port = BACKENDPORT + '/topics/' + tid;

    try {
      const res = await axios.put(port, { topicName: tc });
      setTopicArray();
      console.log(res);
    } catch (err) {
      console.error('Update Topics error:', err.message);
    }
  };

  return (
    <div className='bg-filtered bg-cover bg-no-repeat min-h-screen p-0 m-0 flex flex-col justify-start items-center'>
      
      <Navbar/> 
  
      <div className="z-0 flex flex-row gap-4 p-10 flex-wrap place-content-center">
        {tpcArr.length > 0 && (
          tpcArr.map((topic) => (
            <div key={topic._id} onMouseEnter={() =>
              setHoverId(topic._id)
            } 
            onMouseLeave={() =>
              setHoverId(null)
            }
            className="h-[194px] w-[194px] bg-primary flex flex-col items-center place-content-center justify-between overflow-x-hidden overflow-y-scroll hidescrollbar text-white rounded-md drop-shadow-xl hover:drop-shadow-2xl m-0">
              <div className=" w-[180px] px-8 pt-8 flex flex-col items-center justify-center translate-y-[50px] text-center">
                <div className="m-0 p-0"  onClick={() => navigate(`/topicqna/${topic._id}`)} >{topic.topicName}</div>
              {(hoverId === topic._id) && (
                <div className="flex flex-row justify-between gap-6 m-5">
                  <button onClick={() => deleteTpc(topic._id)} className="rounded-full border border-white py-2 px-3 hover:bg-logoutred hover:border-transparent">
                    <FontAwesomeIcon icon={faTrash}/>
                  </button>
                  <button onClick={() => {setUpdateId(topic._id); setToup(topic.topicName) }} className="rounded-full border border-white py-2 px-3 hover:bg-secondary hover:border-transparent">
                    <FontAwesomeIcon icon={faPenNib}/>
                  </button>
                </div>
              )}
              </div>
            </div>
          ))
        )}
      </div>

      <button className="text-white text-[40px] bg-primary rounded-md h-[50px] w-[50px] p-0 m-0 flex place-content-center drop-shadow-lg  fixed bottom-[70px] right-[70px]" onClick={()=> setCreate(!create)}>
        {!create && (<h1 className="p-0 m-0 -translate-y-2">+</h1>)}
        {create && (<h1 className="p-0 m-0 -translate-y-2">⇮</h1>)}
      </button>

      {create && (<form onSubmit={onSubmit} className="z-10 fixed bottom-[70px] flex flex-row justify-between gap-5">
        <input
          type="text"
          id="topicname"
          onChange={(event) => setTpc(event.target.value)}
          value={tpc}
          placeholder="Enter Topic Name"
          className="rounded-full p-2 w-[300px] text-black"
        />
        <button type="submit"
        className=" text-white rounded-full border border-green-400 py-2 px-3 hover:bg-green-400"
        >Create</button>
      </form>)}
      {!create && (<form onSubmit={() => updateTpc(updateId, updatedName)} className="z-10 text-white fixed bottom-[70px] flex flex-row justify-between gap-5">
        <input
          type="text"
          value={updatedName}
          onChange={(event) => setUpdatedName(event.target.value)}
          placeholder = {toup==null ? "Select Topic to be updated" : toup}
          className="rounded-full p-2 w-[300px] text-black"
        />
        <button type="submit"
        className="rounded-full border border-secondary py-2 px-3 hover:bg-secondary"
        >Update</button>
        
        <button onClick={() => setUpdateId(null)}
        className="rounded-full border border-logoutred py-2 px-3 hover:bg-logoutred"
        >Cancel</button>
      </form>)}

     
    </div>
  );
};




export default TopicPage;
