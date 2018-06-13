import React from 'react';
import {ActionSheet, Button} from '../../../src';

export default class ActionSheetDemo extends React.Component {
    state = {
        ios_show: false,
        android_show: false,
        menus: [{
            label: 'Option 1',
            onClick: () => {
            }
        }, {
            label: 'Option 2',
            onClick: () => {
            }
        }],
        actions: [
            {
                label: 'Cancel',
                onClick: this.hide.bind(this)
            }
        ]
    };

    hide() {
        this.setState({
            auto_show: false,
            ios_show: false,
            android_show: false
        });
    }

    render() {
        return (
            <div>
                <Button type='default' onClick={e => this.setState({ios_show: true})}>IOS Button</Button>
                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.ios_show}
                    type="ios"
                    onRequestClose={e => this.setState({ios_show: false})}
                />
                <br/>
                <Button type='default' onClick={e => this.setState({android_show: true})}>Android Button</Button>
                <ActionSheet
                    menus={this.state.menus}
                    actions={this.state.actions}
                    show={this.state.android_show}
                    type="android"
                    onRequestClose={e => this.setState({android_show: false})}
                />
            </div>
        )
    }
}