import { getProfile } from '../lib/utils';

export default function Profile(props) {
  const { token } = props;
  const profile = getProfile(token);

  return (
    <div className="flex flex-col items-center justify-center">
      <section>
      <h1>Profile:</h1>
      <div id="profile" className="flex flex-col items-center">
        <div className="flex items-center justify-between">
        {/* <Image src={profile.images[0].url} alt="Avatar" height="200" width="200" className="rounded-full" /> */}
          <h2 className="text-3xl font=black shadow-2xl">{profile.display_name}</h2>
        </div>
        <ul>
          <li>User ID: {profile.id}</li>
          <li>Email: {profile.email}</li>
        {/* <li>Spotify URI: <Link href={profile.external_urls.spotify}>{profile.uri}</Link></li>
          <li>Link: <Link href={profile.href}>{profile.href}</Link></li>
          <li>Profile Image: {profile.images[0].url}</li> */}
        </ul>
      </div>
    </section>
    </div>
  )
}