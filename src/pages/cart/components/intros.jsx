import { Component } from "react";
import Counter from './counter';
import PropTypes from 'prop-types';

class Intros extends Component {
    state = {
        items: this.props.items
    }

    removeBeer = id => {
        const items = this.state.items.filter(i=> i.id !== id);
        this.setState({
            items: items
        })
        let storage =  JSON.parse(localStorage.getItem('Beers'));
        storage = storage.filter(i=> i[0] !== id);
        localStorage.setItem('Beers',JSON.stringify(storage));
        this.props.onRemove();
    }

    getCount = id => {
        const storage =  JSON.parse(localStorage.getItem('Beers'));
        let x = storage.findIndex(i=> i[0] === id);
        return storage[x][1];
    }

    render() { 
        return ( 
            <ul className="list-group w-50 mt-4 ml-auto mr-auto">
                {this.state.items.map( item =>         
                    <li id={item.id} key={item.id} className="list-group-item">
                        <div className="row no-gutters">
                            <div className="col-md-2 text-center">
                                <img className="card-img mw-100 w-auto mh-170" src={item.image_url != null ? item.image_url : 'https://images.punkapi.com/v2/keg.png'} alt="" />
                            </div>
                            <div className="col-md-5">
                                <h3 className="card-title">{item.name}</h3>
                                <p className="card-text">{item.tagline}</p>                                            
                            </div>
                            <Counter count={this.getCount(item.id)} id={item.id}/>
                            <div className="col-md-1 mt-auto mb-auto">
                                <button onClick={() => this.removeBeer(item.id)} type="button" className="close" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="col-md-2 mt-auto mb-auto">
                                <h4 className="float-right card-text">{'$'+(item.ph ? item.ph : '5.0')}</h4>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
         );
    }
}
 
Intros.propTypes = {
    onRemove: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
}

export default Intros;