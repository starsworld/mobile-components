import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from '../../utils/classnames';
import Mask from '../mask/index';
import './actionsheet.less';

class ActionSheet extends Component {
    static propTypes = {
        menus: PropTypes.array,
        actions: PropTypes.array,
        show: PropTypes.bool,
        onRequestClose: PropTypes.func,
        type: PropTypes.string
    };

    static defaultProps = {
        type: '',
        menus: [],
        actions: [],
        show: false
    };

    constructor(props) {
        super(props);

        this.handleMaskClick = this.handleMaskClick.bind(this);
    }

    renderMenuItem() {
        return this.props.menus.map((menu, idx) => {
            const {label, className, ...others} = menu;
            const cls = classNames({
                'ui-actionsheet__cell': true,
                [className]: className
            });

            return (
                <div key={idx} {...others} className={cls}>{label}</div>
            );
        });
    }

    renderActions() {
        return this.props.actions.map((action, idx) => {
            const {label, className, ...others} = action;
            const cls = classNames({
                'ui-actionsheet__cell': true,
                [className]: className
            });

            return (
                <div key={idx} {...others} className={cls}>{label}</div>
            );
        });
    }

    handleMaskClick(e) {
        if (this.props.onRequestClose) this.props.onRequestClose(e);
    }

    render(){
        const {show, type, onRequestClose, menus, actions, ...others} = this.props;
        const cls = classNames({
            'ui-actionsheet': true,
            'ui-actionsheet_toggle': show
        });
        let styleType = type ? type : 'ios';
        return (
            <div className={styleType === 'android' ? 'ui-skin_android' : ''}>
                <Mask style={{display: show ? 'block': 'none'}} onClick={this.handleMaskClick}/>
                <div className={cls} {...others}>
                    <div className='ui-actionsheet__menu'>
                        {this.renderMenuItem()}
                    </div>
                    <div className='ui-actionsheet__action'>
                        {this.renderActions()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ActionSheet;