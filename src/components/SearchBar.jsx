import { useState } from "react";
import { GoSearch } from "react-icons/go";

export default function SearchBar(){

  const [ searchValue, setSearchValue ] = useState('Search...');
  function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.style.width = "20vw";
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-400');
    bar.classList.add('text-neutral-600');

  }
  function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  function onClickHandler(){
    const bar = document.getElementById("search");
    bar.style.width = "60vw";
    bar.classList.remove('bg-neutral-400');
    bar.classList.remove('text-neutral-600');
    bar.classList.add('bg-neutral-200');
    bar.classList.add('text-neutral-700');
  }
  return (
    <div className="absolute right-0 top-[80px] rounded-2xl opacity-80 border-green-500 border-4 ">
      <form id="search" className="bg-neutral-200 text-neutral-600 w-[20vw] flex flex-row items-center justify-between group" onSubmit={submitHandler}>
        <input type="text" className="flex self-start group group-active:w-[60vw]"  name="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} />
        <GoSearch className="flex self-end" onClick={onClickHandler} />
      </form>
    </div>
  )
}