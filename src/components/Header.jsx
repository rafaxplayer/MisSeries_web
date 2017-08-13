import React, { Component } from 'react';
import '../styles/header.css';
import logo from '../resources/logo.png';
import AuthUser from './items/AuthUser';
import { Link } from 'react-router-dom'
import { REF_CHAPTERS } from '../consTypes';
import { getNotSeen } from '../actions';
import { connect } from 'react-redux';

class Header extends Component {
  
    componentWillMount = () => this.props.getNotSeen();
        
    componentWillUnMount = () => this.props.stopRef(REF_CHAPTERS)
       
    render = () => {
        const notseen = Object.keys(this.props.notseen);
        let isHide = notseen.length > 0 ? '' : 'hidde';
        return (
            <header>
                <figure>
                    <Link  to="/notseen"><p className={`badge ${isHide}`}>{ notseen.length }</p></Link>
                    <Link to="/"><img src={logo} className="logo shadowed" alt="logo"/></Link>
                </figure>
                
                <h1 className="title">Mis Series</h1>
                <AuthUser/>
            </header>
        )
    }
}
const mapStateToProps = (state) => ({notseen:state.episodes.notseen})
const mapDispatchToProps = (dispatch) => (
    {
        getNotSeen:() => {dispatch(getNotSeen())},
        navigateTo:(location) => {}
    })
export default connect(mapStateToProps, mapDispatchToProps )(Header);
