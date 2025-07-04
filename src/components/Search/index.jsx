import SearchBar from "./SearchBar";
import Results from './Results';
import { useState } from 'react';

export default function Search(){
  const [ results, setResults ] = useState({});

  return (
    <div className="h-full w-full relative p-2">
      <SearchBar setResults={setResults}/>
      <Results results={results} />
    </div>
  )
};