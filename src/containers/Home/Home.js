import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import { withRouter } from "react-router-dom";
import './Home.css'

class Home extends Component {
    render = () => {
        return (
            <div className='home'>
                <div>
                    <img src={require("../../assets/logo.jpg")} className='home__logo-image' />
                    <h4 className='home__logo-text'>Lawren</h4>
                    <h5 className='home__logo-subtext'>legal aid for all</h5>
                </div>
            </div>
        )
    }
}

export default withRouter(Home);