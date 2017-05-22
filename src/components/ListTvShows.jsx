import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTvShows,  stopRef,  newShow} from '../actions';
import { REF_SHOWS } from '../consTypes';
import ItemShow from './items/ItemShow';
import EmptyList from './EmptyList';
import '../styles/shows.css';
import { notificationShow , isNumeric} from '../helpers'

class ListTvShows extends Component {

    constructor(props){
        super(props)
        this.notSeenCount = this.notSeenCount.bind(this);
        this.newSerie = this.newSerie.bind(this);
    }

    componentWillMount(){
        this.props.getTvShows();
        
    }
   
    componentWillUnMount(){
        this.props.stopRef(REF_SHOWS)
        
    }
    newSerie(){
        let num = prompt("Codigo de la serie:","code");
        console.log(num)
        if(num && num.length > 0){
            if(!isNumeric(num)){
                notificationShow(`${num} Código invalido , debe ser un número`,2);
                return;
            }
            notificationShow(`Code : ${num}`,0)
            this.props.newShow(num)
        }
    }
    notSeenCount(code){
        let count =0;
        Object.keys(this.props.notseen).forEach((key,i,array)=>{
            let episode = this.props.notseen[key]
            if(episode.seriecode === code){
                count++;
            }
        })
        
        return count;
    }

    render(){
            
        return (
            <section className="list">
            {
                Object.keys(this.props.shows).length > 0 ? ( Object.keys(this.props.shows).map((key, i)=>{
                        let show = this.props.shows[key];
                        return(<ItemShow key={i} show={show} notseen={this.notSeenCount(show.code)}/>)
                    })):(<EmptyList/>)
                    
            }
            <a className="btn-floating" onClick={this.newSerie}>
                <spam>+</spam>
            </a>
            </section>)
    }
}

function mapStateToProps(state,ownProps){
    return {
        shows:state.shows.list, 
        notseen:state.episodes.notseen
    };
};
export default connect(mapStateToProps,{ getTvShows, stopRef, newShow })(ListTvShows);