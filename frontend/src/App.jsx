import "./App.css";

import { Routes, Route } from "react-router";

import ProtectedRoute from "./middleware/auth_middleware";

import Navbar from "./components/navbar";
import LoginPage from "./pages/login_page";
import RegisterPage from "./pages/register_page";
import ListMemberPage from "./pages/list_members";
import MemberProfilePage from "./pages/member_profile";
import AddMemberForm from "./pages/create_new_member";

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
          path="/member/profile/:member_id"
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
