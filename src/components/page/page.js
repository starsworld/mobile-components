import React from 'react';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames";
import './page.less';

class Page extends React.Component{
    static defaultProps = {
        transition: true
    };

    render(){
        const {children, style, className, transition} = this.props;
        const cls = classNames('ui-page', className);
        return (
            <div className={cls}
                 style={Object.assign({}, {animationName: transition ? 'pageInRight': ''}, style)}>
                {children}
            </div>
        )
    }
}

export default Page;