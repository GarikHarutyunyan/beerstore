import { Component } from "react";
import PropTypes from 'prop-types';

class Search extends Component {
    state = { 
        isButtonHide: false
     }
    search = async(e) => {
        e.preventDefault();
        this.setState({
            isBbuttonHide: true
        })
        const key = document.getElementById('searchKey').value;
        await this.props.onSearch(key);
        this.setState({
            isButtonHide: false
        })
    }
    render() { 
        return (
            <div onSubmit= {this.search} className="justify-content-center w-100 d-flex bg-navy">
                <form  className="form-inline justify-content-center m-3">
                    <div className="form-group mx-sm-3 mb-1">
                        <input id='searchKey' className="form-control" placeholder="Search Beer"></input>
                    </div>
                    <button type='submit' className={'btn btn-primary mb-1 '+ ((this.state.isButtonHide) ? 'disabled' : '')}>Search</button>
                </form>
            </div>
        );
    }
}

Search.propTypes = {
  onSearch : PropTypes.func.isRequired,
}

export default Search;