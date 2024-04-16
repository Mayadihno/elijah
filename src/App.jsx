import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import Login from "./Auth/Inter/Login";
import Register from "./Auth/Register/Register";
import ForgetPass from "./Auth/Forget/ForgetPass";
import AdminLogin from "./Admin/AdminLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PRoute from "./Protected/PRoute";
import Fixtures from "./Fixtures/Fixtures";
import Dashboard from "./Admin/Dashboard";
import Gallery from "./Gallery/Gallery";
import Video from "./Video/Video";
import Booked from "./Users/Booked";
import Sports from "./components/Sport/Sports";
import Allnews from "./components/News/Allnews";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sport" element={<Sports />} />
        <Route path="/news" element={<Allnews />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPass />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/*" element={<PRoute />}>
          <Route path="/*/fixtures" element={<Fixtures />} />
          <Route path="/*/gallery" element={<Gallery />} />
          <Route path="/*/video" element={<Video />} />
          <Route path="/*/booked-game" element={<Booked />} />
          <Route path="/*/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Footer />
      <ToastContainer theme="light" position="bottom-center" />
    </>
  );
}

export default App;
