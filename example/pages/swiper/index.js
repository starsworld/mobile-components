import React from 'react';
import {Page, Swiper, Swiper2} from '../../../src';

export default class SwiperDemo extends React.Component {
    handleClick(){
        console.log('click')
    }

    render() {
        return (
            <Page>
                <div style={{padding: '40px'}}>
                    <h3>Swiper</h3>
                    <p>滑动组件</p>
                </div>
                <div>
                    <Swiper height={150}>
                        <div style={{background: 'deepskyblue'}} onClick={this.handleClick}></div>
                        <div style={{background: 'pink'}}></div>
                        <div style={{background: 'deeppink'}}></div>
                        <div style={{background: 'goldenrod'}}></div>
                    </Swiper>
                </div>
                <div style={{'marginTop': '30px', 'fontSize': '80px'}}>
                    <Swiper2 height={150}>
                        <div style={{background: 'deepskyblue'}}>1</div>
                        <div style={{background: 'pink'}}>2</div>
                        <div style={{background: 'deeppink'}}>3</div>
                        <div style={{background: 'goldenrod'}}>4</div>
                    </Swiper2>
                </div>
            </Page>
        );
    }
}