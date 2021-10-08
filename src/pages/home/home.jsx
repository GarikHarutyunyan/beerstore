import React, { Component } from 'react';
import Loading from '../../loading';
import Intros from './components/intros.jsx';
import Pager from './components/pager.jsx';
import Search from './components/search.jsx';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            searchKey: "",
            page: 1,
            isPrevHide : true,
            isNextHide: false
        };
    }

    componentDidMount(){
        if(!this.state.isLoaded)
            this.fetchPageInfo();
    }

    nextPage = async() => {
        this.setState({
            isLoaded: false
        })
        if (this.state.isPrevHide){
            this.setState({
                isPrevHide: false
            })
        }        
        await this.setState({
            page: this.state.page + 1
        })
        await this.fetchPageInfo ();
        if(this.state.items.length < 1){
            await this.previousPage();
            this.setState({
                isNextHide: true
            })
        }
    }

    previousPage = async() => {
        await this.setState({
            isLoaded: false,
            page: this.state.page-1
        })
        if (this.state.page === 1){
            this.setState({
                isPrevHide: true
            })
        }
        await this.fetchPageInfo ();
    }

    search = key => {
        this.setState({
            isLoaded: false,
            page: 1,
            isPrevHide: true
        })
        this.fetchPageInfo(key);
    }

    fetchPageInfo = async(sKey = this.state.searchKey) => {
        const maxItems = 9;
        await fetch(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=${maxItems}&${sKey.length>=1 ? 'beer_name='+sKey:''}`)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded:true,
                    items: result,
                    searchKey: sKey,
                    isNextHide: result.length < 9 ? true : false
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

    render() { 
        const {error, isLoaded, items} = this.state;
        if(error){
            return (
                <div>
                    <h1>EROR MESSAGE</h1>
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <Search onSearch={this.search} />
                    {isLoaded ? <Intros items={items}/> : <Loading />}
                    <Pager
                        page = {this.state.page}
                        onPrevious = {this.previousPage}
                        onNext = {this.nextPage}
                        isPrevHide = {this.state.isPrevHide}
                        isNextHide = {this.state.isNextHide}
                    />
                </React.Fragment>
            );
        }
    }
}
 
export default Home;