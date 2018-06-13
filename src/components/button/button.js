import React from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames";
import './button.less';

export default class Button extends React.Component {
    static propTypes = {
        disabled: PropTypes.bool,
        type: PropTypes.string,
        size: PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        type: 'primary',
        size: 'normal'
    };

    render(){
        const {component, type, size, plain, className, children, ...others} = this.props;
        const Component = component ? component : this.props.href ? 'a' : 'button';
        const cls = classNames({
            'weui-btn': true,
            'weui-btn_mini': size === 'small',
            'weui-btn_primary': type === 'primary' && !plain,
            'weui-btn_default': type === 'default' && !plain,
            'weui-btn_warn': type === 'warn',
            'weui-btn_plain-primary': type === 'primary' && plain,
            'weui-btn_plain-default': type === 'default' && plain,
            'weui-btn_disabled': this.props.disabled && !plain,
            'weui-btn_plain-disabled': this.props.disabled && plain,
            [className]: className
        });
        return (
            <Component className={cls} {...others}>{children}</Component>
        )
    }
}