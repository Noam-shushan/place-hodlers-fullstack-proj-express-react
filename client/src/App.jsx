import Deshbord from "./components/Dashbord"
import SideBar from "./components/SideBar"
import { Topbar } from "./components/Topbar"
import { useAuth } from "./hooks/useAuth"
import Login from "./pages/login/Login"
import Signup from "./pages/login/Singup"
import { Route, Routes } from "react-router-dom"


function Layout() {
  return (
    <div className="flex flex-col">
      <SideBar />
      <Topbar />
      <Deshbord />
    </div>
  )
}

function LoginSingupRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}


export default function App() {
  const { user, login, logout } = useAuth()
  return user ? <Layout /> : <LoginSingupRouter />
  // return <Layout />
}
