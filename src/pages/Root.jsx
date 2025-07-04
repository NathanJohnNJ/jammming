import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Root() {

  return (
    <main className="flex flex-col items-center justify-center backGround w-screen h-screen overflow-hidden relative">
      <NavBar />
      <Outlet />
    </main>
  )
}