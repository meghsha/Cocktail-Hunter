import React from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {
  const { setsearchTerm } = useGlobalContext();
  let searchValue = React.useRef('');

  let searchCocktail = () => {
    let searchTerm = searchValue.current.value;
    // console.log(searchTerm);
    setsearchTerm(searchTerm);
  }

  React.useEffect(() => {
    searchValue.current.focus();
  }, [])

  let handleSubmit = (e) =>{
    e.preventDefault();
  }

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>search your favourite cocktail</label>
          <input type='text' id='name' ref={searchValue} onChange={searchCocktail}></input>
        </div>
      </form>
    </section>
  )
}

export default SearchForm
