import { NavLink } from "react-router-dom";

export default function NavBar(){

  return (
    <nav className="absolute w-screen top-0 h-fit flex items-center justify-around  bg-neutral-800">
      <ul className="flex">
        <li className="rounded-md min-w-[200px] max-w-[200px] p-4 bg-neutral-700 border-zinc-500/50">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-lg text-zinc-200' : 'text-base text-zinc-500'}>Home</NavLink>
        </li>
        <li className="rounded-md min-w-[200px] max-w-[200px] p-4 bg-neutral-700 border-zinc-500/50">
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'text-lg text-zinc-200' : 'text-base text-zinc-500'}>Profile</NavLink>
        </li>
        <li className="rounded-md min-w-[200px] max-w-[200px] p-4 bg-neutral-700 border-zinc-500/50">
          <NavLink to="/nowplaying" className={({ isActive }) => isActive ? 'text-lg text-zinc-200' : 'text-base text-zinc-500'}>Now Playing</NavLink>
        </li>
        <li className="rounded-md min-w-[200px] max-w-[200px p-4] bg-neutral-700 border-zinc-500/50">
          <NavLink to="/Playlists" className={({ isActive }) => isActive ? 'text-lg text-zinc-200' : 'text-base text-zinc-500'}>Playlists</NavLink>
        </li>
        <li className="rounded-md min-w-[200px] max-w-[200px] p-4 bg-neutral-700 border-zinc-500/50">
          <NavLink to="/search" className={({ isActive }) => isActive ? 'text-lg text-zinc-200' : 'text-base text-zinc-500'}>Search</NavLink>
        </li>
      </ul>
    </nav>
  )
}