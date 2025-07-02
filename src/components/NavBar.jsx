import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <nav className="absolute w-screen top-0 h-fit flex items-center justify-around  bg-neutral-800">
      <ul className="flex">
        <li className="group">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-md min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-3xl min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-2xl group-hover:bg-neutral-600'}>Home</NavLink>
        </li>
        <li className="group">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-md min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-3xl min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-2xl group-hover:bg-neutral-600'}>Profile</NavLink>
        </li>
        <li className="group">
          <NavLink to="/nowplaying" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-md min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-3xl min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-2xl group-hover:bg-neutral-600'}>Now Playing</NavLink>
        </li>
        <li className="group">
          <NavLink to="/Playlists" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-md min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-3xl min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-2xl group-hover:bg-neutral-600'}>Playlists</NavLink>
        </li>
        <li className="group">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-lg text-zinc-200 rounded-md min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:bg-neutral-600' : 'text-base text-zinc-500 rounded-3xl min-w-[175px] max-w-[175px] p-4 bg-neutral-700 border-zinc-500/50 transition-all duration-150 group group-hover:rounded-2xl group-hover:bg-neutral-600'}>Search</NavLink>
        </li>
      </ul>
    </nav>
  )
}