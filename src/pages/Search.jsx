// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getMoreItems } from "../main";
import FullSearch from '../components/Search/FullSearch';


export default function Search(){
  // const [ results, setResults ] = useState({});
  // const location = useLocation();
  // const url = location.state.url;
  // const params = new URLSearchParams(url.search);
  // const query = params.get("query");

  // useEffect(() => {
  //   async function getResults(){
  //     const output = await getMoreItems(url);
  //     return output;
  //   }
  //   // const allResults = getResults();
  //   // setResults(allResults);
  // }, []);

  return (
    <div className="h-[95%] w-[98%] rounded-lg bg-zinc-200/60 overflow-hidden">
      {/* <SearchBar initialQuery={query} />
      <div className="">
        {
          results.items.map((result,i) => {
            <div key={i}>
              <ResultItem result={result} />
            </div>
          })
        }
      </div> */}
      <FullSearch />
    </div>
  )
}