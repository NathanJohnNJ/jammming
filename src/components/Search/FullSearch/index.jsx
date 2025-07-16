import SearchBar from "./SearchBar";
import Results from './Results';
import TypeButtons from './TypeButtons';
import { useState } from 'react';

export default function FullSearch(){
  const [ results, setResults ] = useState({});
  const [ types, setTypes ] = useState("artist,track,playlist,album");

  return (
    <div className="h-full w-full p-2">
      <TypeButtons setTypes={setTypes} types={types} />
      <SearchBar setResults={setResults} types={types}/>
      <Results results={results} />
    </div>
  )
};