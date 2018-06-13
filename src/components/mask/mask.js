import React from 'react';
import PropTypes from 'prop-types';
import './mask.less';
import classNames from "../../utils/classnames";

class Mask extends React.Component {
    static propTypes = {
        transparent: PropTypes.bool
    };

    static defaultProps ={
        transparent: false
    };

    render() {
        const {transparent, className, ...others} = this.props;
        const clz = classNames({
            'ui-mask': !transparent,
            'ui-mask_transparent': transparent
        }, className);
        return (
            <div className={clz} {...others}></div>
        );
    }
}

export default Mask;