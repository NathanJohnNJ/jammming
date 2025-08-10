import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <nav className="fixed top-0 left-[50%] -translate-x-[50%] flex h-[8vh] justify-center">
      <ul className="flex  justify-center">
        <li className="group ">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg scale-y-125 m-0 p-4 bg-neutral-700 border-green-500/60 border-1 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl h-[2vh] m-0 p-4 bg-neutral-700 border-green-900/60 border-2 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:text-lg group-hover:bg-neutral-600'}>Home</NavLink>
        </li>
        <li className="group">
          <NavLink to="/Playlists" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg scale-y-125 m-0 p-4 bg-neutral-700 border-green-500/60 border-1 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl h-[2vh] m-0 p-4 bg-neutral-700 border-green-900/60 border-2 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:text-lg group-hover:bg-neutral-600'}>Playlists</NavLink>
        </li>
        <li className="group">
          <NavLink to="/search" className={({ isActive }) => isActive ? ' text-lg text-zinc-200 rounded-b-lg scale-y-125 m-0 p-4 bg-neutral-700 border-green-500/60 border-1 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl h-[2vh] m-0 p-4 bg-neutral-700 border-green-900/60 border-2 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:text-lg group-hover:bg-neutral-600'}>Search</NavLink>
        </li>
      </ul>
    </nav>
  )
}