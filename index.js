import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Slyer from 'slyer';

class Sly extends React.Component {
    constructor(props) {
        super(props);

        this.resizeHandler = _.debounce(() => this.frame.reload(), 100);
    }

    componentDidMount() {
        if (!this.frame) {
            this.frame = new Slyer(this.refs.sly, {}, {}).init();

            if (this.props.onInit) {
                this.props.onInit(this.frame);
            }
        } else {
            this.frame.reload();
        }
        
        window.addEventListener('resize', this.resizeHandler, true);
    }

    componentWillUnmount() {
        this.frame.destroy();
        
        window.removeEventListener('resize', this.resizeHandler);
    }

    componentDidUpdate() {
        // After a props update, update Sly options
        if (this.frame) {
            Object.assign(this.frame.options,  this.props.options || {});
            this.frame.reload();
        }
        
    }

    render() {
        const options = this.props.options || {};
        const frame = {
            height: '100%',
            width: '100%'
        };
        const slidee = {
            display: 'inline-block',
            height: options.horizontal ? '100%' : 'auto',
            width: options.horizontal ? 'auto' : '100%'
        };

        return (
            <div ref='sly' className='frame' style={frame}>
                <div className='slidee' style = {slidee}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Sly.propTypes = {
    disabled: PropTypes.bool,
    onInit: PropTypes.func
};

export default Sly;
