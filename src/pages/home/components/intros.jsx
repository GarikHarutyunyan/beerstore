import { Component } from "react";
import Intro from './intro.jsx';
import PropTypes from 'prop-types';

class Intros extends Component {
    render() { 
        return ( 
            <div className={'w-75 m-auto'}>
                <div className='row'>
                    {this.props.items.slice(0,3).map(item => <Intro  key={item.id} {...item} />)}
                </div>
                <div className='row'>
                    {this.props.items.slice(3,6).map(item => <Intro key={item.id} {...item} />)}
                </div>
                <div className='row'>
                    {this.props.items.slice(6,9).map(item => <Intro key={item.id} {...item} />)}
                </div>
            </div>
         );
    }
}

Intros.propTypes = {
    items: PropTypes.array.isRequired
}
 
export default Intros;