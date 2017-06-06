import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuth, login, logout} from  '../../actions'

class AuthUser extends Component {
   
    componentWillMount=() => this.props.getAuth();
    
	handleAuth=() => this.props.login()

    handleLogout=() => this.props.logout()

    renderButton=() => (<div className="profile"><ul ><li><button onClick={this.handleAuth.bind(this)}>Login</button></li></ul></div>)
    
    render=() =>{
        const { user } = this.props
        return (<div className="profile">
                {user ? (
                    <ul >
                        <li>
                            <figure>
                                <img className='avatar' src={user.photoURL} alt={user.displayName}/>
                            </figure>
                        </li>
                        <li>{user.displayName}</li>
                        <li>
                            <button  onClick={this.handleLogout.bind(this)}>Logout</button>
                        </li>
                    </ul>
                    ): this.renderButton()}
            </div>
        );
    }
}
function mapStateToProps(state){return{user:state.auth.user}};
export default connect(mapStateToProps,{ getAuth, login, logout })(AuthUser);