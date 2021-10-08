import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
    state = {
        count: parseInt(this.props.count),
        isMinusHide: false,
        isPlusHide: false
    }

    add = () => {
        let storage =  JSON.parse(localStorage.getItem('Beers'));
        let x = storage.findIndex(i=> i[0] === this.props.id);
        storage[x][1] = storage[x][1]+1;
        localStorage.setItem('Beers',JSON.stringify(storage));
        this.setState({
            count: storage[x][1]
        })
    }

    reduce = () =>{
        if(this.state.count > 1){
            let storage =  JSON.parse(localStorage.getItem('Beers'));
            let x = storage.findIndex(i=> i[0] === this.props.id);
            storage[x][1] = storage[x][1]-1;
            localStorage.setItem('Beers',JSON.stringify(storage));
            this.setState({
                count: storage[x][1]
            })
        }
    }
    
    render() { 
        return (
            <nav className="col-md-2 mt-auto mb-auto">
                <ul className="pagination">
                    <li className={'page-item ' + ((this.state.isMinusHide) ? 'disabled' : '')}>
                        <span onClick={this.reduce} className="page-link"><i className="arrow down"/></span>
                    </li>
                    <li className="page-item active">
                        <span className="page-link"> {this.state.count} </span>
                    </li>
                    <li className={'page-item ' + ((this.state.isPlusHide) ? 'disabled' : '')}>
                        <span onClick={this.add} className="page-link"><i className="arrow up"/></span>
                    </li>
                </ul>
            </nav>
        );
    }
}

Counter.propTypes = {
    id: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
}
 
export default Counter;