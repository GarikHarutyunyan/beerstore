import React, { Component } from 'react';
import Loading from '../../loading';
import PropTypes from 'prop-types';

class Single extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            item: []
        };
    }

    componentDidMount(){
        this.props.cBack();
        this.fetchBeerInfo();
    }

    fetchBeerInfo () {
        fetch(`https://api.punkapi.com/v2/beers/${this.props.match.params.id}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded:true,
                    item: result[0]
                })
                this.props.cBack(this.state.item.name,this.state.item.tagline);
            },
            (error) => {
                this.setState({
                    isLoaded:true,
                    error
                })
            }
        );
    }

    addToCart = () => {
        if(localStorage.getItem('Beers')){
            const beers = JSON.parse(localStorage.getItem('Beers'));
            let i;
            for(i=0;i<beers.length;i++){
                if(beers[i][0] === this.state.item.id){
                    break;
                }
            }
            if(i === beers.length) {
                const beerInfo = [this.state.item.id,1];
                beers.push(beerInfo);
                localStorage.setItem('Beers',JSON.stringify(beers));
                this.props.onAdd();
            }
        } else {
            const beerInfo = [this.state.item.id,1];
            localStorage.setItem('Beers',JSON.stringify([beerInfo]));
            this.props.onAdd();
        }

    }

    render() { 
        if(this.state.isLoaded){
            return (
                <div className="card mb-3 ml-auto mr-auto mt-4 w-50" >
                    <div className="row no-gutters">
                        <div className="col-md-3 text-center">
                            <img className="card-img m-4 mw-100 w-auto mh-380" src={this.state.item.image_url != null ? this.state.item.image_url : 'https://images.punkapi.com/v2/keg.png'} alt="" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <p className="card-text mb-0"><small className="text-muted"><strong>{'330ml  ' + this.state.item.abv + '%'} </strong></small></p>
                                <h3 className="card-title"><strong> {this.state.item.name} </strong></h3>
                                <p className="card-text"> {this.state.item.description} </p>
                                <h4 className="card-text mb-4"> {'$'+ (this.state.item.ph ? this.state.item.ph : '5.0')} </h4>
                                <button onClick={this.addToCart} className="btn btn-primary">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else return <Loading />
    }
}

Single.propTypes = {
    cBack: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
}

export default Single;