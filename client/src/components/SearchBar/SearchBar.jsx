import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { getRecipeByName } from "../../redux/actions";

import s from './SearchBar.module.css'
import './styleSearchbar.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    const [ input, setInput ] = useState('');
    

    const handleChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getRecipeByName(input))
        setInput('')
    }

    const enter = (e) => {
        if (e.keyCode === 13) {
            dispatch(getRecipeByName(input))
            setInput('')
            
        }
    }

    return (
        <div>
            <div className={s.container}>
                <input 
                    className={s.input}
                    onKeyDown={enter}
                    type= 'text'
                    placeholder="Search recipe by name..."
                    value={input}
                    onChange={handleChange}
                />

                <button
                    class='custom-btn btn'
                    type='submit'
                    onClick={handleSubmit}>
                        <span>
                        Search
                        </span>
                    </button>
            </div>
        </div>
    )
}

// export default function NavBar() {
//     const dispatch = useDispatch();
    
//     function handleClick(e) {
//         e.preventDefault()
//         dispatch(getRecipes());
//     }

//     return (
//         <div className={s.nav}>
//             <button className={s.button} onClick={e => { handleClick(e) }}>Reload Recipes</button>
//             <input className={s.input}/>
//             <button className={s.button}>Search</button>
//             <Link to='/' >
//                 <button className={s.button}>Back to Landing</button>
//             </Link>
//         </div>
//     )
// }