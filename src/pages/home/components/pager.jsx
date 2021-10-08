import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pager extends Component {    
    render() { 
        return (
            <nav className="m-4">
                <ul className="pagination justify-content-center">
                    <li className={'page-item ' + ((this.props.isPrevHide) ? 'disabled' : '')}>
                        <span onClick={this.props.onPrevious} className="page-link">Previous</span>
                    </li>
                    <li className="page-item active">
                        <span className="page-link"> {this.props.page} </span>
                    </li>
                    <li className={'page-item ' + ((this.props.isNextHide) ? 'disabled' : '')}>
                        <span onClick={this.props.onNext} className="page-link">Next</span>
                    </li>
                </ul>
            </nav>
        );
    }
}

Pager.propTypes = {
    page: PropTypes.number.isRequired,
    onPrevious: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
    isPrevHide: PropTypes.bool.isRequired,
    isNextHide: PropTypes.bool.isRequired
}

export default Pager;