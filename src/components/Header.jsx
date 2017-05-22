import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../resources/logo.png';
import AuthUser from './items/AuthUser';
import { store } from '../store';
import { push } from 'react-router-redux'
import { REF_CHAPTERS } from '../consTypes';
import { getNotSeen } from '../actions';
import { connect } from 'react-redux';

class Header extends Component {
    
    navigateTo(location){
        store.dispatch(push(location))
    }


    componentWillMount(){
        
        this.props.getNotSeen();
        
    }

    componentWillUnMount(){
        this.props.stopRef(REF_CHAPTERS)
        
    }

    render() {
        const notseen = Object.keys(this.props.notseen);
        let isHide = notseen.length > 0 ?'':'hidde';
        return (
            <header>
                <figure>
                    <p className={`badge ${isHide}`} onClick={ this.navigateTo.bind(this,'/notseen')}>{ notseen.length }</p>
                    <img src={logo} className="logo shadowed" alt="" onClick={ this.navigateTo.bind(this,'/home') }/>
                </figure>
                
                <h1 className="title">Mis Series</h1>
                <AuthUser/>
            </header>
        )
    }
}
const mapStateToProps = (state) => ({notseen:state.episodes.notseen})
export default connect(mapStateToProps,{getNotSeen})(Header);
