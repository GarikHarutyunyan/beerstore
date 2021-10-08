import React, { Component } from 'react';
import Loading from '../../loading';
import Intros from './components/intros';
import PropTypes from 'prop-types';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount(){
        this.fetchItems();
    }

    fetchItems = async() => {
        const storage =  JSON.parse(localStorage.getItem('Beers'));
        let i = storage.length-1;
        while(i >= 0) {
            await fetch(`https://api.punkapi.com/v2/beers/${storage[i--][0]}`)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        items: this.state.items.concat(result[0])
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded:true,
                        error
                    })
                }
            );
        }
        this.setState({
            isLoaded: true
        })
    }
    render() { 
        if(this.state.isLoaded){
            return (
                <Intros items={this.state.items} onRemove={this.props.onRemove}/>
            );
        } else return <Loading />
    }
}
 
Cart.propTypes = {
    onRemove: PropTypes.func.isRequired,
}

export default Cart;