import React, { Component } from 'react';
import not_found from '../resources/404-notfound.png'
class NotFound extends Component {
    state = {  }
    render() {
        return (
            <img src={not_found}/>
        );
    }
}

export default NotFound;