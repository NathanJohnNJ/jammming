import { useState } from "react";

export default function SearchBar(){

  const [ searchValue, setSearchValue ] = useState('Search...');
  function submitHandler(e){
    e.preventDefault();
    const bar = document.getElementById("search");
    bar.style.width = "20vw";
    bar.classList.remove('bg-neutral-200');
    bar.classList.remove('text-neutral-800');
    bar.classList.add('bg-neutral-400 text-neutral-700');

  }
  function changeHandler(e){
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  function onClickHandler(){
    const bar = document.getElementById("search");
    bar.style.width = "60vw";
    bar.classList.remove('bg-neutral-400');
    bar.classList.remove('text-neutral-700');
    bar.classList.add('bg-neutral-200 text-neutral-800');
  }
  return (
    <div className="">
      <form id="search" onSubmit={submitHandler}>
        <label htmlFor="search">
          <input type="text" name="search" id="search" value={searchValue} onChange={changeHandler} onClick={onClickHandler} />
        </label>
      </form>
    </div>
  )
}