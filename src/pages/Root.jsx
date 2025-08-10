import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
export default function Root() {

  return (
    <main className="flex flex-col items-center justify-center backGround w-screen relative">
      <div className="hidden md:flex w-full md:mb-16">
        <NavBar />
      </div>
      <Outlet className="flex w-full h-fit overflow-hidden relative sm:flex-col" />
    </main>
  )
}