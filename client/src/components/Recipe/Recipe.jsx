import React from "react";
import s from './Recipe.module.css'

let prevId = 1;

export default function Recipe({ image, name, healthScore, diets, id }) {
    return (
        <div className={s.card}>
                <div className={s.imgContainer}>
                <img src={image} alt='img' className={s.img} />
                </div>
                <div className={s.restContainer}>
                <h3 className={s.name}>{name}</h3>
                <h3 className={s.healthScore}>Health Score: {healthScore}</h3>
                <div className={s.diets}>
                <h3 className={s.dietsTitle}>Types of diets: </h3>
                {
                    diets?.map(d => {
                        if (d.hasOwnProperty('name')) {
                            return (
                                <p key={prevId++}>- {d.name[0].toUpperCase() + d.name.slice(1)} </p>
                                )
                            } else {
                                return (
                                    <p key={prevId++}>- {d[0].toUpperCase() + d.slice(1)} </p>
                                    )
                                }
                            })
                        }
            </div>
                        </div>
            
        </div>
    )
}