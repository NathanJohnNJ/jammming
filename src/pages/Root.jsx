import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
export default function Root() {

  return (
    <main className="flex flex-col items-center justify-center backGround w-full max-w-[1400px] h-[95vh] overflow-hidden rounded-md  border-blue-500 border-4">
      <div className="relative w-screen h-fit bg-neutral-800">
        <NavBar />
        <SearchBar />
      </div>
      <Outlet />
    </main>
  )
}