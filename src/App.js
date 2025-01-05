import React, { useContext } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import TeacherDashboard from './pages/TeacherDashboard.js';
import StudentDashboard from './pages/StudentDashboard.js';
import ClassPage from './pages/ClassPage.js'
import About from './pages/About.js';
import SignUp from './pages/SignUp.js';
import { UserContext, UserContextProvider } from './UserContext.js';
import Contact from './pages/Contact.js';
import "./styles/Global.css"
import Layout from './components/Layout.js';

function PrivateRoute({ children }) {
  const { user } = useContext(UserContext);
  
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}


function App() {
  return (

    <UserContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<Layout />}>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/teacher/:userId' element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} />
            <Route path='/student/:userId' element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
            <Route path='/classes/:classId' element={<PrivateRoute><ClassPage /></PrivateRoute>} />
          </Route>
        </Routes>
    </UserContextProvider>


  );
}

export default App;
