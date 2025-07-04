import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { quickSearch } from "../../main";
import  ResultItem  from './ResultItem';


export default function SearchBar(props){
  const { setResults } = props;
  const [ searchValue, setSearchValue ] = useState('');
  const [ partialResult, setPartialResult ] = useState(null)

  async function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-400');
    bar.classList.add('text-neutral-600');
    const finalResult = await quickSearch(searchValue);
    console.log(finalResult);
    setPartialResult(null);
    setResults(finalResult);
  }
  async function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
    const result = await quickSearch(e.target.value);
    console.log(result);
    setPartialResult(result)
  }
  function onClickHandler(){
    const bar = document.getElementById("search");
    bar.classList.remove('bg-neutral-400');
    bar.classList.remove('text-neutral-600');
    bar.classList.add('bg-neutral-200');
    bar.classList.add('text-neutral-700');
  }
  return (
    <div className="w-full h-min py-5 absolute left-[50%] -translate-x-[50%] top-2 ">
        <form id="search" className="relative rounded-2xl opacity-80 bg-neutral-200 text-neutral-600 w-full h-[10%] flex flex-row items-center justify-between group transition-all duration-100" onSubmit={submitHandler}>
          <input type="text" className="flex self-start text-left text-xs group w-full h-full rounded-2xl  opacity-35 group-active:opacity-90" name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} placeholder="Search..." />
            <GoSearch className="absolute right-2 top-1 opacity-45 group group-active:opacity-90" onClick={submitHandler} />
        </form>
        {
          partialResult &&
            <ul className="bq-neutral-200 w-[99%] h-fit">
              {
                partialResult.tracks.items.map((track, i) => {
                  return (
                    <ResultItem key={i} result={track} />
                  )
                })
              }
            </ul>
        }
    </div>
  )
}