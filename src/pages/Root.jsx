import { Outlet } from "react-router-dom";
export default function Root() {

  return (
    <main className="flex flex-col items-center justify-center backGround w-[90vw] max-w-[1200px] h-[87.5vh] overflow-hidden">
      <Outlet />
    </main>
  )
}