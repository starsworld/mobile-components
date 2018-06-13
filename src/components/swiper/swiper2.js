import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from "../../utils/classnames";
import './swiper.less';

class Swiper extends React.Component {

    static propTypes = {
        height: PropTypes.number,
        width: PropTypes.number,
        threshold: PropTypes.number,
        speed: PropTypes.number,
        defaultIndex: PropTypes.number,
        direction: PropTypes.oneOf(['vertical', 'horizontal']),
        indicators: PropTypes.bool,
        onChange: PropTypes.func,
    };
    static defaultProps = {
        height: null,
        width: null,
        defaultIndex: 0,
        direction: 'horizontal',
        threshold: 50,
        speed: 300,
        indicators: true
    };

    constructor(props) {
        super(props);

        this.state = {
            containerWidth: 0,
            containerHeight: 0,
            currentIndex: this.props.defaultIndex,
            touching: false,
            og: 0,
            ogTranslate: 0,
            touchId: undefined,
            translate: 0,
            animating: false
        };

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    componentDidMount() {
        let $container = ReactDOM.findDOMNode(this.refs.container);

        this.setState({
            wrapperWidth: this.props.direction === 'horizontal' ? $container.offsetWidth * (this.props.children.length * 2 + 1) : $container.offsetWidth,
            wrapperHeight: this.props.direction === 'vertical' ? $container.offsetHeight * this.props.children.length : $container.offsetHeight,
            containerWidth: $container.offsetWidth,
            containerHeight: $container.offsetHeight,
            translate: this.props.defaultIndex <= this.props.children.length ? this.props.direction === 'horizontal' ? $container.offsetWidth * -(this.props.defaultIndex + 1) : $container.offsetHeight * -this.props.defaultIndex : 0
        });
    }

    handleTouchStart(e) {
        if (this.state.touching || this.props.children.length <= 1) return;

        let og = 0;

        if (this.props.direction === 'horizontal') {
            og = e.targetTouches[0].pageX - this.state.translate;
        } else {
            og = e.targetTouches[0].pageY - this.state.translate;
        }

        this.setState({
            touching: true,
            ogTranslate: this.state.translate,
            touchId: e.targetTouches[0].identifier,
            og: og,
            animating: false
        });

    }

    handleTouchMove(e) {
        if (!this.state.touching || this.props.children.length <= 1) return;
        if (e.targetTouches[0].identifier !== this.state.touchId) return;

        //prevent move background
        e.preventDefault();

        let diff = this.state.translate;

        if (this.props.direction === 'horizontal') {
            const pageX = e.targetTouches[0].pageX;
            diff = pageX - this.state.og;

        } else {
            //vertical
            const pageY = e.targetTouches[0].pageY;
            diff = pageY - this.state.og;

        }

        this.setState({
            translate: diff
        });
    }

    handleTouchEnd(e) {
        if (!this.state.touching || this.props.children.length <= 1) return;

        let translate = this.state.translate;
        let max = this.props.direction === 'horizontal' ? this.state.wrapperWidth - this.state.containerWidth : this.state.wrapperHeight - this.state.containerHeight;
        let currentIndex = this.state.currentIndex;
        let ogIndex = currentIndex;

        //default case
        let diff = Math.abs(translate - this.state.ogTranslate);
        let isNext = (translate - this.state.ogTranslate) < 0;

        if (diff >= this.props.threshold) {

            if (isNext) {
                //next slide
                currentIndex += 1;
                translate = this.state.ogTranslate - (this.props.direction === 'horizontal' ? this.state.containerWidth : this.state.containerHeight);

            } else {
                //prev slide
                currentIndex -= 1;
                translate = this.state.ogTranslate + (this.props.direction === 'horizontal' ? this.state.containerWidth : this.state.containerHeight);
            }
            translate = (currentIndex + 1) * this.state.containerWidth * (-1);

        } else {
            //revert back
            translate = this.state.ogTranslate;
        }

        let resetProps = () => {
            if (diff >= this.props.threshold) {
                let maxWidth = this.state.containerWidth * this.props.children.length;
                if (isNext && translate < -maxWidth) {
                    this.setState({
                        animating: false,
                        translate: -this.state.containerWidth
                    });
                } else if (!isNext && translate > -this.state.containerWidth) {
                    this.setState({
                        animating: false,
                        translate: -maxWidth
                    })
                }
            } else {
                this.setState({animating: false});
            }
        };

        this.sliderNext(translate, currentIndex, resetProps);

        if (this.props.onChange) this.props.onChange(ogIndex, currentIndex);
    }

    sliderNext(translate, currentIndex, resetProps) {
        let index = (currentIndex + this.props.children.length) % this.props.children.length;
        this.setState({
            touching: false,
            og: 0,
            touchId: undefined,
            ogTranslate: 0,
            animating: true,
            translate,
            currentIndex: index
        }, () => setTimeout(() => {
            resetProps();
        }, this.props.speed));
    }

    renderPagination() {
        return this.props.children.map((child, i) => {
            let clx = classNames('react-weui-swiper__pagination-bullet', {
                active: i === this.state.currentIndex
            });
            return (
                <span className={clx} key={i}></span>
            );
        });
    }

    renderSlides(children, direction, containerWidth, containerHeight) {
        children = React.Children.toArray(children);

        let preSlides = [];
        let slides = [];
        let postSlides = [];
        let count = React.Children.count(children);
        let key = -1;
        React.Children.forEach(children, function (child, index) {
            slides.push(
                React.cloneElement(child, {
                    key: 'original' + index,
                    "data-index": index,
                    className: 'slide-item react-weui-swiper__item',
                    style: Object.assign({}, child.props.style, {
                        display: direction === 'horizontal' ? 'inline-block' : 'block',
                        verticalAlign: direction === 'horizontal' ? 'top' : 'bottom',
                        width: containerWidth,
                        height: containerHeight
                    }),
                    onClick: e => {
                        child.props && child.props.onClick && child.props.onClick(e)
                    }
                })
            );

            if (count - index === 1) {
                preSlides.push(
                    React.cloneElement(child, {
                        key: 'pre' + index,
                        "data-index": -1,
                        className: 'slide-item slide-cloned react-weui-swiper__item',
                        style: Object.assign({}, child.props.style, {
                            display: direction === 'horizontal' ? 'inline-block' : 'block',
                            verticalAlign: direction === 'horizontal' ? 'top' : 'bottom',
                            width: containerWidth,
                            height: containerHeight
                        }),
                        onClick: e => {
                            child.props && child.props.onClick && child.props.onClick(e)
                        }
                    })
                )
            }

            key = count + index;
            postSlides.push(
                React.cloneElement(child, {
                    key: 'post' + index,
                    'data-index': key,
                    className: 'slide-item slide-cloned react-weui-swiper__item',
                    style: Object.assign({}, child.props.style, {
                        display: direction === 'horizontal' ? 'inline-block' : 'block',
                        verticalAlign: direction === 'horizontal' ? 'top' : 'bottom',
                        width: containerWidth,
                        height: containerHeight
                    }),
                    onClick: e => {
                        child.props && child.props.onClick && child.props.onClick(e)
                    }
                })
            );
        });

        return preSlides.concat(slides, postSlides);
    }

    render() {
        const {className, children, height, width, defaultIndex, direction, speed, indicators, ...domProps} = this.props;
        let cls = classNames('react-weui-swiper__container', className, {
            'react-weui-swiper__container-horizontal': direction === 'horizontal',
            'react-weui-swiper__container-vertical': direction === 'vertical'
        });

        let containerStyle = {
            height: height ? `${height}px` : '100%',
            width: width ? `${width}px` : '100%'
        };

        let wrapperStyle = {
            width: this.state.wrapperWidth,
            height: this.state.wrapperHeight,
            transition: this.state.animating ? `transform .${speed / 100}s` : 'none',
            transform: `translate(${direction === 'horizontal' ? this.state.translate : 0}px, ${direction === 'vertical' ? this.state.translate : 0}px)`
        };

        return (
            <div className={cls}
                 onTouchStart={this.handleTouchStart}
                 onTouchMove={this.handleTouchMove}
                 onTouchEnd={this.handleTouchEnd}
                 style={containerStyle}
                 ref='container'
            >
                <div className='react-weui-swiper__wrapper'
                     style={wrapperStyle}
                >
                    {this.renderSlides(children, direction, this.state.containerWidth, this.state.containerHeight)}
                </div>
                {indicators ?
                    <div
                        className="react-weui-swiper__pagination"
                    >
                        {this.renderPagination()}
                    </div>
                    : false}
            </div>
        )
    }
}

export default Swiper;