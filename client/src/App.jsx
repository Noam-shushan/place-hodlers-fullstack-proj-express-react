import Deshbord from "./components/Dashbord";
import SideBar from "./components/SideBar";
import { Topbar } from "./components/Topbar";

export default function App() {
  return (
    <div className="flex flex-col">
      <SideBar />
      <Topbar />
      <Deshbord />
    </div>
  )
}