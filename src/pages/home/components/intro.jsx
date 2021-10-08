import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';

class Intro extends Component {
    render() { 
        return (            
            <div className="card mt-5 text-center border-0 col-md-4">
                <NavLink className='muted' to={`/single-beer/${this.props.id}`}>
                    <img className="card-img-top w-auto mh-300" src={this.props.image_url != null ? this.props.image_url : 'https://images.punkapi.com/v2/keg.png'} alt=""/>
                <div className="card-body w-50 ml-auto mr-auto">
                    <h5 className="mt-1 intro-title">
                        <abbr className="intro-abbr" title={this.props.name}><strong>{this.props.name}</strong></abbr>
                    </h5>
                    <p className="card-text"><strong> {'$'+ (this.props.ph ? this.props.ph : '5.0')} </strong></p>
                </div>
                </NavLink>
            </div>
          );
    }
}

Intro.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image_url: PropTypes.any,
    ph: PropTypes.any,
}
 
export default Intro;