import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes, getDiets, orderByScore, filterByType, orderByAlphabet } from "../../redux/actions";
import Pagination from "../Pagination/Pagination";
import Recipe from "../Recipe/Recipe";
import Loading from "../Loading/Loading"
import s from './Home.module.css'
import SearchBar from "../SearchBar/SearchBar";

let prevId = 1;

export default function Home() {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.showedRecipes)
  const allDiets = useSelector((state) => state.diets)


  const [page, setPage] = useState(1);
  const recipesPerPage = 9;
  const end = page * recipesPerPage; //index of the last recipe
  const start = end - recipesPerPage; //index of the first recipe
  const currentRecipes = recipes?.slice(start, end); //rango de recetas en que estamos
  const totalPages = Math.ceil(recipes.length / recipesPerPage);
  const [, setOrder] = useState('')

  useEffect(() => {
    dispatch(getRecipes())
    dispatch(getDiets())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault()
    dispatch(getRecipes())
    setPage(1)
    setOrder('')
  }

  function handleOrderByName(e) {
    e.preventDefault()
    dispatch(orderByAlphabet(e.target.value))
    setPage(1)
    setOrder(e.target.value)
  }

  function handleOrderByScore(e) {
    e.preventDefault()
    dispatch(orderByScore(e.target.value))
    setPage(1)
    setOrder(e.target.value)
  }

  function handleDiets(e) {
    e.preventDefault()
    dispatch(filterByType(e.target.value))
    setPage(1)
    setOrder('')
  }

  return (
    <div className={s.view}>

      <SearchBar />
    <div>

      <div className={s.lostres}>
        <div>
          <Link to={'/'}>
          <button className={s.btn}>
          <span>Back to Landing</span>
          </button>
          </Link>
        </div>
        <div>
        <button className={s.btn} onClick={(e) => { handleClick(e) }}><span>Reload Recipes</span></button>
        </div>
        <div>
          <Link to={'/recipe'}>
          <button className={s.btn}>
          <span>Create Recipe</span>
          </button>
          </Link>
        </div>
    </div>

        <div className={s.filters}>
          <h4>Order by Name</h4>
          <select defaultValue={'default'} className={s.select} onChange={(e) => { handleOrderByName(e) }}>
            <option value="default" disabled> Order by Name </option>
            <option value="asc"> A to Z </option>
            <option value="desc"> Z to A </option>
          </select>


          <h4>Order by Score</h4>
          <select defaultValue={'default'} className={s.select} onChange={(e) => { handleOrderByScore(e) }}>
            <option value="default" disabled> Order by Score</option>
            <option value="high"> High score </option>
            <option value="low"> Low score </option>
          </select>


          <h4>Filter by Diet</h4>
          <select className={s.select} onChange={(e) => { handleDiets(e) }}>
            <option value="all"> All </option>
            {allDiets?.map((diet) => (
            <option key={diet.id} value={diet.name}> {diet.name} </option>
            ))}
          </select>
        </div>

      </div>

      <h2>Recipes</h2>

      <div className={s.cardsContainer}>
      {
        currentRecipes.length === 0 ? (
          <Loading />
        ) :
          (

          <div className={s.recipes}>
            {
              currentRecipes?.map(e => {
                return (
                  <div className={s.recipe} key={prevId++}>
                    <Link to={`/recipes/${e.id}`} style={{textDecoration:'none', color: 'black'}}>
                    <Recipe
                      image={e.image}
                      name={e.name}
                      healthScore={e.healthScore}
                      diets={e.diets}
                      id={e.id}
                    ></Recipe>
                    </Link>
                  </div>
                )
              })
            }
            </div>
          )
      }
      </div>



      <Pagination
        className={s.pagination}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
      />
    </div>

  )
}

