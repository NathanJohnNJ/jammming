
export default function Profile() {

  return (
    <div className="flex flex-col items-center justify-center">
      <section>
        <h1>Profile:</h1>
        <div id="profile" className="flex flex-col items-center">
          <div className="flex items-center justify-between">
            <span id="avatar" className="rounded-full"></span>
            <ul>
              <li>
                <h2 className="text-3xl font=black shadow-2xl">Logged in as <span id="displayName"></span></h2>
              </li>
              <li>User ID:  <span id="id"></span></li>
              <li>Email: <span id="email"></span></li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold underline">Links:</h3>
            <ul>
              <li><b>Spotify URI:</b>  <a id="uri" href="#"></a></li>
              <li><b>Link:</b> <a id="url" href="#"></a></li>
              <li><b>Profile Image:</b> <span id="imgUrl"></span></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
