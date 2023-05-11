import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const AppContext = React.createContext()

const AppProvider = ({ children }) => {

  const [loading, setloading] = useState(true)
  const [searchTerm, setsearchTerm] = useState('a')
  const [cocktails, setcocktails] = useState([])

  const fetchDrinks = useCallback(async () => {
    setloading(true)
    try {
      let response = await fetch(`${url}${searchTerm}`)
      let data = await response.json();
      let {drinks} = data
      if(drinks){
        let newDrinks = drinks.map((item) => {
          let { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } = item
          return {id: idDrink, name: strDrink, image: strDrinkThumb, info: strAlcoholic, glass: strGlass}
        })
        setcocktails(newDrinks)
      }else {
        setcocktails([]);
      }
      setloading(false);
    } catch (error) {
      console.log(error)
      setloading(false);
    }
  }, [searchTerm])

  useEffect(() => {
      fetchDrinks();
  }, [searchTerm, fetchDrinks])
  
  return (
    <AppContext.Provider value={{
      loading, cocktails, setsearchTerm
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }