import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAll } from '../actions'
import ItemEpisode from './items/ItemEpisode'
import EmptyList from './EmptyList';
import '../styles/episodes.css'

class ListEpisodes extends Component {
    constructor(props){
        super(props)

        this.state = {
            checkall:true
        }
        this.toggleNotseen=this.toggleNotseen.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        
        this.checkIfNotSeenExists(nextProps.episodes)
    }

   checkIfNotSeenExists(episodes){
      let chck = true;
       Object.keys(episodes).forEach((key,i)=>{
            const episode = episodes[key]
            if(!episode.visto ){
                                
                chck = false;
            }
        });
      this.setState({checkall:chck})
     
   }

    toggleNotseen(e){
        const { episodes } = this.props
        const code = episodes[Object.keys(episodes)[0]].seriecode;
        this.props.checkAll(code,e.target.checked)
        this.checkIfNotSeenExists(episodes)
       
    }

    render(){
        
        return (
            <section className="list">
                <div className="item">
                    <h4>Episodio visto :</h4>
                     <label className="switch">
                        <input type="checkbox" checked={ this.state.checkall } onChange={ this.toggleNotseen }/>
                        <div className="slider round"></div>
                    </label>
                </div>
                {
                     Object.keys(this.props.episodes).length > 0 ? (Object.keys(this.props.episodes).map((key,i) => {
                        const episode = this.props.episodes[key]
                        return(<ItemEpisode key={i} episode={episode}/>)})):(<EmptyList/>)
                }
            </section>
        )
    }
}
function mapStateToProps(state){return{episodes:state.episodes.list}}
export default connect(mapStateToProps,{ checkAll })(ListEpisodes);
