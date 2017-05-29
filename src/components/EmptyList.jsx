import React, { Component } from 'react';
import Empty from '../resources/empty_list.png'
class EmptyList extends Component {
    
    render() {
        return (
            <div>
                <img src={Empty} className="center" alt="empty list"/>
                
            </div>
        );
    }
}

export default EmptyList;