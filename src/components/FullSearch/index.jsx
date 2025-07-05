import SearchBar from "./SearchBar";
import Results from './Results';
import TypeButtons from './TypeButtons';
import { useState } from 'react';

export default function FullSearch(){
  const [ results, setResults ] = useState({});
  const [ types, setTypes ] = useState("artist,track,playlist,album")

  return (
    <div className="h-full w-full relative p-2">
      <SearchBar setResults={setResults} types={types}/>
      <TypeButtons setTypes={setTypes} types={types} />
      <Results results={results} />
    </div>
  )
};