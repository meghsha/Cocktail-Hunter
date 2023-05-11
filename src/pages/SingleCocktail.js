import React from 'react'
import Loading from '../components/Loading'
import { useParams, Link } from 'react-router-dom'
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='

const SingleCocktail = () => {

  let params = useParams();
  const [loading, setloading] = React.useState(false)
  const [cocktail, setcocktail] = React.useState(null)

  let fetchCocktail = async () => {
    setloading(true);
    try {
      let response = await fetch(`${url}${params.id}`);
      let data = await response.json();
      let {drinks} = data

      if(drinks){
        let {strDrink: name, strDrinkThumb: image, strCategory: category, strAlcoholic: info, strGlass: glass, strInstructions: instruction, strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 } = drinks[0]

        let ingredients = [ strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5 ]

        let newCocktail = {name, image, category, info, glass, instruction, ingredients}

        setcocktail(newCocktail)
      } else {
        setcocktail(null)
      }
      setloading(false);
    } 

    catch (error) {
      console.log(error)
      setloading(false);
    }
  }

  React.useEffect(() => {
    fetchCocktail()
  }, [params.id])

  if(loading){
    return(
      <Loading />
    )
  }

  if(cocktail == null){
    return(
      <h2 className='section-title'>no cocktail to show at the moment</h2>
    )
  }

  let {name, image, info, glass, category, instruction, ingredients} = cocktail;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>back home</Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>Name: </span> {name}
          </p>
          <p>
            <span className='drink-data'>Info: </span>{info}
          </p>
          <p>
            <span className='drink-data'>Category: </span>{category}
          </p>
          <p>
            <span className='drink-data'>Glass:</span>  {glass}
          </p>
          <p>
            <span className='drink-data'>Instruction: </span>{instruction}
          </p>
          <p>
          <span className='drink-data'>Ingredients: </span>
            {ingredients.map((item, index) => {
              return item? <span> {item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  )
}

export default SingleCocktail
