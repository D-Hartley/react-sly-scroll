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

    render() {
        const {props} = this;
        const propsToPass = _.omit(props, 'children');

        return (
            <div ref='sly' {...propsToPass} className='frame'>
                <div className='slidee' style = {{display: 'flex'}}>
                    {props.children}
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
