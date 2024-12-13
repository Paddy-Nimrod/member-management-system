import "./App.css";

import { Routes, Route } from "react-router";

import ProtectedRoute from "./middleware/authMiddleware";

import Navbar from "./components/navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ListMemberPage from "./pages/ListMembers";
import MemberProfilePage from "./pages/MemberProfile";
import AddMemberForm from "./pages/CreateNewMember";

function App() {
  return (
    <>

      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ListMemberPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add/member"
          element={
            <ProtectedRoute>
              <AddMemberForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/member/update/:id"
          element={
            <ProtectedRoute>
              <MemberProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
