import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { cleanDetail, getRecipeDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from './RecipeDetail.module.css'

export default function RecipeDetail() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { image, name, diets, summary, healthScore, steps, dish } = useSelector((state) => state.recipeDetails)

    useEffect(() => {
        dispatch(getRecipeDetails(id))
        return () => {
            dispatch(cleanDetail())
        }
    }, [id, dispatch])

    return (
        <div className={s.container}>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <div className={s.subContainer}>
            <div className={s.box}>
                <h3 className={s.mainTitle}>{name}</h3>
                <img className={s.image}
                    src={image}
                    alt="Img Not Available"
                    width="500px"
                    
                />
                </div>
                <div className={s.box}>
                    <h3 className={s.subTitle}>Summary</h3>
                    <p className={s.info}>{summary && summary.replace(/<[^>]+>/g, "")}</p>
                </div>
                
                <div className={s.box}>
                    <h3 className={s.subTitle}>Diet Types</h3>
                    {diets?.map((d) => (
                        d.name ?
                        <p className={s.info} key={d}>{d.name}</p>
                    : <p className={s.info} key={d}>{d}</p>))}
                </div>
                <div className={s.box}>
                    <span id="healthScore" className={s.subTitle}>
                        Health Level:{" "}
                        <progress
                            id="healthScore"
                            max="100"
                            value={healthScore}
                            
                        />{" "}
                        {healthScore}/100
                    </span>
                </div>
                <div className={s.box}>
                    
                {dish ?
                    <div>
                        <h3 className={s.subTitle}>Dish Types: </h3>
                        {dish?.map(d => {
                            return (
                                <p className={s.info} key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                            )
                        })}
                    </div> :
                    <h4 className={s.subTitle}>This recipe has no dish types.</h4>
                }
                    
                </div>
                <div className={s.box}>
                    <h3 className={s.subTitle}>Steps</h3>
                    {Array.isArray(steps) ? steps.map((s) => {
                        return (
                            <p className={s.info} key={s.number}>{s.number}: {s.step}</p>
                        )
                    }) : <p className={s.info}>{steps}</p>}
                </div>
            </div>
        </div>
    )
}