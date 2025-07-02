import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <nav className="absolute w-screen top-0 h-fit p-4 flex items-center justify-around  bg-neutral-800 border-red-500 border-4">
      <ul className="flex">
        <li className="group  min-w-[190px] h-[80px] max-w-[190px]">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:bg-neutral-600'}>Home</NavLink>
        </li>
        <li className="group  min-w-[190px] h-[80px] max-w-[190px]">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:bg-neutral-600'}>Profile</NavLink>
        </li>
        <li className="group  min-w-[190px] h-[80px] max-w-[190px]">
          <NavLink to="/nowplaying" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:bg-neutral-600'}>Now Playing</NavLink>
        </li>
        <li className="group  min-w-[190px] h-[80px] max-w-[190px]">
          <NavLink to="/Playlists" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:bg-neutral-600'}>Playlists</NavLink>
        </li>
        <li className="group min-w-[190px] h-[80px] max-w-[190px]">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-b-lg min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-b-3xl min-w-[190px] max-w-[190px] m-2 p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-b-2xl group-hover:bg-neutral-600'}>Search</NavLink>
        </li>
      </ul>
    </nav>
  )
}