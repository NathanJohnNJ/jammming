import { useLocation } from "react-router-dom";

export default function Info(){
  const location = useLocation();
  const info = location.state.info;

  return (
    <div className="">
      {info}
    </div>
  )
}