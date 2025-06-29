import { getSpotifyCode } from '../lib/auth'

export default function Login(props){

  const { challenge } = props;
  const url = getSpotifyCode(challenge)
 
  return(
     <main className="w-[90%] h-[90%] text-center">
       <a className="m-8 px-5 py-1 rounded-4xl w-fit h-fit transition-all duration-150 border-rose-400 border-5 hover:border-7 hover:border-rose-200 hover:drop-shadow-2xl" href={url}>LOG IN</a>
     </main>
  )
}