import React from 'react';
import {Link} from 'react-router-dom';
import {Button, ButtonArea} from "../../../src";
import './home.less';

const Home = (props) => {

    return (
        <div className='home'>
            <Button href='#/mask'>Mask</Button>
            <Button href='#/actionsheet'>ActionSheet</Button>
            <Button href='#/button'>Button</Button>
            <Button href='#/page'>Page</Button>
            <Button href='#/swiper'>Swiper</Button>
        </div>
    )
};

export default Home;