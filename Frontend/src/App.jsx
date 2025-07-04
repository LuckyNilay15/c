import React from "react";
import Home from "./home/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import Notes from "./components/Notes";

function App() {
  const [authUser, setAuthUser] = useAuth();
  //console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/course"
            element={authUser ? <Courses /> : <Navigate to="/signup" />}
          />
           <Route
            path="/notes"
            element={authUser ? <Notes /> : <Navigate to="/signup" />}
          />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
