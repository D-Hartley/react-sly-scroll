import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import Sly from 'sly-scroll';

class ReactSlyScroll extends React.Component {
    constructor(props) {
        super(props);

        // Reload the scroller when a resize occurs, but wait at least 100ms
        this.resizeHandler = _.debounce(() => this.frame.reload(), 100);
    }

    componentDidMount() {
        if (!this.frame) {
            // Create Sly instance
            this.frame = new Sly(this.refs.sly, {}, {}).init();

            // This can be used to pass the Sly instance to the parent component
            if (this.props.onInit) {
                this.props.onInit(this.frame);
            }
        } else {
            this.frame.reload();
        }
        
        // Attach to the resize event
        window.addEventListener('resize', this.resizeHandler, true);
    }

    componentWillUnmount() {
        this.frame.destroy();
        
        // Detach from the resize event
        window.removeEventListener('resize', this.resizeHandler);
    }

    componentDidUpdate() {
        // After a props update
        if (this.frame) {
            // Update Sly options
            Object.assign(this.frame.options,  this.props.options || {});
            
            // Reload Sly instance
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

ReactSlyScroll.propTypes = {
    disabled: PropTypes.bool,
    onInit: PropTypes.func
};

export default ReactSlyScroll;
