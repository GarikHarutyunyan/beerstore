import { Component } from "react";

class Loading extends Component {
    render() { 
        return ( 
            <div className="text-center m-4">
                <div className="spinner-grow" style={{width: '10rem', height: '10rem'}} role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
}
 
export default Loading;