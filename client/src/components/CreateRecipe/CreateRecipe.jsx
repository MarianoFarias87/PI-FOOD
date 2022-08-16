import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { createRecipe, getDiets } from "../../redux/actions";
import s from './CreateRecipe.module.css'

export default function CreateRecipe() {
const dispatch = useDispatch()
const diets = useSelector((state) => state.diets)
const recipes = useSelector((state) => state.allRecipes)
const history = useHistory()
const [errors, setErrors] = useState({})


useEffect(() => {
  dispatch(getDiets())
}, [dispatch])

const [ input, setInput ] = useState({
  name: '',
  summary: '',
  healthScore: 50,
  steps: '',
  image: '',
  diets: []
})

let validateName = /^[a-zA-Z\s]+$/;
let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

const validate = (input) => {
  let errors = {}
  
  if (!input.name.length) {
    errors.name = 'Name cannot be empty'
  }

  if (!validateName.test(input.name)) {
    errors.name = 'Special characters or numbers are not allowed'
  }

  if (recipes.find((e) => e.name.toLowerCase() === input.name.toLowerCase())) {
    alert(`The name ${input.name} already exist, please choose another one!`)
  }
  if (input.image && !validateUrl.test(input.image)) {
    errors.image = 'This is not a valid URL'
  }

  if (!input.summary.length) {
    errors.summary = 'Summary cannot be empty'
  }

  if (input.summary.length < 40) {
    errors.summary = 'Summary must be at least 40 characters'
  }

  if (input.healthScore < 1 || input.healthScore > 100) {
    errors.healthScore = 'The healt score must be a number between 1 - 100'
  }
  
  if (!input.steps.length) {
    errors.steps = 'Your recipe must have steps to follow'
  }
  
  if (input.steps.length < 40) {
    errors.steps = 'Your recipe must have more details'
  }

  return errors;
  
}

function handleChange(e){
  e.preventDefault()
  setInput({
    ...input,
    [e.target.name]: e.target.value
  })
  setErrors(
    validate({
      ...input,
      [e.target.name]: e.target.value,
    })
  )
}

function handleSelect(e){
  if (!input.diets.includes(e.target.value)) {
    setInput({
        ...input,
        diets: [...input.diets, e.target.value]
    })
    setErrors({
      ...input,
      [e.target.name] : e.target.value
    })
  }
  else {
    return alert('diet is already added')
  }
}

function handleDietDelete(diet){
  setInput({
      ...input,
      diets: input.diets.filter(d => d !== diet)
  })
}

function handleSubmit(e) {
  e.preventDefault()
   
  if (Object.keys(errors).length === 0 && input.diets.length > 0) {
    dispatch(createRecipe(input))
    alert('Recipe created successfully')
    setInput({
      name: '',
      summary: '',
      healthScore: 50,
      steps: '',
      image: '',
      diets: []
    })
    history.push('/home')
  } else {
    alert("check de fields")
  }
  
}

  return (
    <div className={s.background}>
        <Link to="/home" >
        <button className={s.button}>Home</button>
        </Link>

        <h1>Create your Recipe</h1>
        
      <form className={s.formContainer} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.subContainer}>
          <label className={s.subTitle}>Recipe Name</label>
          <input 
          className={s.subInput} 
          type="text" value={input.name} 
          name="name" 
          onChange={(e) => handleChange(e)} />
          {errors.name && <p className={s.errors}>{errors.name}</p>}
        </div>

        <div className={s.subContainer}>
          <label className={s.subTitle}>Summary</label>
          <textarea 
          className={s.subTextBox} 
          type="text" 
          value={input.summary} 
          name="summary" 
          maxLength="1000" 
          onChange={(e) => handleChange(e)}>
          </textarea>
          {errors.summary && <p className={s.errors}>{errors.summary}</p>}
        </div>

        <div className={s.subContainer}>
          <label className={s.subTitle}>Health score</label>
          <input 
          className={s.subInput} 
          type="range" min="0" max="100" 
          value={input.healthScore} 
          name="healthScore" 
          onChange={(e) => handleChange(e)} />
          {<p className={s.data}>{input.healthScore}</p>}
        </div>

        <div className={s.subContainer}>
          <label className={s.subTitle}>Steps</label>
          <textarea className={s.subTextBox} 
          type="text" 
          value={input.steps} 
          name="steps" 
          onChange={(e) => handleChange(e)}>
          </textarea>
          {errors.steps && (<p className={s.error}>{errors.steps}</p>)}
        </div>

        <div className={s.subContainer}>
          <label className={s.subTitle}>Load URL Image</label>
          <input className={s.subInput} 
          type="url" 
          value={input.image} 
          name="image" 
          onChange={(e) => handleChange(e)} />
          {errors.image && <p className={s.errors}>{errors.image}</p>}
        </div>

        <div className={s.subContainer}>
          <select className={s.select} onChange={(e)=> handleSelect(e)}>
          <option value="" hidden name="diets">Select Diets</option>
          {diets?.map(diet => {
          return ( <option value={diet.id} key={diet.id}>{diet.name}</option>)
          })
          } 
          </select>
          <ul className={s.diets}>
          <li>                            
          {input.diets.map((diet, index) => 
          <div key={index}className={s.selectedDiets}>
          <p>{diets?.find(element => element.id === diet)?.name}</p>
          <button type='button' className={s.crossButton} onClick={() => handleDietDelete(diet)}>x</button>
          </div>
          )}
          </li>
          </ul>
        </div>

        <div>
          <button className={s.submitButton} 
          type="submit" 
          onClick={(e) => handleSubmit(e)}>Create</button>
        </div>
      </form>
    </div>
  )
}