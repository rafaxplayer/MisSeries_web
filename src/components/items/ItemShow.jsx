import React, { Component } from 'react';
import {store} from '../../store'
import { MODAL_OPTIONS_ISOPEN,MODAL_DETAILS_ISOPEN,MODAL_SHOW } from '../../consTypes'
class ItemShow extends Component {
    
    onClickHandler(){
        const { onSelect ,show} = this.props
        onSelect(show.code)
    }

    openModal(show){
        store.dispatch({
            type:MODAL_SHOW,
            payload:show
        })
        store.dispatch({
            type:MODAL_OPTIONS_ISOPEN,
            payload:true
        })
        store.dispatch({
            type:MODAL_DETAILS_ISOPEN,
            payload:false
        })
    }

        
    render() {
        const { show,notseen } = this.props
        return (
            <article className="item item-show">
                <figure>
                    <img src={show.poster} alt=""/>
                </figure>
                <div className="info">
                    <h2>{show.name}</h2>
                    <p>{`Temps : ${show.temps}`}</p>
                    <p>{`No vistos : ${notseen}`}</p>
                </div>
                <i className="fa fa-cog fa-2x" aria-hidden="true" onClick={this.openModal.bind(this,show)}></i>
            </article>
        );
    }
}

export default ItemShow;