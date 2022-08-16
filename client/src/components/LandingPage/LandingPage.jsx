import React, { Component } from "react";
import { Link } from 'react-router-dom'
import s from './LandingPage.module.css'

export default class LandingPage extends Component {
    render() {
        return (
            <div className={s.landing}>
                <Link to='/home' className={s.link}>
                    <button className={s.btnLanding}>Let's Start</button>
                </Link>
            </div>
        )
    }
}