
export default function Profile() {

  return (
      <section id="profile" className="relative flex flex-col items-center h-full w-full">
        <div className="flex items-center justify-between">
          <span id="avatar" className="rounded-full"></span>
          <ul className="text-base">
            <li>
              <h2 className="text-lg font-bold shadow-2xl">Logged in as <span id="displayName"></span></h2>
            </li>
            <li><b>User ID:</b>  <span id="id"></span></li>
            <li><b>Email:</b> <span id="email"></span></li>
          </ul>
        </div>
        <div className="flex flex-col absolute bottom-0 left-[50%] -translate-x-[50%]">
          <h3 className="font-semibold underline text-base self-start text-left">Links:</h3>
          <ul className="text-left">
            <li><b>Spotify URI:</b>  <a id="uri" href="#" className="text-xs hover:font-bold hover:text-green-900" ></a></li>
            <li><b>Link:</b> <a id="url" href="#" className="text-xs hover:font-bold hover:text-green-900"></a></li>
            <li><b>Profile Image:</b> <span id="imgUrl" className="text-xs hover:font-bold hover:text-green-900"></span></li>
          </ul>
        </div>
      </section>
  )
}
