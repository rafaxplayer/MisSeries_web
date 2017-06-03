import React, { Component } from 'react';
import {connect} from 'react-redux';
import ItemEpisode from './items/ItemEpisode'
import EmptyList from './EmptyList';
import TransitionGroup from 'react-transition-group/CSSTransitionGroup'
import connectWithTransitionGroup from 'connect-with-transition-group';// Necesario para que TransitionGroup funcione con redux

class ListNotSeen extends Component {

    render() {
        const transitionConfig = {
            
        }
       
        return (
               <section className="list">
                   <TransitionGroup 
                        transitionName='fade'
                        transitionEnterTimeout={800}
                        transitionLeaveTimeout={800}>
                        {
                            Object.keys(this.props.notseen).length > 0 ? (Object.keys(this.props.notseen).map((key,i)=>{
                                const episode = this.props.notseen[key]
                                return(<ItemEpisode key={key} episode={ episode }/>)
                                })):(<EmptyList/>)
                        }
                    </TransitionGroup>
               </section>
        );
    }
}
function mapStateToProps(state){return {notseen:state.episodes.notseen}};
export default connectWithTransitionGroup(connect(mapStateToProps)(ListNotSeen));