import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTvShows,  stopRef } from '../actions';
import { REF_SHOWS } from '../consTypes';
import ItemShow from './items/ItemShow';
import EmptyList from './EmptyList';
import '../styles/shows.css';


class ListTvShows extends Component {

    constructor(props){
        super(props)
        this.notSeenCount = this.notSeenCount.bind(this);
        
    }

    componentWillMount(){
        this.props.getTvShows();
        
    }
   
    componentWillUnMount(){
        this.props.stopRef(REF_SHOWS)
        
    }

    notSeenCount(code){
        let count =0;
        const self = this;
        Object.keys(this.props.notseen).forEach(function(key,i,array){
            let episode = self.props.notseen[key]
            if(episode.seriecode === code){
                count++;
            }
        })
     
        return count;
    }

    render(){
        const self = this;
        return (
        <section className="list">
        {
               Object.keys(this.props.shows).length > 0 ? ( Object.keys(this.props.shows).map((key, i)=>{
                    let show = self.props.shows[key];
                    return(<ItemShow key={i} show={show} notseen={self.notSeenCount(show.code)}/>)
                })):(<EmptyList/>)
                 
        }</section>)
    }
}

function mapStateToProps(state,ownProps){
    return {
        shows:state.shows.list, 
        notseen:state.episodes.notseen
    };
};
export default connect(mapStateToProps,{ getTvShows, stopRef })(ListTvShows);