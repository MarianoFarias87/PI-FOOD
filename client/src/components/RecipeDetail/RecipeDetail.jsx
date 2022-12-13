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
            <div className={s.buttonBox}>
                <Link to='/home'>
                    <button className={s.btn} type="button">Back</button>
                </Link>
            </div>
            <div className={s.subContainer} >
                <div className={s.topBox} >
                    <div className={s.imgContainer}>

                        <img className={s.image}
                            src={image}
                            alt="Img Not Available"
                            width="500px"

                        />
                        <div>
                            <div className={s.info}>
                                <div className={s.titleContainer}>
                                    <h3 className={s.mainTitle}>{name}</h3>
                                </div>

                                <h3 className={s.subTitle}>Summary</h3>
                                <p className={s.summary}>{summary && summary.replace(/<[^>]+>/g, "")}</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className={s.more}>
                    <h5>Read more below</h5>
                    <h2>&</h2>
                    <h2>Enjoy cooking</h2>
                </div>

                <div className={s.middleBox}>
                    <div className={s.diets}>
                        <h3 className={s.subTitle}>Diet Types:</h3>
                        {diets?.map((d) => (
                            d.name ?
                                <p className={''} key={d}>{d.name}</p>
                                : <p className={''} key={d}>{d}</p>))}
                    </div>

                    <div className={s.dishes}>

                        {dish ?
                            <div>
                                <h3 className={s.subTitle}>Dish Types: </h3>
                                {dish?.map(d => {
                                    return (
                                        <p className={''} key={d}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                    )
                                })}
                            </div> :
                            <h4 className={s.subTitle}>This recipe has no dish types.</h4>
                        }

                    </div>
                    <div className={s.healths}>
                        <span id="healthScore" className={s.subTitle}>
                            Health Level:{" "}
                            <progress
                                id="healthScore"
                                max="100"
                                value={healthScore}

                            />{" "}
                            <span className={s.numbers}>

                                {healthScore}/100
                            </span>
                        </span>
                    </div>
                </div>


                <div className={s.steps}>
                    <h3 className={s.subTitle}>Steps</h3>
                    {Array.isArray(steps) ? steps.map((st) => {
                        return (
                            <p className={s.info} key={st.number}>{st.number}: {st.step}</p>
                        )
                    }) : <p className={s.info}>{steps}</p>}
                </div>
            </div>
        </div>
    )
}