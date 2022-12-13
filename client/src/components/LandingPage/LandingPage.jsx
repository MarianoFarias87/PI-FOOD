import React, { Component } from "react";
import { Link } from 'react-router-dom'
import s from './LandingPage.module.css'

export default class LandingPage extends Component {
    render() {
        return (
            // <div className={s.landing}>
            //     <Link to='/home' className={s.link}>
            //         <button className={s.btnLanding}>Let's Start</button>
            //     </Link>
            // </div>
            <div className={s.container}>
                <div className={s.titleContainer}>
                    <div className={s.title}>
                        <h1 className={s.first}>Healthy Recipes</h1>
                        <h1 className={s.second}>For Everyone!</h1>
                    </div>
                    <div className={s.subTitle}>
                        <h3 className={s.third}>Get inspired and experiment in your kitchen</h3>
                        <h3 className={s.fourth}>with dishes from all over the world.</h3>
                    </div>
                </div>
                <Link to='/home' className={s.link}>
                    <button className={s.go} type="button">Let's do it!</button>
                </Link>
            </div>
        )
    }
}