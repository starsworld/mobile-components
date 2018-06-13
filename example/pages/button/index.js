import React from 'react';
import {Button, ButtonArea} from "../../../src";

export default class ButtonDemo extends React.Component {
    render() {
        return (
            <div>
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <ButtonArea>
                    <Button type='default'>Secondary Normal</Button>
                    <Button type='default' disabled>Secondary Disabled</Button>
                </ButtonArea>
                <ButtonArea direction='horizontal'>
                    <Button type='default'>Normal</Button>
                    <Button type='default' disabled>Disabled</Button>
                </ButtonArea>
                <div style={{margin: '0 auto',padding: '15px 0',width: '60%'}}>
                    <Button type="primary" plain>Button</Button>
                    <Button type="primary" plain disabled>Button</Button>
                    <Button type="default" plain>Button</Button>
                    <Button size="small">Mini</Button>
                    <Button type="default" size="small">Mini</Button>
                    <Button type="warn" size="small">Mini</Button>
                </div>
            </div>
        )
    }
}