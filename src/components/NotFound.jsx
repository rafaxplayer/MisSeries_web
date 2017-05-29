import React, { Component } from 'react';
import not_found from '../resources/404-notfound.png'

class NotFound extends Component {
    state = {  }
    render() {
        return (
            <div>
                <img src={not_found} className="center" alt="404"/>
            </div>
        );
    }
}

export default NotFound;