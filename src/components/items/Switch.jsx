import React, { Component } from 'react'
import '../../styles/switch.css'
import { connect } from 'react-redux'
import { checkChapter } from '../../actions'

class Switch extends Component {
   
    toggle = e => {
        const { episode, checkChapter } = this.props
        checkChapter(episode.name, e.target.checked)
        
    }
    
    render = () => (<label className="switch"><input type="checkbox" checked={ this.props.on } onChange={ this.toggle.bind(this) }/><div className="slider round"></div></label>);
    
}

export default connect(null,{checkChapter})(Switch);