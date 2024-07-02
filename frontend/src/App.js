import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Flash from './pages/Flash.jsx'
import TopicPage from './pages/TopicPage.jsx'
import TopicQnA from './pages/TopicQnA.jsx'
import axios from 'axios'
const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/topicpage' element= {<TopicPage/>}/>
          <Route path='/flash' element={<Flash/>}/>
          <Route path='/topicqna/:id' element= {<TopicQnA/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
