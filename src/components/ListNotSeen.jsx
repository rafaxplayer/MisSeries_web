import React, { Component } from 'react';
import {connect} from 'react-redux';
import ItemEpisode from './items/ItemEpisode'
import EmptyList from './EmptyList';

class ListNotSeen extends Component {
   
    render() {
        const self = this;
        return (
               <section className="list">
                {
                     Object.keys(this.props.notseen).length > 0 ? (Object.keys(this.props.notseen).map(function(key,i){
                        const episode = self.props.notseen[key]
                        return(<ItemEpisode key={i} episode={ episode }/>)
                        })):(<EmptyList/>)
                }
            </section>
        );
    }
}
function mapStateToProps(state){return {notseen:state.episodes.notseen}};
export default connect(mapStateToProps)(ListNotSeen);