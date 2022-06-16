import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import Resume from "../components/Resume/Resume";
import NotFound from "../NotFound/NotFount";
import All from "../components/Blog/BlogList/All";
import Tool from "../components/Blog/BlogList/Installation&Tool";
import Software from "../components/Blog/BlogList/Software";
import BlogView from "../components/Blog/BlogView";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import ForgotPassword from "../Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../Auth/ResetPassword/ResetPassword";
import EmailVerify from "../EmailVerify/EmailVerify";
import AddNewUser from "../Admin/AdminDashboard/AddNewUser";
import AdminBlog from "../Admin/AdminBlog/AdminBlog";
import AdminDashboard from "../Admin/AdminDashboard/AdminDashboard";
import AdminSideBar from "../Admin/AdminSideBar";
import AdminSetting from "../Admin/AdminSetting/AdminSetting";
import { AuthContext } from "../Context/AuthContext/AuthContext";
import { useContext } from "react";
import MyProject from "../components/Project/MyProject";
import Tech from "../components/Blog/BlogList/Tech";

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Resume />} />
        <Route path="/projects" element={<MyProject />} />
        <Route path="blogs/all" element={<All/>} />
        <Route path="/blogs/all/:id" element={<BlogView />} />
        <Route path="/blogs/tech" element={<Tech />} />
        <Route path="/blogs/tech/:id" element={<BlogView />} />
        <Route path="/blogs/installations&tools" element={<Tool />} />
        <Route path="/blogs/installations&tools/:id" element={<BlogView />} />
        <Route path="/blogs/softwares" element={<Software />} />
        <Route path="/blogs/softwares/:id" element={<BlogView />} />
        {user && (
          <Route path="admin/dashboard" element={<AdminSideBar />}>
            <Route index element={<AdminDashboard />} />
          </Route>
        )}
        {user && (
          <Route path="admin/dashboard/add-new-user" element={<AdminSideBar />}>
            <Route index element={<AddNewUser />} />
          </Route>
        )}
        {user && (
          <Route path="admin/blog" element={<AdminSideBar />}>
            <Route index element={<AdminBlog />} />
          </Route>
        )}
        {user && (
          <Route path="admin/account" element={<AdminSideBar />}>
            <Route index element={<AdminSetting />} />
          </Route>
        )}
        {!user && <Route path="/admin-login" element={<Login />} />}
        {!user && <Route path="/admin-register" element={<Register />} />}
        {!user && (
          <Route path="/forgot-password" element={<ForgotPassword />} />
        )}
        {!user && <Route path="*" element={<NotFound type="Not Found" />} />}
        {!user && (
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        )}
        {!user && (
          <Route path="password-reset/:id/:token" element={<ResetPassword />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
