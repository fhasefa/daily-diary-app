import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import { userInfo } from './services/userService';

import './index.css';

import EditPost from './pages/posts/Edit';
import IndexPost from './pages/posts/Index';
import NewPost from './pages/posts/New';
import ShowPost from './pages/posts/Show';
import EditComment from './pages/comments/Edit';
import HomePage from './pages/posts/Home'

import Register from './pages/users/Register';
import Login from './pages/users/Login';

import Navbar from './components/Navbar';

function App() {

  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      
      let token = localStorage.getItem("token")

      if (token) {
          getLoggedInUser()
      } else {
          setIsLoading(false)
      }

      async function getLoggedInUser() {
          const user = await userInfo()
          setUser(user)
          setIsLoading(false)
      }

  }, [])

  let loggedIn = user.username

  return (
    <div className="App">
      <Navbar user={loggedIn} setUser={setUser} />
      <Routes>
          {/* <Route path='/diary/home' element={<HomePage user={loggedIn} />} /> */}
          <Route path='/diary' element={<IndexPost user={loggedIn} />} />
          <Route path='/diary/:id' element={<ShowPost user={loggedIn} />} />
          {loggedIn ?
            <>
              <Route path='/diary/home' element={<HomePage user={loggedIn} />} />
              <Route path='/diary/new' element={<NewPost user={loggedIn} />} />
              <Route path='/diary/:id/edit' element={<EditPost />} />
              <Route path='/diary/:id/comments/:cid' element={<EditComment />} />
              {!isLoading && <Route path='*' element={<Navigate to='/diary' />} />}
            </>
            :
            <>
              <Route path='/register' element={<Register setUser={setUser} />} />
              <Route path='/login' element={<Login setUser={setUser} />} />
              {!isLoading && <Route path='*' element={<Navigate to='/diary' />} />}
            </>
          }
      </Routes>
    </div>
  );
}

export default App;
