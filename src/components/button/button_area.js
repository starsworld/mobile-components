import React from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames";

export default class ButtonArea extends React.Component{
    static propTypes = {
        direction: PropTypes.string
    };

    static defaultProps = {
        direction: 'vertical'
    };

    render(){
        const {direction, children, className} = this.props;
        const cls = classNames({
            'weui-btn-area': true,
            'weui-btn-area_inline': direction === 'horizontal',
            [className]: className
        });

        return (
            <div className={cls}>
                {children}
            </div>
        )
    }
}